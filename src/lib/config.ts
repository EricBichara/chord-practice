export interface Config {
    name: string,
    callback: string,
    isDefault: boolean
}

const config: Config[] = [
    {
        callback: 'major',
        name: 'Major',
        isDefault: true
    },
    {
        callback: 'major7',
        name: 'Major7',
        isDefault: true
    },
    {
        callback: 'minor',
        name: 'Minor',
        isDefault: false
    },
    {
        callback: 'minor7',
        name: 'Minor7',
        isDefault: false
    },
    {
        callback: 'sus2',
        name: 'Sus2',
        isDefault: false
    },
    {
        callback: 'sus4',
        name: 'Sus4',
        isDefault: false
    }

];

export default config;