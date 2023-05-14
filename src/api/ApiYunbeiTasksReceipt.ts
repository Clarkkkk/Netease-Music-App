/** 云贝收入 */
export interface ApiYunbeiTasksReceipt {
    api: '/yunbei/tasks/receipt',
    method: 'post',
    params: {
        /** 取出评论数量 , 默认为 10 */
        limit: any;
        /** 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*10, 其中 10 为 limit 的值 */
        offset: any;
    }
    return: ApiResponse;
}
