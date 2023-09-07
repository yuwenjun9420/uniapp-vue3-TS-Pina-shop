<template>
    <!-- 推荐专区 -->
    <view class="panel hot">
        <view class="item" v-for="item in hotList" :key="item.id">
            <view class="title">
                <text class="title-text">{{item.title }}</text>
                <text class="title-desc">{{ item.alt }}</text>
            </view>
            <navigator hover-class="none" class="cards" :url="`/pages/hot/hot?type=${item.type}`" >
                <image v-for="src in item.pictures" :key="src" class="image" mode="aspectFit" :src="src"></image>
            </navigator>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { HotItem } from '@/types/home';
    defineProps<{
        hotList: HotItem[]
    }>()
</script>

<style lang="scss">
@import '../styles/HotPanel.scss';
</style>