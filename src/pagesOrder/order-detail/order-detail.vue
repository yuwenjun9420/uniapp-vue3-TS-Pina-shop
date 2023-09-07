<script setup lang="ts">
import { useGuessList } from '@/composables/guess'
import { onLoad, onReady } from '@dcloudio/uni-app';
import { ref } from 'vue'
import { getOrderByIdApi, getPayWxPayApi,getPayMockApi,getOrderConsignmentApi,putOrderReceiptApi,getOrderLogisticsApi,putOrderCancelApi } from '@/api/order'
import type { OrderDetailResult,OrderLogistics } from '@/types/order'
import { OrderState, orderStateList } from '@/utils/constant'
import PageSkeleton from './components/PageSkeleton.vue'


// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 猜你喜欢
const { guessRef, onScrollToLower } = useGuessList()
// 弹出层组件
// const popup = ref<UniHelper.UniPopupInstance>()
const popup = ref<UniHelper.UniPopupInstance>()
// 取消原因列表
const reasonList = ref([
  '商品无货',
  '不想要了',
  '商品信息填错了',
  '地址信息填写错误',
  '商品降价',
  '其它',
])
// 订单取消原因
const reason = ref('')
// 复制内容
const onCopy = (id: string) => {
  // 设置系统剪贴板的内容
  uni.setClipboardData({ data: id })
}
// 获取页面参数
const query = defineProps<{
  id: string
}>()
type PageInstance = Page.PageInstance & WechatMiniprogram.Page.InstanceMethods<any>

const pages = getCurrentPages()
const pagesIntance = pages.at(-1) as PageInstance
console.log("id::::", query.id);

const orderLogistics = ref<OrderLogistics>()
const orderDetail = ref<OrderDetailResult>({} as OrderDetailResult)
const getOrderInfo = async () => {
  let res = await getOrderByIdApi(query.id)
  orderDetail.value = res.result
  if([OrderState.DaiShouHuo,OrderState.YiWanCheng,OrderState.DaiPingJia].includes(orderDetail.value.orderState)){
    let ret = await getOrderLogisticsApi(query.id)
    orderLogistics.value = ret.result
  }

  console.log('getOrderByIdApi::::', res);
}
const onTimeup = () => {
  orderDetail.value!.orderState = OrderState.YiQuXiao
}

const onGoPayment = async () => {
  if(import.meta.env.DEV){
    await getPayMockApi(query.id)
  }else{
    let res = await getPayWxPayApi(query.id)
    // #ifdef MP-WEIXIN
    await wx.requestPayment(res.result)
    // #endif
  }
  uni.redirectTo({
      url: `/pagesOrder/payment/payment?id=${query.id}`
    })
}

const isDev: boolean = import.meta.env.DEV

const onTapOrderSend = async () => {
  if(isDev){
    let res = await getOrderConsignmentApi(query.id)
    uni.showToast({ icon: 'success', title: '模拟发货完成' })
    console.log('getOrderConsignmentApi:::',res)
    orderDetail.value.orderState = OrderState.DaiShouHuo
  }
}

const onTapOrderConfirm = () => {
  uni.showModal({
    content:'为保障您的权益，请收到货并确认无误后，再确认收货',
    success: async (success)=>{
      if(success.confirm){
        let res = await putOrderReceiptApi(query.id)
        orderDetail.value = res.result
      }
    },
  })

}

const onTapOrderCancel = async () => {
  console.log("确定:::",reason)
  popup.value?.close?.()
  await putOrderCancelApi(query.id,reason.value)
  uni.showToast({
    icon:'none',
    title: '订单已取消'
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 500);
}

const isLoading = ref(false)

onLoad(async () => {
  await getOrderInfo()
  isLoading.value = true
})

const renderAnimate = () => {
  // #ifdef MP-WEIXIN
  pagesIntance.animate('.navbar', [
    { backgroundColor: 'transparent' },
    { backgroundColor: '#f8f8f8' }
  ], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 0,
    endScrollOffset: 50
  })
  pagesIntance.animate('.navbar .title', [{ color: 'transparent' }, { color: '#000' }], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 0,
    endScrollOffset: 50,
  })
  pagesIntance.animate('.navbar .back', [{ color: '#fff' }, { color: '#000' }], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 0,
    endScrollOffset: 50,
  })
  // #endif
}
onReady(() => {
  renderAnimate()
})
</script>

