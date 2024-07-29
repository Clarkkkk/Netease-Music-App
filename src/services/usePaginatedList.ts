import { onMounted, type Ref, ref } from 'vue'

type PaginatedListConfig<T, S> = {
    limit: number
    getParams: () => S
    immediate?: boolean
    requestFn: (args: S & { limit?: number; offset?: number }) => Promise<{
        data: T[]
        more: boolean
    }>
    hasMore: (res: { data: T[]; more: boolean }) => boolean
}

export function usePaginatedList<T, S>({
    limit,
    getParams,
    immediate,
    requestFn,
    hasMore
}: PaginatedListConfig<T, S>) {
    const list = ref<T[]>([]) as Ref<T[]>
    const more = ref(true)
    const loading = ref(false)
    const currentOffset = ref(0)

    const fetchList = async () => {
        if (loading.value) {
            return
        }

        loading.value = true
        try {
            const res = await requestFn({
                ...getParams(),
                limit,
                offset: currentOffset.value
            })
            list.value.push(...res.data)
            more.value = hasMore(res)
            currentOffset.value += limit
        } finally {
            loading.value = false
        }
    }

    const reload = () => {
        list.value = []
        more.value = true
        currentOffset.value = 0
        fetchList()
    }

    onMounted(() => {
        if (immediate) {
            fetchList()
        }
    })

    return {
        list,
        more,
        loading,
        reload,
        fetchList
    }
}
