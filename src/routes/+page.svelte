<script lang="ts">
    import * as tone from 'tone';
    import {onMount} from "svelte";
    import {SlideToggle} from "@skeletonlabs/skeleton";
    import type {Config} from "../lib/config";
    import config from '../lib/config';

    const keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    const inversions = ['Root Inversion', '1st Inversion', '2nd Inversion'];
    let types = [];
    let key;
    let inversion;

    let intervalId;

    $: {
        types = config.filter(item1 => callbackObj[item1.callback]).map(item2 => item2.name);
        updateValues();
    }

    let type: string;

    let countValue = 10;
    let currentCount = countValue;

    $: {
        currentCount = countValue;
    }

    let callbackObj = {}

    onMount(() => {
        config.forEach((chord: Config) => {
                callbackObj[chord.callback] = chord.isDefault;
            }
        );

        updateValues();
    });

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

    function playChord(){
        const chords = config.filter(item => item.name === type).map(item2 => item2.chords);
        console.log('chords', chords);

    }
</script>
<div class="flex h-screen">
    <div class="m-auto w-[500px] px-4 md:px-0">

        <div class="flex flex-col items-center my-10">
            <h1 class="mb-2 font-bold text-amber-800">{key} {type}</h1>
            <h1 class="font-bold text-blue-800">{inversion}</h1>
        </div>

        <div class="flex gap-3">
            <button class="btn variant-filled-primary flex-1" disabled={intervalId} on:click={doAtInterval}>Next
            </button>
            <button class="btn variant-filled-surface flex-1" disabled={intervalId} on:click={playChord}>Play Chord
            </button>
        </div>

        <div class="flex flex-row items-center justify-center gap-3 mt-4">
            <button class="btn variant-filled-secondary drop-shadow-lg flex-1 border-2" disabled="{intervalId}" on:click={startInterval}>Start
            </button>
            <div class="flex-1 flex border-2 bg-white drop-shadow-lg rounded-full h-11 justify-center items-center">
                <div class="font-bold">{currentCount}</div>
            </div>
            <button class="btn variant-filled-error flex-1 drop-shadow-lg border-2" disabled="{!intervalId}" on:click={stopInterval}>Stop
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