<template>
    <!-- 自定义导航栏: 默认透明不可见, scroll-view 滚动到 50 时展示 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <view class="wrap">
        <navigator v-if="pages.length > 1" open-type="navigateBack" class="back icon-left"></navigator>
        <navigator v-else url="/pages/index/index" open-type="switchTab" class="back icon-home">
        </navigator>
        <view class="title">订单详情</view>
      </view>
    </view>
    <scroll-view scroll-y class="viewport" id="scroller" @scrolltolower="onScrollToLower">
      <template v-if="isLoading">
        <!-- 订单状态 -->
        <view class="overview" :style="{ paddingTop: safeAreaInsets!.top + 20 + 'px' }">
          <!-- 待付款状态:展示去支付按钮和倒计时 -->
          <template v-if="orderDetail?.orderState === OrderState.DaiFuKuan">
            <view class="status icon-clock">等待付款</view>
            <view class="tips">
              <text class="money">应付金额: ¥ {{ orderDetail.payMoney }}</text>
              <text class="time">支付剩余</text>
              <!-- 00 时 29 分 59 秒 -->
              <uni-countdown :second="orderDetail.countdown" color="#fff" splitor-color="#fff" :show-day="false"
                :show-colon="false" @timeup="onTimeup" />
            </view>
            <view @tap="onGoPayment" class="button">去支付</view>
          </template>
          <!-- 其他订单状态:展示再次购买按钮 -->
          <template v-else>
            <!-- 订单状态文字 -->
            <view class="status"> {{ orderStateList[orderDetail!.orderState || 0].text }} </view>
            <view class="button-group">
              <navigator class="button" :url="`/pagesOrder/order/order?orderId=${orderDetail.id}`" hover-class="none">
                再次购买
              </navigator>
              <!-- 待发货状态：模拟发货,开发期间使用,用于修改订单状态为已发货 -->
              <view @tap="onTapOrderSend" v-if="isDev && orderDetail.orderState === OrderState.DaiFaHuo" class="button"> 模拟发货 </view>
              <view @tap="onTapOrderConfirm" v-else-if="isDev && orderDetail.orderState === OrderState.DaiShouHuo" class="button"> 模拟收货 </view>
            </view>
          </template>
        </view>
        <!-- 配送状态 -->
        <view class="shipment">
          <!-- 订单物流信息 -->
          <view v-for="item in orderLogistics?.list" :key="item.id" class="item">
            <view class="message">
              {{ item.text }}
            </view>
            <view class="date"> {{ item.time }} </view>
          </view>
          <!-- 用户收货地址 -->
          <view class="locate">
            <view class="user"> {{ orderDetail?.receiverContact }} {{ orderDetail?.receiverMobile }}</view>
            <view class="address"> {{ orderDetail?.receiverAddress }} </view>
          </view>
        </view>

        <!-- 商品信息 -->
        <view class="goods">
          <view class="item">
            <navigator class="navigator" v-for="item in orderDetail?.skus" :key="item.id"
              :url="`/pages/goods/goods?id=${item.spuId}`" hover-class="none">
              <image class="cover" :src="item.image"></image>
              <view class="meta">
                <view class="name ellipsis">{{ item.name }}</view>
                <view class="type">{{ item.attrsText }}</view>
                <view class="price">
                  <view class="actual">
                    <text class="symbol">¥</text>
                    <text>{{ item.curPrice }}</text>
                  </view>
                </view>
                <view class="quantity">x{{ item.quantity }}</view>
              </view>
            </navigator>
            <!-- 待评价状态:展示按钮 -->
            <view class="action" v-if="true">
              <view class="button primary">申请售后</view>
              <navigator url="" class="button"> 去评价 </navigator>
            </view>
          </view>
          <!-- 合计 -->
          <view class="total">
            <view class="row">
              <view class="text">商品总价: </view>
              <view class="symbol">{{ orderDetail?.totalMoney }}</view>
            </view>
            <view class="row">
              <view class="text">运费: </view>
              <view class="symbol">{{ orderDetail?.postFee }}</view>
            </view>
            <view class="row">
              <view class="text">应付金额: </view>
              <view class="symbol primary">{{ orderDetail?.payMoney }}</view>
            </view>
          </view>
        </view>

        <!-- 订单信息 -->
        <view class="detail">
          <view class="title">订单信息</view>
          <view class="row">
            <view class="item">
              订单编号: {{ query.id }} <text class="copy" @tap="onCopy(query.id)">复制</text>
            </view>
            <view class="item">下单时间: {{ orderDetail?.createTime }}</view>
          </view>
        </view>

        <!-- 猜你喜欢 -->
        <XtxGuess ref="guessRef" />

        <!-- 底部操作栏 -->
        <view class="toolbar-height" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"></view>
        <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
          <!-- 待付款状态:展示支付按钮 -->
          <template v-if="orderDetail.orderState === OrderState.DaiFuKuan">
            <view @tap="onGoPayment" class="button primary"> 去支付 </view>
            <view class="button" @tap="popup?.open?.()"> 取消订单 </view>
          </template>
          <!-- 其他订单状态:按需展示按钮 -->
          <template v-else>
            <navigator class="button secondary" :url="`/pagesOrder/order/order?orderId=${query.id}`" hover-class="none">
              再次购买
            </navigator>
            <!-- 待收货状态: 展示确认收货 -->
            <view @tap="onTapOrderConfirm" class="button primary"> 确认收货 </view>
            <!-- 待评价状态: 展示去评价 -->
            <view class="button"> 去评价 </view>
            <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
            <view class="button delete"> 删除订单 </view>
          </template>
        </view>
      </template>
      <template v-else>
        <!-- 骨架屏组件 -->
        <PageSkeleton />
      </template>
    </scroll-view>
    <!-- 取消订单弹窗 -->
    <uni-popup ref="popup" type="bottom" background-color="#fff">
      <view class="popup-root">
        <view class="title">订单取消</view>
        <view class="description">
          <view class="tips">请选择取消订单的原因：</view>
          <view class="cell" v-for="item in reasonList" :key="item" @tap="reason = item">
            <text class="text">{{ item }}</text>
            <text class="icon" :class="{ checked: item === reason }"></text>
          </view>
        </view>
        <view class="footer">
          <view class="button" @tap="popup?.close?.()">取消</view>
          <view @tap="onTapOrderCancel" class="button primary">确认</view>
        </view>
      </view>
    </uni-popup>
</template>

<style lang="scss">
@import './styles/order-detail.scss'
</style>