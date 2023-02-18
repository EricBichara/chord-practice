<script lang="ts">
    import {onMount} from "svelte";
    import {SlideToggle} from "@skeletonlabs/skeleton";

    const keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    const inversions = ['Root Inversion', '1st Inversion', '2nd Inversion'];
    let types = [];
    let key = keys[0];

    let inversion = inversions[0];
    let intervalId;

    $: {
        const chords = [];
        if (includeMajor) {
            chords.push('Major');
        }
        if (includeMajor7) {
            chords.push('Major7')
        }
        if (includeMinor) {
            chords.push('Minor');
        }
        if (includeMinor7) {
            chords.push('Minor7')
        }
        if (includeSus2) {
            chords.push('Sus2');
        }
        if (includeSus4) {
            chords.push('Sus4');
        }
        types = chords;
    }
    let type = types[0];

    let includeMajor = true;
    let includeMajor7 = false;
    let includeMinor = true;
    let includeMinor7 = false;
    let includeSus2 = false;
    let includeSus4 = false;
    let countValue = '10';

    $: count = parseInt(countValue);

    onMount(() => {
        type = types[0];
    });

    function startInterval() {
        stopInterval();
        intervalId = setInterval(doAtInterval, 1000);
    }

    function stopInterval() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        count = parseInt(countValue);
    }

    function doAtInterval() {
        if (intervalId) {
            if (count > 1) {
                count--;
                return;
            } else {
                count = parseInt(countValue);
            }
        }

        key = keys[Math.floor(Math.random() * keys.length)];
        type = types[Math.floor(Math.random() * types.length)];
        inversion = inversions[Math.floor(Math.random() * inversions.length)];
    }
</script>
<div class="mx-auto max-w-md pt-2 px-4 md:px-0">

    <div class="flex flex-col items-center my-10">
        <div class="text-4xl mb-2 font-bold">{key}</div>
        <div class="text-4xl mb-2 font-bold">{type}</div>
        <div class="text-4xl font-bold">{inversion}</div>
    </div>

    <div class="flex">
        <button class="btn variant-filled flex-1" disabled={intervalId} on:click={doAtInterval}>Next</button>
    </div>

    <div class="flex flex-row items-center justify-center gap-3 mt-4">
        <button class="btn variant-filled flex-1" disabled="{intervalId}" on:click={startInterval}>Start</button>
        <div class="flex-1 flex border-2 bg-white drop-shadow-lg rounded-full h-12 justify-center items-center">
            <div class="font-bold">{count}</div>
        </div>
        <button class="btn variant-filled flex-1" disabled="{!intervalId}" on:click={stopInterval}>Stop</button>
    </div>

    <div class="mt-4 font-bold">Settings</div>
    <div class="flex flex-col">

        <label class="label cursor-pointer flex flex-row justify-between items-center">
            <span class="label-text">Major Chords</span>
            <SlideToggle name="major-slide" size="sm" bind:checked={includeMajor}/>
        </label>

        <label class="label cursor-pointer flex flex-row justify-between items-center">
            <span class="label-text">Major7 Chords</span>
            <SlideToggle name="major7-slide" size="md" bind:checked={includeMajor7}/>
        </label>

        <label class="label cursor-pointer flex flex-row justify-between items-center">
            <span class="label-text">Minor Chords</span>
            <SlideToggle name="minor-slide" bind:checked={includeMinor} size="sm"/>
        </label>
        <label class="label cursor-pointer flex flex-row justify-between items-center">
            <span class="label-text">Minor7 Chords</span>
            <SlideToggle name="minor-slide" bind:checked={includeMinor7} size="sm"/>
        </label>

        <label class="label cursor-pointer flex flex-row justify-between items-center">
            <span class="label-text">Sus2 Chords</span>
            <SlideToggle name="sus2-slide" bind:checked={includeSus2} size="sm"/>
        </label>

        <label class="label cursor-pointer flex flex-row justify-between items-center">
            <span class="label-text">Sus4 Chords</span>
            <SlideToggle name="sus4-slide" bind:checked={includeSus4} size="sm"/>
        </label>

        <label class="label cursor-pointer flex flex-row justify-between items-center">
            <span class="label-text">Count down (in seconds)</span>
            <input name="interval-input" type="text" bind:value={countValue}
                   class="input input-bordered w-14 bg-white h-10 text-center"
                   disabled={intervalId}/>
        </label>
    </div>
</div>