export const SEARCH = {
    SINGLE: 1,
    ALBUM: 10,
    PLAYLIST: 1000,
    MIXED: 1018,
    LYRICS: 1006,
    ARTIST: 100
} as const

export type SearchValue = (typeof SEARCH)[keyof typeof SEARCH]

/** 搜索 */
export interface ApiSearch {
    api: '/search'
    method: 'post'
    params: {
        keywords: string
        /** 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样) */
        type?: 1018
        /** 返回数量 , 默认为 30 */
        limit?: number
        /** 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 */
        offset?: number
    }
    return: {
        code: number
        result: {
            song: {
                moreText: string
                songs: {
                    name: string
                    id: number
                    ar: {
                        id: number
                        name: string
                        tns: string[]
                        alias: string[]
                        alia?: string[]
                    }[]
                    alia: string[]
                    al: {
                        id: number
                        name: string
                        picUrl: string
                    }
                    publishTime: number
                }[]
                more: boolean
            }
            code: number
            playList: {
                moreText: string
                more: boolean
                playLists: {
                    id: number
                    name: string
                    coverImgUrl: string
                    creator: {
                        nickname: string
                        userId: number
                        avatarUrl: string
                    }
                    subscribed: boolean
                    trackCount: number
                    userId: number
                    playCount: number
                    bookCount: number
                    specialType: number
                    officialTags: string[]
                    description: null | string
                }[]
            }
            artist: {
                moreText: string
                artists: {
                    id: number
                    name: string
                    picUrl: string
                    alias: string[]
                    albumSize: number
                    picId: number
                    fansGroup: null
                    img1V1Url: string
                    accountId?: number
                    img1V1: number
                    transNames?: string[]
                    identityIconUrl?: string
                    mvSize: number
                    followed: boolean
                    alg: string
                    alia?: string[]
                    trans: null | string
                }[]
                more: boolean
            }
            album: {
                moreText: string
                albums: {
                    name: string
                    id: number
                    type: string
                    size: number
                    picId: number
                    blurPicUrl: string
                    companyId: number
                    pic: number
                    picUrl: string
                    publishTime: number
                    description: string
                    tags: string
                    company: string
                    briefDesc: string
                    artist: {
                        name: string
                        id: number
                        briefDesc: string
                        picUrl: string
                        alias: string[]
                        alia: string[]
                        transNames?: string[]
                    }
                    artists: {
                        name: string
                        id: number
                        briefDesc: string
                        picUrl: string
                        alias: string[]
                        alia: string[]
                        transNames?: string[]
                    }[]
                }[]
                more: boolean
            }
            user: {
                moreText: string
                more: boolean
                users: {
                    defaultAvatar: boolean
                    province: number
                    authStatus: number
                    followed: boolean
                    avatarUrl: string
                    accountStatus: number
                    gender: number
                    city: number
                    birthday: number
                    userId: number
                    userType: number
                    nickname: string
                    signature: string
                    description: string
                    detailDescription: string
                    backgroundUrl: string
                    expertTags: null
                    experts: null
                    vipType: number
                    remarkName: null
                }[]
            }
            order: string[]
        }
    }
}
