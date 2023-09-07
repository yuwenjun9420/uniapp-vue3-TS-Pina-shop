import type { ProfileParams, ProfileResult } from '@/types/profile'
import { http } from  '@/utils/http'

export const getProfileApi = () => {
    return http<ProfileResult>({
        url: '/member/profile'
    })
}

export const putProfileApi = (data: ProfileParams) => {
    return http<ProfileResult>({
        url: '/member/profile',
        method: 'PUT',
        data
    })
}