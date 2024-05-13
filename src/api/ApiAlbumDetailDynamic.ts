/** 专辑动态信息 */
export interface ApiAlbumDetailDynamic {
    api: '/album/detail/dynamic'
    method: 'post'
    params: {
        /** 专辑 id */
        id: number
    }
    return: {
        onSale: boolean
        commentCount: number
        likedCount: number
        shareCount: number
        subTime: number
        isSub: boolean
        subCount: number
        code: number
    }
}
