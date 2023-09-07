import type { AddressItem } from "@/types/address";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAddressStore = defineStore('address',()=>{
    const addressInfo = ref<AddressItem>()

    const setAddressInfo = (val: AddressItem) => {
        addressInfo.value = val
    }

    return {
        addressInfo,
        setAddressInfo
    }
})