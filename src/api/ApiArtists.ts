/** 获取歌手单曲 */
export interface ApiArtists {
    api: '/artists'
    method: 'post'
    params: {
        /** 歌手 id, 可由搜索接口获得 */
        id: number
    }
    return: {
        more: boolean
        code: number
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
            publishTime: number
            accountId: number
            picIdStr: string
            transNames: string[]
            img1V1IdStr: string
            mvSize: number
        }
        hotSongs: {
            rtUrls: any[]
            ar: {
                id: number
                name: string
                tns?: string[]
                alia?: string[]
            }[]
            al: {
                id: number
                name: string
                picUrl: string
                picStr: string
                pic: number
                tns?: string[]
                alia?: string[]
            }
            st: number
            noCopyrightRcmd: null
            songJumpInfo: null
            djId: number
            no: number
            fee: number
            mv: number
            t: number
            v: number
            cd: string
            rtUrl: null
            ftype: number
            alia: string[]
            pop: number
            rt: string
            mst: number
            cp: number
            crbt: null
            cf: string
            dt: number
            rtype: number
            rurl: null
            pst: number
            a: null
            name: string
            id: number
            tns?: string[]
        }[]
    }
}
