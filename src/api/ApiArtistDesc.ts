/** 获取歌手描述 */
export interface ApiArtistDesc {
    api: '/artist/desc'
    method: 'post'
    params: {
        /** 歌手 id */
        id: number
    }
    return: {
        code: number
        message: string
        data: {
            videoCount: number
            artist: {
                id: number
                cover: string
                avatar: string
                name: string
                transNames: string[]
                alias: string[]
                identities: any[]
                identifyTag: null
                briefDesc: string
                rank: null
                albumSize: number
                musicSize: number
                mvSize: number
            }
            blacklist: boolean
            preferShow: number
            showPriMsg: boolean
            secondaryExpertIdentiy: {
                expertIdentiyId: number
                expertIdentiyName: string
                expertIdentiyCount: number
            }[]
        }
    }
}
