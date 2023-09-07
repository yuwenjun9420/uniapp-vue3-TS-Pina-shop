import type { loginItem, loginParams } from '@/types/login'
import { http } from '@/utils/http'

export const PostLoginApi = (data: loginParams) => {
    return http({
        url: '/login/wxMin',
        method: 'POST',
        data
    })
}

export const PostLoginSimpleApi = (phoneNumber: string) => {
    return http<loginItem>({
        url: '/login/wxMin/simple',
        method: 'POST',
        data: {
            phoneNumber
        }
    })
}