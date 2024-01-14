/** 喜欢音乐 */
export interface ApiLike {
    api: '/like'
    method: 'get'
    params: {
        /** 歌曲 id */
        id: any
        /** 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢 */
        like: any
    }
    return: ApiResponse
}
