import type { PageParams, PageResult } from "@/types/gobal"
import type { BannerItem, CategoryItem, GuessItem, HotItem } from "@/types/home"
import { http } from "@/utils/http"

export const getBannerApi = (distributionSite = 1)=> {
    return http<BannerItem[]>({
        url: '/home/banner',
        method: 'GET',
        data: {
            distributionSite
        }
    })
}

export const getCategoryMutliApi = () => {
    return http<CategoryItem[]>({
        url: "/home/category/mutli"
    })
}

export const getHomeHotApi = () => {
    return http<HotItem[]>({
        url: "/home/hot/mutli"
    })
}

export const getHomeGuessApi = (data? : PageParams) => {
    return http<PageResult<GuessItem>>({
        url: "/home/goods/guessLike",
        method: "GET",
        data
    })
}