<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text class="text" :class="activeIndex === index ? 'active' : ''" v-for="item,index in hotList" :key="item.id" @tap="activeIndex = index">{{ item.title }}</text>
    </view>
    <!-- 推荐列表 -->
    <scroll-view 
      v-show="activeIndex === index" 
      v-for="item,index in hotList" 
      :key="item.id"
      scroll-y class="scroll-view"
      @scrolltolower="onScrollToLower"
      >
      <view class="goods">
        <navigator hover-class="none" class="navigator" v-for="goods in item.goodsItems.items" :key="goods.id" :url="`/pages/goods/goods?id=${goods.id}`">
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.desc }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">
        <!-- {{ finish ? '没有更多数据~' : '正在加载...' }} -->
        {{ item.finish ? '没有更多数据~' : '正在加载...' }}
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onReady } from '@dcloudio/uni-app'
import { getHotApi } from "@/api/hot"
import { ref } from 'vue';
import type { HotParams, hotItem } from '@/types/hot';

// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]

let query = defineProps<{
  type: string
}>()

const currentMap = hotMap.find(item => item.type === query.type)

const bannerPicture = ref<string>('')
const hotList = ref<(hotItem & { finish?: boolean })[]>([])
let activeIndex = ref<number>(0)

let finish = ref<boolean>(false)

const getHotList = async () => {
  let res = await getHotApi(currentMap!.url,{
    page: import.meta.env.DEV ? 30 : 1,
    pageSize: 10
  })
  bannerPicture.value = res.result.bannerPicture
  hotList.value = res.result.subTypes
  console.log("getHotList:::", hotList)
}

const onScrollToLower = async () => {
  console.log("触底了...")
  finish.value = false

  const curSubType = hotList.value[activeIndex.value]
  console.log("curSubType:::",curSubType)

  if(curSubType.goodsItems.page < curSubType.goodsItems.pages){
    curSubType.goodsItems.page ++
  }else{
    curSubType.finish = true
    finish.value = true
    uni.showToast({
      icon: 'none',
      title: '没有更多数据~'
    })
    return
  }
  const pageParams: HotParams = {
    page: curSubType.goodsItems.page,
    pageSize: curSubType.goodsItems.pageSize,
    subType: curSubType.id
  }
  let res = await getHotApi(currentMap!.url,pageParams)
  let newSubType = res.result.subTypes[activeIndex.value]
  curSubType.goodsItems.items.push(...newSubType.goodsItems.items)

  // getHotList()
}

onLoad(() => {
  getHotList()
})
onReady(() => {
  uni.setNavigationBarTitle({
    title: currentMap!.title
  })
})
</script>


<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}

.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  image {
    width: 100%;
  }
}

.scroll-view {
  flex: 1;
  overflow: scroll;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;

  .text {
    margin: 0 20rpx;
    position: relative;
  }

  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;

  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
    box-sizing: border-box;
  }

  .thumb {
    width: 305rpx;
    height: 305rpx;
  }

  .name {
    height: 88rpx;
    line-height: 44rpx;
    font-size: 26rpx;
    overflow:hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }

  .symbol {
    font-size: 70%;
  }

  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>