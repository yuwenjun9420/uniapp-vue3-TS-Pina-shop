export type AddressParams = {
    receiver: string
    contact: string
    provinceCode: string
    cityCode: string
    countyCode: string
    address: string
    fullLocation?: string
    isDefault: number
}

export type AddressItem = AddressParams & {
    id: string
}

// export type IsDefault = {
//     '是': 1,
//     '否': 0
// }