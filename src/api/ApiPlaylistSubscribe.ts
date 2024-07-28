/** 收藏/取消收藏歌单 */
export interface ApiPlaylistSubscribe {
    api: '/playlist/subscribe'
    method: 'post'
    params: {
        /** 类型,1:收藏,2:取消收藏 */
        t: 1 | 2
        /** 歌单 id */
        id: number
    }
    return: ApiResponse
}
