import type { HotParams, HotResult, hotItem } from '@/types/hot'
import { http } from '@/utils/http'

export const getHotApi = (url: string,data?: HotParams) => {
    return http<HotResult<hotItem>>({
        url,
        method: 'GET',
        data
    })
}