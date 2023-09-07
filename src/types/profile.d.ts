import type { BaseProfile } from "./gobal"

export type ProfileResult = BaseProfile & {
    birthday?: string
    fullLocation?: string
    gender?: Gender
    profession?: string
}
export type Gender = '男'|'女' 

export type ProfileParams = Pick<ProfileResult,'nickname' | 'gender' | 'birthday' | 'profession'> & {
    provinceCode?: string
    cityCode?: string
    countyCode?: string
}