import type { GoodsItem } from "./gobal"

export type BannerItem = {
    hrefUrl: string
    id: string
    imgUrl: string
    type: number
}

export type CategoryItem = {
    id: string
    name: string
    icon: string
}

export type HotItem = {
    id: string
    title: string
    alt: string
    type: string
    pictures: string[]
}

export type GuessItem = GoodsItem