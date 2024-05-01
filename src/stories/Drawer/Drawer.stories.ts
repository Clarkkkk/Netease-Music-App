import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/vue3'
import { Button, Drawer, DrawerBackground, DrawerContent, DrawerTrigger, Image } from 'components'

import IFluentDismiss32Regular from '~icons/fluent/dismiss-32-regular'
import ISolarHamburgerMenuLineDuotone from '~icons/solar/hamburger-menu-line-duotone'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: '公共组件/Drawer/Drawer',
    component: Drawer,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        // default: { control: 'function' }
    },
    args: {} // default value
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const DrawerStory: Story = {
    args: {},
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
                Button,
                Drawer,
                DrawerBackground,
                DrawerContent,
                DrawerTrigger,
                Image,
                IFluentDismiss32Regular,
                ISolarHamburgerMenuLineDuotone
            },
            template: `
            <Drawer>
                <template #default="drawerProps">
                    <DrawerTrigger class="btn-square btn-ghost">
                        <i-solar-hamburger-menu-line-duotone class="h-6 w-6" />
                    </DrawerTrigger>
        
                    <DrawerBackground>
                        <DrawerContent class="mobile-menu flex flex-col">
                            <div class="flex justify-between p-2">
                                <div></div>
                                <Button
                                    class="btn-square btn-ghost"
                                    @click="drawerProps.close()"
                                >
                                    <i-fluent-dismiss-32-regular />
                                </Button>
                            </div>
                            <template v-if="profile">
                                <div class="flex items-center px-6">
                                    <Image
                                        :src="profile.profile.avatarUrl"
                                        class="h-14 w-14 rounded-full"
                                        :size="112"
                                    />
                                    <div class="ml-4">
                                        <div>
                                            <span class="text-lg font-bold">
                                                {{ profile.profile.nickname }}
                                            </span>
                                            <span class="badge badge-primary badge-sm ml-2">
                                                {{ \`LV \${profile.level}\` }}
                                            </span>
                                        </div>
                                        <div
                                            v-if="profile.profile.signature"
                                            class="text-sm text-base-content"
                                        >
                                            {{ profile.profile.signature }}
                                        </div>
                                    </div>
                                </div>
                                <div class="menu-divider my-6"></div>
                            </template>
        
                            <div class="relative h-full p-2">
                                <div class="flex flex-col">
                                    <Button
                                        v-for="item in navRoutes"
                                        :key="item.name"
                                        :class="[
                                            'btn-ghost',
                                            'justify-start',
                                            {
                                                'bg-primary/10': isActiveRoute(item.to),
                                                'font-bold': isActiveRoute(item.to),
                                                'text-primary': isActiveRoute(item.to)
                                            }
                                        ]"
                                        @click="onRouteClick(item.to, drawerProps.close)"
                                    >
                                        <span>{{ item.name }}</span>
                                    </Button>
                                </div>
        
                                <Button
                                    v-if="loggedIn"
                                    class="logout-btn btn-primary btn-outline absolute bottom-4 mt-8"
                                    @click="onLogout"
                                >
                                    退出登录
                                </Button>
                                <Button
                                    v-else
                                    class="logout-btn btn-primary absolute bottom-4 mt-8"
                                    @click="onLoginClick(drawerProps.close)"
                                >
                                    登录
                                </Button>
                            </div>
                        </DrawerContent>
                    </DrawerBackground>
                </template>
            </Drawer>
            `
        }
    }
}
