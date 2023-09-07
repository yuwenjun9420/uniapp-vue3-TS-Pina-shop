import type { GoodsItem, PageParams, PageResult } from "./gobal"

export type HotParams = PageParams & { subType?: string }
export type HotResult<T> = {
    bannerPicture: string
    id: string
    title: string
    subTypes: T[]
}

export type hotItem = {
    id: string
    title: string
    goodsItems: PageResult<GoodsItem>
}