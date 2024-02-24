import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-storysource'
        // 'storybook-addon-vue-slots'
    ],
    framework: {
        name: '@storybook/vue3-vite',
        options: {
            docgen: "vue-component-meta"
        },
    },
    docs: {
        autodocs: 'tag'
    },
    core: {
        builder: {
            name: '@storybook/builder-vite',
            options: {
                viteConfigPath: './vite.config.ts',
            }
        }
    }
}
export default config
