export interface Config {
    name: string,
    callback: string,
    isDefault: boolean,
    chords: number[]
}

const config: Config[] = [
    {
        callback: 'major',
        name: 'Major',
        isDefault: true,
        chords: [5, 8]
    },
    {
        callback: 'major7',
        name: 'Major7',
        isDefault: true,
        chords: [5, 8, 12]
    },
    {
        callback: 'minor',
        name: 'Minor',
        isDefault: true,
        chords: [4, 8]
    },
    {
        callback: 'minor7',
        name: 'Minor7',
        isDefault: true,
        chords: [4, 8, 11]
    },
    {
        callback: 'sus2',
        name: 'Sus2',
        isDefault: false,
        chords: [3, 8]
    },
    {
        callback: 'sus4',
        name: 'Sus4',
        isDefault: false,
        chords: [6, 8]
    }

];

export default config;