import type { CategoryResult } from '@/types/category'
import { http } from '@/utils/http'
export const getCategoryTopApi = () => {
    return http<CategoryResult[]>({
        url: '/category/top'
    })
}