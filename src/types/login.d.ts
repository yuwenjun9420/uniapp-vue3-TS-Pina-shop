import type { BaseProfile } from "./gobal"

export type loginParams = {
    code: string
    encryptedData: string
    iv: string
}

export type loginItem = BaseProfile & {
    mobile: string
    token: string
}