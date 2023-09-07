<script setup lang="ts">
import { getPayMockApi,getPayWxPayApi,getOrderListApi,deleteOrderApi } from '@/api/order';
import type { OrderListResult,OrderListPrams } from '@/types/order'
import { OrderState, orderStateList } from '@/utils/constant';
import { onLoad } from '@dcloudio/uni-app';
import { watch } from 'vue';
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// tabs 数据
const orderTabs = ref([
  { orderState: 0, title: '全部' },
  { orderState: 1, title: '待付款' },
  { orderState: 2, title: '待发货' },
  { orderState: 3, title: '待收货' },
  { orderState: 4, title: '待评价' },
])
const query = defineProps<{
  type: string
}>()
console.log("query::::",query.type,typeof query.type)
const isFinish = ref(false)

const activeIndex = ref<number>(0)
activeIndex.value = orderTabs.value.findIndex(item=>item.orderState === Number(query.type))

const orderListResult = ref<OrderListResult>()
const getOrderList = async () => {
  isFinish.value = false
  let res = await getOrderListApi({
    page: 1,
    pageSize: 10,
    orderState: activeIndex.value
  })
  orderListResult.value = res.result;
  (orderListResult.value?.items.length === 0 
  || orderListResult.value.page === orderListResult.value.pages)
   && (isFinish.value = true)
  console.log('getOrderListApi:::',res)
}

const onChangeSwiper:UniHelper.SwiperOnChange = (event) => {
  activeIndex.value = event.detail.current
  console.log(event.detail.current)
}

const onScrollToLower = async () =>{
  console.log('触底了...')
  if(isFinish.value){
    uni.showToast({
      icon:'none',
      title: '没有更多数据~'
    })
    return 
  }
  let { page,pages,pageSize } = orderListResult.value!
  if(page < pages){
    page ++
    let res = await getOrderListApi({
      page,
      pageSize,
      orderState: activeIndex.value
    })
    orderListResult.value!.page = page
    orderListResult.value!.items.push(...res.result.items)
    console.log(res,"res:::::")
  }else{
    isFinish.value = true
  }
}

watch(activeIndex,()=>{
  orderListResult.value!.items = []
  getOrderList()
  console.log('activeIndex:::',activeIndex)
})

const onGoPayment = async (id: string) => {
  if(import.meta.env.DEV){
    await getPayMockApi(id)
  }else{
    let res = await getPayWxPayApi(id)
    // #ifdef MP-WEIXIN
    await wx.requestPayment(res.result)
    // #endif
  }
  uni.showToast({
    icon: 'success',
    title:'支付成功'
  })
  orderListResult.value!.items = []
  getOrderList()
  // const currentOrder = orderListResult.value?.items.find(item=>item.id === id)
  // currentOrder!.orderState = OrderState.DaiFaHuo
}

const onTapDeleteOrder = (id: string) => {
  uni.showModal({
    content:'是否删除订单？',
    success: async (success)=>{
      if(success.confirm){
        await deleteOrderApi(id)
        uni.showToast({
          icon: 'none',
          title: '订单删除成功'
        })
        getOrderList()
      }
    },
  })
}
const isRefresh = ref(false)
const onRefresherrefresh = async () => {
  console.log('下拉触发了...')
  isRefresh.value = true
  await getOrderList()
  isRefresh.value = false
  // await getOrderList()
  // isRefresh.value = false
}

onLoad(()=>{
  getOrderList()
})
</script>

