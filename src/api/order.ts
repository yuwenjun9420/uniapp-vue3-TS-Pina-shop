import type { OrderResult,OrderPreNowParams, OrderParams, OrderDetailResult, OrderLogistics, OrderListResult, OrderListPrams } from '@/types/order'
import { http } from '@/utils/http'

export const getOrderPreApi = () => {
    return http<OrderResult>({
        url: '/member/order/pre'
    })
}

export const getOrderPreNowApi = (data: OrderPreNowParams) => {
    return http<OrderResult>({
        url: '/member/order/pre/now',
        data
    })
}

export const postOrderApi = (data: OrderParams) => {
    return http<{id: string}>({
        url: '/member/order',
        method: 'POST',
        data
    })
}

export const getOrderByIdApi = (id: string) => {
    return http<OrderDetailResult>({
        url:`/member/order/${id}`
    })
}

export const getPayWxPayApi = (id: string) => {
    return http<WechatMiniprogram.RequestPaymentOption>({
        url: '/pay/wxPay/miniPay',
        data: {
            orderId: id
        }
    })
}

export const getPayMockApi = (id: string) => {
    return http<string>({
        url: '/pay/mock',
        data: {
            orderId: id
        }
    })
}

export const getOrderConsignmentApi = (id: string) => {
    return http({
        url: `/member/order/consignment/${id}`
    })
}

export const putOrderReceiptApi = (id: string) => {
    return http<OrderDetailResult>({
        url: `/member/order/${id}/receipt`,
        method: 'PUT'
    })
}

export const getOrderLogisticsApi = (id: string) => {
    return http<OrderLogistics>({
        url: `/member/order/${id}/logistics`
    })
}

export const getOrderListApi = (data?: OrderListPrams) => {
    return http<OrderListResult>({
        url: '/member/order',
        data
    })
}

export const deleteOrderApi = (id: string) => {
    return http({
        url: '/member/order',
        method: 'DELETE',
        data: {
            ids: [id]
        }
    })
}
export const putOrderCancelApi = (id: string,cancelReason: string) => {
    return http({
        url: `/member/order/${id}/cancel`,
        method: 'PUT',
        data: {
            cancelReason
        }
    })
}

export const getOrderRepurchaseApi = (id: string) => {
    return http<OrderResult>({
        url: `/member/order/repurchase/${id}`
    })
}
