/** 收藏/取消收藏专辑 */
export interface ApiAlbumSub {
    api: '/album/sub'
    method: 'post'
    params: {
        /** 专辑 id */
        id: number
        /** 是否收藏,1 为收藏,0 为取消收藏 */
        t: 0 | 1
    }
    return: ApiResponse
}
