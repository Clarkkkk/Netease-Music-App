/** 获取用户信息 , 歌单，收藏，mv, dj 数量 */
export interface ApiUserSubcount {
    api: '/user/subcount'
    method: 'post'
    return: {
        createdPlaylistCount: number
        subPlaylistCount: number
    }
}
