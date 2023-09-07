import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'

export const postMemberCartApi = (skuId: string,count: number) => {
    return http({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}

export const getMemberCartApi = () => {
    return http<CartItem[]>({
        url: '/member/cart'
    })
}

export const deleteMemberCartApi = (ids: string[]) => {
    return http({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}

export const putMemberCartApi = (skuId: string,count?: number,selected?: boolean) => {
    return http({
        url: `/member/cart/${skuId}`,
        method: 'PUT',
        data: {
            selected,
            count
        }
    })
}

export const putMemberCartSelectApi = (selected: boolean) => {
    return http({
        url: `/member/cart/selected`,
        method: 'PUT',
        data: {
            selected
        }
    })
}