export const DEFAULT_THEME = 'light' as keyof typeof THEMES
export const THEMES = {
    'dark': {
        text: {
            primary: '#e4e4e4',
            secondary: '#bcbcbc',
        },
        background: {
            primary: '#1e1e1e',
            secondary: '#252526',
            tertiary: '#2d2d2d',
            quaternary: '#323233',
        }
    },
    'light': {
        text: {
            primary: '#1f1f1f',
            secondary: '#2e2e2e',
        },
        background: {
            primary: '#f3f3f3',
            secondary: '#e6e6e6',
            tertiary: '#d4d2d2',
            quaternary: '#c9c7c7',
        }
    }
} 

export const COLORS_BASE = {
    theme: THEMES[DEFAULT_THEME],
    default: {
        text: '#1f1f1f',
        background: '#f3f3f3'
    },
    accent: {
        primary: '#BB86FC',
        secondary: '#03DAC5'
    },
    status: {
        error: '#da141e',
        warn: '#ffc70e',
        neutral: '#a9acaf',
        success: '#1ed436',
        standby: '#1b7ad8'
    }
}
