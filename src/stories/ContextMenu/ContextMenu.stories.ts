import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/vue3'
import Button from 'components/Button.vue'
import ContextMenu from 'components/ContextMenu/ContextMenu.vue'
import ContextMenuItem from 'components/ContextMenu/ContextMenuItem.vue'

import ISolarMenuDotsBold from '~icons/solar/menu-dots-bold'
import ISolarPlayCircleLineDuotone from '~icons/solar/play-circle-line-duotone'
import ISolarPlayLineDuotone from '~icons/solar/play-line-duotone'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: '公共组件/ContextMenu/ContextMenu',
    component: ContextMenu,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: ['normal', 'large'] },
        placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] }
    },
    args: { size: 'normal', placement: 'bottom' } // default value
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Normal: Story = {
    args: {
        size: 'normal',
        placement: 'bottom'
    },
    render: (args) => {
        return {
            setup() {
                return {
                    args,
                    onPlayClick: action('play clicked'),
                    onPlayNextClick: action('play next clicked')
                }
            },
            components: {
                ContextMenu,
                ContextMenuItem,
                Button,
                ISolarPlayCircleLineDuotone,
                ISolarPlayLineDuotone
            },
            template: `
            <ContextMenu v-bind="args">
                <template #default>
                    <Button class="btn-primary btn-sm">
                        context menu
                    </Button>
                </template>

                <template #menu>
                    <ContextMenuItem @click="onPlayClick">
                        <ISolarPlayLineDuotone class="h-5 w-5" />
                        <span>立即播放</span>
                    </ContextMenuItem>
                    <ContextMenuItem
                        @click="onPlayNextClick"
                    >
                        <i-solar-play-circle-line-duotone class="h-5 w-5" />
                        <span>下一首播放</span>
                    </ContextMenuItem>
                </template>
            </ContextMenu>
            `
        }
    }
}

export const Large: Story = {
    args: {
        size: 'large',
        placement: 'bottom'
    },
    render: (args) => {
        return {
            setup() {
                return {
                    args,
                    onPlayClick: action('play clicked'),
                    onPlayNextClick: action('play next clicked')
                }
            },
            components: {
                ContextMenu,
                ContextMenuItem,
                Button,
                ISolarPlayCircleLineDuotone,
                ISolarPlayLineDuotone,
                ISolarMenuDotsBold
            },
            template: `
            <ContextMenu v-bind="args">
                <template #default>
                    <Button class="btn-primary btn-sm">
                        context menu
                    </Button>
                </template>

                <template #menu>
                    <ContextMenuItem @click="onPlayClick">
                        <i-solar-play-line-duotone class="h-5 w-5" />
                        <span>立即播放</span>
                    </ContextMenuItem>
                    <ContextMenuItem
                        @click="onPlayNextClick"
                    >
                        <i-solar-play-circle-line-duotone class="h-5 w-5" />
                        <span>下一首播放</span>
                    </ContextMenuItem>
                </template>
            </ContextMenu>
            `
        }
    }
}
