/** 获取歌手专辑 */
export interface ApiArtistAlbum {
    api: '/artist/album'
    method: 'post'
    params: {
        /** 歌手 id */
        id: number
        /** 取出数量 , 默认为 30 */
        limit?: number
        /** 偏移数量 , 用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认 */
        offset?: number
    }
    return: {
        code: number
        more: boolean
        artist: {
            img1V1Id: number
            topicPerson: number
            picId: number
            musicSize: number
            albumSize: number
            briefDesc: string
            picUrl: string
            img1V1Url: string
            followed: boolean
            trans: string
            alias: string[]
            name: string
            id: number
            picIdStr: string
            transNames: string[]
            img1V1IdStr: string
        }
        hotAlbums: {
            songs: any[]
            paid: boolean
            onSale: boolean
            mark: number
            awardTags: null
            copyrightId: number
            picId: number
            company: string
            briefDesc: string
            publishTime: number
            picUrl: string
            commentThreadId: string
            blurPicUrl: string
            companyId: number
            pic: number
            status: number
            subType: string
            description: string
            tags: string
            alias: string[]
            name: string
            id: number
            type: string
            size: number
            picIdStr: string
            isSub: boolean
            transNames?: string[]
        }[]
    }
}
