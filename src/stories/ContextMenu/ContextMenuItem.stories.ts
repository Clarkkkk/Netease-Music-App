import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/vue3'
import Button from 'components/Button.vue'
import ContextMenuItemComp from 'components/ContextMenu/ContextMenuItem.vue'

import ISolarPlayLineDuotone from '~icons/solar/play-line-duotone'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: '公共组件/ContextMenu/ContextMenuItem',
    component: ContextMenuItemComp,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        active: { control: 'boolean' },
        onClick: { control: 'function' }
    },
    args: { active: true } // default value
} satisfies Meta<typeof ContextMenuItemComp>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const ContextMenuItem: Story = {
    args: {
        active: false,
        onClick: action('click')
    },
    render: (args) => {
        return {
            setup() {
                return {
                    args,
                    onPlayClick: action('play clicked')
                }
            },
            components: {
                ContextMenuItemComp,
                Button,
                ISolarPlayLineDuotone
            },
            template: `
            <ContextMenuItemComp @click="onPlayClick">
                <ISolarPlayLineDuotone class="h-5 w-5" />
                <span>立即播放</span>
            </ContextMenuItemComp>
            `
        }
    }
}
