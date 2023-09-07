import type { loginItem } from '@/types/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useMemberStore = defineStore('member', () => {
	const profile = ref<loginItem>()
	const setProfile = (val : loginItem) => {
		profile.value = val
	}
	const clearProfile = () => {
		profile.value = undefined
	}

	return {
		profile,
		setProfile,
		clearProfile
	}

}, {
	persist: {
		storage: {
			getItem(key: any) {
				return uni.getStorageSync(key)
			},
			setItem(key: any, value: any) {
				uni.setStorageSync(key, value)
			},
		},
	}
})