<template name="skeleton">
    <view class="sk-container">
        <view class="content">
            <scroll-view :enable-back-to-top="true" :refresher-enabled="true" :scroll-y="true" class="scroll-view">
                <view is="components/XtxSwiper">
                    <view class="carousel XtxSwiper--carousel">
                        <swiper>
                            <swiper-item
                                style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
                                <navigator class="navigator XtxSwiper--navigator" hover-class="none">
                                    <image class="image XtxSwiper--image sk-image" mode="aspectFill"></image>
                                </navigator>
                            </swiper-item>
                        </swiper>
                        <view class="indicator XtxSwiper--indicator">
                            <text class="dot XtxSwiper--dot"></text>
                            <text class="dot XtxSwiper--dot"></text>
                            <text class="dot XtxSwiper--dot"></text>
                            <text class="dot XtxSwiper--dot"></text>
                        </view>
                    </view>
                </view>
                <view is="pages/index/components/CategoryPanel">
                    <view class="category CategoryPanel--category">
                        <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                            <image class="icon CategoryPanel--icon sk-image"></image>
                            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-569 sk-text">居家</text>
                        </navigator>
                        <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                            <image class="icon CategoryPanel--icon sk-image"></image>
                            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-66 sk-text">锦鲤</text>
                        </navigator>
                        <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                            <image class="icon CategoryPanel--icon sk-image"></image>
                            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-346 sk-text">服饰</text>
                        </navigator>
                        <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                            <image class="icon CategoryPanel--icon sk-image"></image>
                            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-647 sk-text">母婴</text>
                        </navigator>
                        <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                            <image class="icon CategoryPanel--icon sk-image"></image>
                            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-562 sk-text">个护</text>
                        </navigator>
                        <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                            <image class="icon CategoryPanel--icon sk-image"></image>
                            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-56 sk-text">严选</text>
                        </navigator>
                        <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                            <image class="icon CategoryPanel--icon sk-image"></image>
                            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-387 sk-text">数码</text>
                        </navigator>
                        <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                            <image class="icon CategoryPanel--icon sk-image"></image>
                            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-608 sk-text">运动</text>
                        </navigator>
                        <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                            <image class="icon CategoryPanel--icon sk-image"></image>
                            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-297 sk-text">杂项</text>
                        </navigator>
                        <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                            <image class="icon CategoryPanel--icon sk-image"></image>
                            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-297 sk-text">品牌</text>
                        </navigator>
                    </view>
                </view>
                <view is="pages/index/components/HotPanel">
                    <view class="panel HotPanel--panel hot HotPanel--hot">
                        <view class="item HotPanel--item">
                            <view class="title HotPanel--title">
                                <text
                                    class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-403 sk-text">特惠推荐</text>
                                <text
                                    class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-983 sk-text">精选全攻略</text>
                            </view>
                            <navigator class="cards HotPanel--cards" hover-class="none">
                                <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
                                <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
                            </navigator>
                        </view>
                        <view class="item HotPanel--item">
                            <view class="title HotPanel--title">
                                <text
                                    class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-166 sk-text">爆款推荐</text>
                                <text
                                    class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-329 sk-text">最受欢迎</text>
                            </view>
                            <navigator class="cards HotPanel--cards" hover-class="none">
                                <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
                                <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
                            </navigator>
                        </view>
                        <view class="item HotPanel--item">
                            <view class="title HotPanel--title">
                                <text
                                    class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-303 sk-text">一站买全</text>
                                <text
                                    class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-413 sk-text">精心优选</text>
                            </view>
                            <navigator class="cards HotPanel--cards" hover-class="none">
                                <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
                                <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
                            </navigator>
                        </view>
                        <view class="item HotPanel--item">
                            <view class="title HotPanel--title">
                                <text
                                    class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-104 sk-text">新鲜好物</text>
                                <text
                                    class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-958 sk-text">生活加分项</text>
                            </view>
                            <navigator class="cards HotPanel--cards" hover-class="none">
                                <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
                                <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
                            </navigator>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<style lang="scss">
/* #ifdef H5 || APP-PLUS */
/* 修复 H5 端骨架屏样式异常 */
/* 原因：H5 端样式自动开启 scoped 隔离，导致骨架屏的基础样式被隔离 */
@import '@/styles/XtxSwiper.scss';
@import './styles/CategoryPanel.scss';
@import './styles/HotPanel.scss';
/* #endif */
.sk-transparent {
    color: transparent !important;
}

.sk-text-3-3333-54 {
    background-image: linear-gradient(transparent 3.3333%, #EEEEEE 0%, #EEEEEE 96.6667%, transparent 0%) !important;
    background-size: 100% 27.1739rpx;
    position: relative !important;
}

.sk-text {
    background-origin: content-box !important;
    background-clip: content-box !important;
    background-color: transparent !important;
    color: transparent !important;
    background-repeat: repeat-y !important;
}

.sk-text-14-2857-368 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 38.0435rpx;
    position: relative !important;
}

.sk-text-14-2857-569 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-66 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-346 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-647 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-562 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-56 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-387 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-608 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-297 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-403 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 43.1159rpx;
    position: relative !important;
}

.sk-text-14-2857-983 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 32.9710rpx;
    position: relative !important;
}

.sk-text-14-2857-166 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 43.1159rpx;
    position: relative !important;
}

.sk-text-14-2857-329 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 32.9710rpx;
    position: relative !important;
}

.sk-text-14-2857-303 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 43.1159rpx;
    position: relative !important;
}

.sk-text-14-2857-413 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 32.9710rpx;
    position: relative !important;
}

.sk-text-14-2857-104 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 43.1159rpx;
    position: relative !important;
}

.sk-text-14-2857-958 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 32.9710rpx;
    position: relative !important;
}

.sk-image {
    background: #EFEFEF !important;
}

.sk-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
}
</style>
