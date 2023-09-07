import type { AddressItem, AddressParams } from '@/types/address'
import { http } from '@/utils/http'

export const postMemberAddressApi = (data: AddressParams) => {
    return http({
        url: '/member/address',
        method: 'POST',
        data 
    })
}

export const getMemberAddressListApi = () => {
    return http<AddressItem[]>({
        url: '/member/address',
        method: 'GET'
    })
}

export const getMemberAddressByIdApi = (id: string) => {
    return http<AddressItem>({
        url: `/member/address/${id}`
    })
}

export const putMemberAddressByIdApi = (id: string,data: AddressParams) => {
    return http({
        url: `/member/address/${id}`,
        method: 'PUT',
        data
    })
}

export const deleteMemberAddressByIdApi = (id: string) => {
    return http({
        url: `/member/address/${id}`,
        method: 'DELETE'
    })
}