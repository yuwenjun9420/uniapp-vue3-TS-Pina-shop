import type { GoodsItem } from "./gobal"

export type CategoryResult = {
    id: string
    name: string
    picture: string
    imageBanners: string[]
    children: CategoryItem[]
}

export type CategoryItem = {
    id: string
    name: string
    picture: string
    goods: GoodsItem[]
}