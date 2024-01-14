interface Artist {
    id: number
    name: string
    picUrl: null
    alias: string[]
    albumSize: number
    trans: null
}

interface Album {
    id: number
    name: string
    artist: Artist
    publishTime: number
    size: number
    picUrl: string
    transNames?: string[]
}

/** 搜索 */
export type ApiSearchDetail<T extends 1 | 1006 | 10 | 1000> = {
    api: '/search'
    method: 'post'
    params: {
        keywords: string
        /** 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样) */
        type?: T
        /** 返回数量 , 默认为 30 */
        limit?: number
        /** 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 */
        offset?: number
    }
    return: {
        code: number
        result: T extends 1
            ? {
                  songs: {
                      id: number
                      name: string
                      artists: Artist[]
                      album: Album
                      alias: string[]
                      transNames?: string[]
                  }[]
                  hasMore: boolean
                  songCount: number
              }
            : T extends 1006
              ? {
                    songs: {
                        id: number
                        name: string
                        artists: Artist[]
                        album: Album
                        alias: any[]
                        lyrics: {
                            txt: string
                            range: {
                                first: number
                                second: number
                            }
                        }
                        alg: string
                        mark: number
                    }[]
                    songCount: number
                }
              : T extends 10
                ? {
                      hlWords: string[]
                      albums: Album[]
                      albumCount: number
                  }
                : T extends 1000
                  ? {
                        playlists: {
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
                            officialTags: string[] | null
                            description: null | string
                        }[]
                        hasMore: boolean
                        hlWords: string[]
                        playlistCount: number
                        searchQcReminder: null
                    }
                  : never
    }
}
