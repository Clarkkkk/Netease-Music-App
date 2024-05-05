/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.vue', './index.html'],
    theme: {
        extend: {
            animation: {
                'spin-reverse': 'spin 1s linear reverse infinite'
            },
            width: {
                128: '32rem'
            },
            maxWidth: {
                128: '32rem'
            },
            height: {
                128: '32rem',
                '11/12': '91.666667%'
            },
            maxHeight: {
                128: '32rem'
            },
            flex: {
                fixed: '0 0 auto'
            }
        }
    },
    daisyui: {
        logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
        themes: [
            'light',
            'dark',
            'cupcake',
            'bumblebee',
            'emerald',
            'corporate',
            'synthwave',
            'retro',
            'cyberpunk',
            'valentine',
            'halloween',
            'garden',
            'forest',
            'aqua',
            'lofi',
            'pastel',
            'fantasy',
            'wireframe',
            'black',
            'luxury',
            'dracula',
            'cmyk',
            'autumn',
            'business',
            'acid',
            'lemonade',
            'night',
            'coffee',
            'winter',
            'dim',
            'nord',
            'sunset',
            {
                'netease-classic': {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    ...require('daisyui/src/theming/themes')['[data-theme=light]'],
                    primary: '#ff1b18',
                    'primary-content': '#ffcfca',
                    secondary: '#ff1b18',
                    'secondary-content': '#ffcfca',
                    accent: '#327ffb'
                }
            },
            {
                'netease-classic-dark': {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
                    primary: '#ff1b18',
                    'primary-content': '#ffcfca',
                    secondary: '#ff1b18',
                    'secondary-content': '#ffcfca',
                    accent: '#327ffb'
                }
            }
        ]
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/container-queries'),
        require('tailwindcss-containment')
    ]
}
