<template>
  <view class="content">
    <CustomNavbar />
    <pageSkeleton v-if="!isLoading"/>
    <scroll-view 
      v-else
      enable-back-to-top 
      refresher-enabled 
      :refresher-triggered="isTriggered" 
      @scrolltolower="onScrollToLower" 
      @refresherrefresh="onRefresherrefresh" 
      class="scroll-view" scroll-y>
        <XtxSwiper :list="bannerList" />
        <CategoryPanel :categoryList="categoryList" />
        <HotPanel :hotList="hotList" />
        <XtxGuess ref="guessRef"/>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import pageSkeleton from './pageSkeleton.vue'

import { onLoad } from '@dcloudio/uni-app'
import { getBannerApi, getCategoryMutliApi,getHomeHotApi } from "@/api/home"
import type { BannerItem, CategoryItem,HotItem } from "@/types/home"
import { ref } from 'vue';
import { useGuessList } from '@/composables/guess'
const bannerList = ref<BannerItem[]>([])
const getBannerList = async () => {
  let res = await getBannerApi()
  bannerList.value = res.result
}

let categoryList = ref<CategoryItem[]>([])
const getCategoryList = async () => {
  let res = await getCategoryMutliApi()
  categoryList.value = res.result
}

const hotList = ref<HotItem[]>([])
const getHotList = async () => {
  let res = await getHomeHotApi()
  hotList.value = res.result
}

const { guessRef,onScrollToLower } = useGuessList()

const isTriggered = ref(false)
const onRefresherrefresh = async() => {
  console.log("下拉刷新...")
  isTriggered.value = true
  guessRef.value?.resetData()

  await Promise.all([
    getBannerList(),
    getCategoryList(),
    getHotList(),
    guessRef.value?.getMore()
  ])

  isTriggered.value = false

}


const isLoading = ref(false)
onLoad(async () => {
  await Promise.all([
    getBannerList(),
    getCategoryList(),
    getHotList()
  ])
  isLoading.value = true
})

</script>

<style lang="scss">
page {
  background: #f7f7f7;
  height: 100%;
  overflow: hidden;
}
.content{
  height: 100%;
  display: flex;
  flex-direction: column;
  .scroll-view{
    flex: 1;
    overflow: hidden;
  }
}

</style>
