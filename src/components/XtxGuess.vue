<template>
    <!-- 猜你喜欢 -->
    <view class="caption">
        <text class="text">猜你喜欢</text>
    </view>
    <view class="guess">
        <navigator :url="`/pages/goods/goods?id=${item.id}`"
        class="guess-item" v-for="item in guessList" :key="item.id">
            <image lazy-load class="image" mode="aspectFill" :src="item.picture"></image>
            <view class="name"> {{ item.name }} </view>
            <view class="price">
                <text class="small">¥</text>
                <text>{{ item.price }}</text>
            </view>
        </navigator>
    </view>
    <view class="loading-text">
        {{ finish ? '没有更多数据~' : '正在加载中...'}}
    </view>
</template>
<script setup lang="ts">
import { getHomeGuessApi } from '@/api/home';
import type { GuessItem } from '@/types/home';
import { ref, onMounted } from 'vue';
import type { PageParams } from "@/types/gobal"
const pageParams : Required<PageParams> =({
    page: 1,
    pageSize: 10
})
const finish = ref(false)
const guessList = ref<GuessItem[]>([])
const getGuessList = async () => {
    if(finish.value === true){
        uni.showToast({
            icon: 'none',
            title: '没有更多数据~'
        })
        return
    }
    let res = await getHomeGuessApi(pageParams)
    // guessList.value = res.result.items
    guessList.value.push(...res.result.items)
    if(pageParams.page < res.result.pages){
        pageParams.page ++
    }else{
        finish.value = true
    }
    console.log("getHomeGuessApi::::", res)
}
const resetData = () => {
    pageParams.page = 1
    finish.value = false
    guessList.value = []
}
defineExpose({
    resetData,
    getMore: getGuessList
})
onMounted(() => {
    getGuessList()
})
</script>
<style lang="scss">
:host {
    display: block;
}

/* 分类标题 */
.caption {
    display: flex;
    justify-content: center;
    line-height: 1;
    padding: 36rpx 0 40rpx;
    font-size: 32rpx;
    color: #262626;

    .text {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 28rpx 0 30rpx;

        &::before,
        &::after {
            content: '';
            width: 20rpx;
            height: 20rpx;
            background-image: url(@/static/images/bubble.png);
            background-size: contain;
            margin: 0 10rpx;
        }
    }
}

/* 猜你喜欢 */
.guess {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20rpx;
    /* #ifdef H5 || APP-PLUS */
    .navigator-wrap{
        width: 50%;
    }
    /* #endif */
    .guess-item {
        /* #ifdef MP-WEIXIN */
        width: 50%;
        /* #endif */
        padding: 24rpx 20rpx 20rpx;
        margin-bottom: 20rpx;
        border-radius: 10rpx;
        overflow: hidden;
        background-color: #fff;
        box-sizing: border-box;
    }

    .image {
        width: 304rpx;
        height: 304rpx;
    }

    .name {
        height: 75rpx;
        margin: 10rpx 0;
        font-size: 26rpx;
        color: #262626;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .price {
        line-height: 1;
        padding-top: 4rpx;
        color: #cf4444;
        font-size: 26rpx;
    }

    .small {
        font-size: 80%;
    }
}

// 加载提示文字
.loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
}
</style>