<template>
  <view class="viewport">
    <!-- tabs -->
    <view class="tabs">
      <text @tap="activeIndex = index" class="item" v-for="item,index in orderTabs" :key="item.title"> {{ item.title }} </text>
      <!-- 游标 -->
      <view class="cursor" :style="{ left: activeIndex * 20 + '%' }"></view>
    </view>
    <!-- 滑动容器 -->
    <swiper class="swiper" :current="activeIndex" @change="onChangeSwiper">
      <!-- 滑动项 -->
      <swiper-item v-for="it,index in orderTabs" :key="it.title">
        <!-- 订单列表 -->
        <scroll-view 
          v-if="index === activeIndex"
          @scrolltolower="onScrollToLower"
          enable-back-to-top
          refresher-enabled
          :refresher-triggered="isRefresh"
          @refresherrefresh="onRefresherrefresh"
           scroll-y class="orders">
          <view class="card" v-for="item in orderListResult?.items" :key="item.id">
            <!-- 订单信息 -->
            <view class="status">
              <text class="date">{{ item.createTime }}</text>
              <!-- 订单状态文字 -->
              <text>{{orderStateList[item.orderState].text}}</text>
              <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
              <text v-if="[OrderState.DaiPingJia,OrderState.YiWanCheng,OrderState.YiQuXiao].includes(item.orderState)" 
                class="icon-delete" @tap="onTapDeleteOrder(item.id)"></text>
            </view>
            <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
            <navigator
              v-for="sku in item.skus"
              :key="sku.id"
              class="goods"
              :url="`/pagesOrder/order-detail/order-detail?id=${item.id}`"
              hover-class="none"
            >
              <view class="cover">
                <image
                  lazy-load
                  mode="aspectFit"
                  :src="sku.image"
                ></image>
              </view>
              <view class="meta">
                <view class="name ellipsis">{{ sku.name }}</view>
                <view class="type">{{ sku.attrsText }}</view>
              </view>
            </navigator>
            <!-- 支付信息 -->
            <view class="payment">
              <text class="quantity">共{{ item.totalNum}}件商品</text>
              <text>实付</text>
              <text class="amount"> <text class="symbol">¥</text>{{ item.payMoney }}</text>
            </view>
            <!-- 订单操作按钮 -->
            <view class="action">
              <!-- 待付款状态：显示去支付按钮 -->
              <template v-if="item.orderState === OrderState.DaiFuKuan">
                <view @tap="onGoPayment(item.id)" class="button primary">去支付</view>
              </template>
              <template v-else>
                <navigator
                  class="button secondary"
                  :url="`/pagesOrder/order/order?orderId=${item.id}`"
                  hover-class="none"
                >
                  再次购买
                </navigator>
                <!-- 待收货状态: 展示确认收货 -->
                <view v-if="item.orderState === OrderState.DaiShouHuo" class="button primary">确认收货</view>
              </template>
            </view>
          </view>
          <!-- 底部提示文字 -->
          <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
            {{ isFinish ? '没有更多数据~' : '正在加载...' }}
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

// tabs
.tabs {
  display: flex;
  justify-content: space-around;
  line-height: 60rpx;
  margin: 0 10rpx;
  background-color: #fff;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
  position: relative;
  z-index: 9;

  .item {
    flex: 1;
    text-align: center;
    padding: 20rpx;
    font-size: 28rpx;
    color: #262626;
  }

  .cursor {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20%;
    height: 6rpx;
    // padding: 0 50rpx;
    background-color: #27ba9b;
    /* 过渡效果 */
    transition: all 0.4s;
  }
}

// swiper
.swiper {
  background-color: #f7f7f8;
  height: 100%;
  swiper-item{
    overflow: scroll;
  }
}

// 订单列表
.orders {
  height: 100%;
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    &:last-child {
      padding-bottom: 40rpx;
    }
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 15rpx;

    .date {
      color: #666;
      flex: 1;
    }

    .primary {
      color: #ff9240;
    }

    .icon-delete {
      line-height: 1;
      margin-left: 10rpx;
      padding-left: 10rpx;
      border-left: 1rpx solid #e3e3e3;
    }
  }

  .goods {
    display: flex;
    margin-bottom: 20rpx;

    .cover {
      width: 170rpx;
      height: 170rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      position: relative;
      image{
        width: 100%;
        height: 100%;
      }
    }

    .quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      line-height: 1;
      padding: 6rpx 4rpx 6rpx 8rpx;
      font-size: 24rpx;
      color: #fff;
      border-radius: 10rpx 0 0 0;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .type {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 10rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .more {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22rpx;
      color: #333;
    }
  }

  .payment {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 1;
    padding: 20rpx 0;
    text-align: right;
    color: #999;
    font-size: 28rpx;
    border-bottom: 1rpx solid #eee;

    .quantity {
      font-size: 24rpx;
      margin-right: 16rpx;
    }

    .amount {
      color: #444;
      margin-left: 6rpx;
    }

    .symbol {
      font-size: 20rpx;
    }
  }

  .action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 20rpx;

    .button {
      width: 180rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20rpx;
      border-radius: 60rpx;
      border: 1rpx solid #ccc;
      font-size: 26rpx;
      color: #444;
    }

    .secondary {
      color: #27ba9b;
      border-color: #27ba9b;
    }

    .primary {
      color: #fff;
      background-color: #27ba9b;
    }
  }

  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
}
</style>