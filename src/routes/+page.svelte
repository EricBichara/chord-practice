<script lang="ts">
    import * as Tone from 'tone';
    import {onMount} from "svelte";
    import {SlideToggle} from "@skeletonlabs/skeleton";
    import type {Config} from "../lib/config";
    import config from '../lib/config';
    import {Piano} from "@tonejs/piano/build/piano/Piano";

    const keys = ['A4', 'A#4', 'B4', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4']
    const keysExtended = [...keys, 'A5', 'A#5', 'B5', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5']
    const inversions = ['Root Inversion', '1st Inversion', '2nd Inversion'];
    let types = ['Major'];
    let key: string;
    let inversion;

    let intervalId;

    $: {
        types = config.filter(item1 => callbackObj[item1.callback]).map(item2 => item2.name);
        updateValues();
    }

    $: note= key.substring(0, key.length-1);

    let type: string = config[0].name;

    let countValue = 10;
    let currentCount = countValue;

    $: {
        currentCount = countValue;
    }

    let callbackObj = {}

    let synth: Tone.PolySynth;
    let piano: Piano;

    onMount(() => {
        config.forEach((chord: Config) => {
                callbackObj[chord.callback] = chord.isDefault;
            }
        );

        updateValues();

        setupTone();
    });

    function setupTone() {
        synth = new Tone.PolySynth().toDestination();

        piano = new Piano({velocities: 5, release: true, pedal: false});
        piano.toDestination();
        piano.load().then(() => {
            console.log('loaded')
        });
    }

    function updateValues() {
        key = keys[Math.floor(Math.random() * keys.length)];
        type = types[Math.floor(Math.random() * types.length)];
        inversion = inversions[Math.floor(Math.random() * inversions.length)];
    }

    function startInterval() {
        stopInterval();
        intervalId = setInterval(doAtInterval, 1000);
    }

    function stopInterval() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            currentCount = countValue;
        }
    }

    function doAtInterval() {
        if (intervalId) {
            if (currentCount > 1) {
                currentCount--;
                return;
            } else {
                currentCount = countValue;
            }
        }
        updateValues();
    }

    function calculateChordNotes(chordNotes: number[]): string[] {
        const notesArray = [`${key}`];
        const keyIndex = keysExtended.findIndex((currentKey) => currentKey === key);
        chordNotes.forEach((noteIndex: number) => {
            notesArray.push(keysExtended[keyIndex + noteIndex - 1]);
        });

        return notesArray;
    }

    function playChord() {
        const chords = config.filter(item => item.name === type)[0].chords;
        const notes = calculateChordNotes(chords);
        piano.keyDown({note: "C4", time: '0.1', velocity: .3})
        piano.keyUp({note: "C4", time: '+2'})
        notes.forEach((note)=>{
            //piano.keyDown({note: note, time: '0.1', velocity: .3})
        });
        notes.forEach((note)=>{
            //piano.keyUp({note: note, time: '+2'})
        });
    }
</script>
<div class="flex h-screen">
    <div class="m-auto w-[500px] px-4 md:px-0">

        <div class="flex flex-col items-center my-10">
            <h1 class="mb-2 font-bold text-amber-800">{note} {type}</h1>
            <h1 class="font-bold text-blue-800">{inversion}</h1>
        </div>

        <div class="flex gap-3">
            <button class="btn variant-filled-primary drop-shadow-lg flex-1" disabled={intervalId}
                    on:click={doAtInterval}>Next
            </button>
            <button class="btn variant-filled-surface drop-shadow-2xl flex-1" disabled={intervalId}
                    on:click={playChord}>Play Chord
            </button>
        </div>

        <div class="flex flex-row items-center justify-center gap-3 mt-4">
            <button class="btn variant-filled-secondary drop-shadow-lg flex-1 border-2" disabled="{intervalId}"
                    on:click={startInterval}>Start
            </button>
            <div class="flex-1 flex border-2 bg-white drop-shadow-lg rounded-full h-11 justify-center items-center">
                <div class="font-bold">{currentCount}</div>
            </div>
            <button class="btn variant-filled-error flex-1 drop-shadow-lg border-2" disabled="{!intervalId}"
                    on:click={stopInterval}>Stop
            </button>
        </div>

        <h4 class="mt-6 font-bold">Included Chords</h4>
        <div class="flex flex-col">

            {#each config as chord}
                <label class="label cursor-pointer flex flex-row justify-between items-center">
                    <span class="label-text">{chord.name}</span>
                    <SlideToggle name="sus4-slide" bind:checked={callbackObj[chord.callback]} size="sm"/>
                </label>
            {/each}
        </div>

        <h4 class="mt-4 font-bold">Timer Interval</h4>
        <div class="flex flex-col">
            <label class="label cursor-pointer flex flex-row justify-between items-center">
                <span class="label-text">Count down (in seconds)</span>
                <input name="interval-input" type="text" bind:value={countValue}
                       class="input input-bordered w-14 bg-white h-10 text-center"
                       disabled={intervalId}/>
            </label>
        </div>
    </div>
</div>