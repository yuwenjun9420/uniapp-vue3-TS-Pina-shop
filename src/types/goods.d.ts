import type { GoodsItem } from "./gobal"

export type GoodsResult = {
    id: string
    name: string
    desc: string
    price: string
    mainPictures: string[]
    details: Details
    similarProducts: GoodsItem[]
    skus: SkuItem[],
    specs: SpecsItem[]
}
export type SpecsItem = {
    id: string
    name: string
    values: SpecValuesItem[]
}
export type SpecValuesItem ={
    desc: string
    name: string
    picture: string
}
export type SkuItem = {
    /** sku id */
    id: string
    /** sku 库存 */
    inventory: number
    /** sku 原价 */
    oldPrice: number
    /** sku 图片 */
    picture: string
    /** sku 当前价 */
    price: number
    /** sku 编码 */
    skuCode: string
    /** 规格集合[ 规格信息 ] */
    specs: SkuSpecItem[]
  }
  export type SkuSpecItem = {
    /** 规格名称 */
    name: string
    /** 可选值名称 */
    valueName: string
  }

export type Details = {
    properties: DetailsItem[]
    pictures: string[]
}

export type DetailsItem = {
    name: string
    value: string
}