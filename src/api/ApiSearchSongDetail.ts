interface Artist {
    id: number
    name: string
    tns: string[]
    alias: string[]
    alia?: string[]
}

interface Album {
    id: number
    name: string
    picUrl: string
    tns: string[]
}

/** 搜索 */
export type ApiSearchSongDetail<T extends 1 | 1006 = 1> = {
    api: '/cloudsearch'
    method: 'post'
    params: {
        keywords: string
        /** 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样) */
        type: T
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
                      ar: Artist[]
                      alia: string[]
                      tns?: string[]
                      al: Album
                  }[]
                  songCount: number
              }
            : T extends 1006
              ? {
                    songs: {
                        id: number
                        name: string
                        ar: Artist[]
                        alia: string[]
                        tns?: string[]
                        al: Album
                        lyrics: string[]
                    }[]
                    songCount: number
                }
              : never
    }
}
