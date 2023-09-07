<template>
	<CategorySkeleton v-if="!isLoading" />
	<view v-else class="viewport">
		<!-- 搜索框 -->
		<view class="search">
			<view class="input">
				<text class="icon-search">女靴</text>
			</view>
		</view>
		<!-- 分类 -->
		<view class="categories">
			<!-- 左侧：一级分类 -->
			<scroll-view class="primary" scroll-y>
				<view v-for="(item, index) in categoryTopList" :key="item.id" class="item" 
				:class="{ active: index === activeIndex }"
				@tap="onSwitchTab(index)"
				>
					<text class="name"> {{ item.name }} </text>
				</view>
			</scroll-view>
			<!-- 右侧：二级分类 -->
			<scroll-view class="secondary" scroll-y>
				<!-- 焦点图 -->
				<XtxSwiper class="banner" :list="bannerList" />
				<!-- 内容区域 -->
				<view class="panel" v-for="item in childrenList" :key="item.id">
					<view class="title">
						<text class="name">{{ item.name }}</text>
						<navigator class="more" hover-class="none">全部></navigator>
					</view>
					<view class="section">
						<navigator v-for="goods in item.goods" :key="goods.id" class="goods" hover-class="none"
							:url="`/pages/goods/goods?id=${goods.id}`">
							<image lazy-load class="image"
								:src="goods.picture"></image>
							<view class="name ellipsis">{{ goods.name }}</view>
							<view class="price">
								<text class="symbol">¥</text>
								<text class="number">{{ goods.price }}</text>
							</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { getBannerApi } from '@/api/home';
import type { BannerItem } from '@/types/home';
import type { CategoryItem } from '@/types/category';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { getCategoryTopApi } from  '@/api/category'
import type { CategoryResult } from '@/types/category'
import { computed } from 'vue';
import CategorySkeleton  from '@/pages/category/components/CategorySkeleton.vue'

const bannerList = ref<BannerItem[]>([])
const getBannerList = async () => {
	let res = await getBannerApi(2)
	bannerList.value = res.result
}

let activeIndex = ref<number>(0)

const categoryTopList = ref<CategoryResult[]>([])
const getCategoryTopList = async () => {
	let res = await getCategoryTopApi()
	categoryTopList.value = res.result
	console.log("getCategoryTopList::::",categoryTopList)
}

const childrenList = computed(()=>{
	return categoryTopList.value[activeIndex.value]?.children || []
})

const onSwitchTab = (index: number) => {
	activeIndex.value = index
}

const isLoading = ref<boolean>(false)
onLoad(async ()=>{
	await Promise.all([
		getBannerList(),
		getCategoryTopList()
	])

	isLoading.value = true
})
</script>

<style lang="scss">
@import './styles/category.scss'
</style>