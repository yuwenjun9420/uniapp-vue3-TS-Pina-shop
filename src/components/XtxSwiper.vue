<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="false" :interval="3000">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image lazy-load mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item) in 4"
        :key="item"
        class="dot"
      ></text>
    </view>
  </view>
</template>
<script setup lang="ts">
import type { BannerItem } from "@/types/home"
  defineProps<{
    list: BannerItem[]
  }>()
</script>

<style lang="scss">
@import '../styles/XtxSwiper.scss';
</style>