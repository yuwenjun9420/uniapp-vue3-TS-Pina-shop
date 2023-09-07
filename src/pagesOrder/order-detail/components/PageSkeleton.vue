<template name="skeleton">
    <view class="sk-container">
        <view class="navbar" style="padding-top:20px">
            <view class="wrap">
                <navigator class="back icon-left sk-pseudo sk-pseudo-circle" open-type="navigateBack"></navigator>
                <view class="title sk-transparent sk-text-14-2857-949 sk-text">订单详情</view>
            </view>
        </view>
        <scroll-view :scroll-y="true" class="viewport" id="scroller111">
            <view class="overview sk-image" style="padding-top:40px">
                <view class="status icon-clock sk-transparent sk-text-0-0000-874 sk-text sk-pseudo sk-pseudo-circle">等待付款
                </view>
                <view class="tips">
                    <text class="money sk-transparent sk-text-0-0000-628 sk-text">应付金额: ¥ 203</text>
                    <text class="time sk-transparent sk-text-0-0000-107 sk-text">支付剩余</text>
                    <view is="node-modules/@dcloudio/uni-ui/lib/uni-countdown/uni-countdown">
                        <view class="uni-countdown countdown--uni-countdown data-v-342c352a countdown--data-v-342c352a">
                            <text
                                class="uni-countdown__number countdown--uni-countdown__number data-v-342c352a countdown--data-v-342c352a sk-transparent sk-text-15-0000-665 sk-text"
                                style="color: rgb(255, 255, 255); font-size: 14px; width: 22px; line-height: 20px; border-radius: 3px; background-position-x: 50%;">00</text>
                            <text
                                class="uni-countdown__splitor countdown--uni-countdown__splitor data-v-342c352a countdown--data-v-342c352a sk-transparent sk-opacity"
                                style="color:#fff;font-size:12px;margin:;">时</text>
                            <text
                                class="uni-countdown__number countdown--uni-countdown__number data-v-342c352a countdown--data-v-342c352a sk-transparent sk-text-15-0000-238 sk-text"
                                style="color: rgb(255, 255, 255); font-size: 14px; width: 22px; line-height: 20px; border-radius: 3px; background-position-x: 50%;">28</text>
                            <text
                                class="uni-countdown__splitor countdown--uni-countdown__splitor data-v-342c352a countdown--data-v-342c352a sk-transparent sk-opacity"
                                style="color:#fff;font-size:12px;margin:;">分</text>
                            <text
                                class="uni-countdown__number countdown--uni-countdown__number data-v-342c352a countdown--data-v-342c352a sk-transparent sk-text-15-0000-984 sk-text"
                                style="color: rgb(255, 255, 255); font-size: 14px; width: 22px; line-height: 20px; border-radius: 3px; background-position-x: 50%;">48</text>
                            <text
                                class="uni-countdown__splitor countdown--uni-countdown__splitor data-v-342c352a countdown--data-v-342c352a sk-transparent sk-opacity"
                                style="color:#fff;font-size:12px;margin:;">秒</text>
                        </view>
                    </view>
                </view>
                <view class="button sk-transparent sk-text-28-5714-999 sk-text" style="background-position-x: 50%;">去支付
                </view>
            </view>
            <view class="shipment">
                <view class="locate sk-image">
                    <view class="user sk-transparent sk-text-14-2857-351 sk-text">Kolento 18503052631</view>
                    <view class="address sk-transparent sk-text-14-2857-931 sk-text">广东省 深圳市 宝安区大学园路886号</view>
                </view>
            </view>
            <view class="goods">
                <view class="item">
                    <navigator class="navigator" hover-class="none">
                        <image class="cover sk-image"></image>
                        <view class="meta">
                            <view class="name ellipsis sk-transparent sk-text-14-2857-920 sk-text">雪地无忧，毛毛虫儿童加绒运动靴26-35码
                            </view>
                            <view class="type sk-transparent sk-text-22-2222-175 sk-text">香芋紫， 27码-155(2.0)-脚长160-170mm
                            </view>
                            <view class="price">
                                <view class="actual">
                                    <text class="symbol sk-transparent sk-opacity">¥</text>
                                    <text class="sk-transparent sk-text-14-2857-235 sk-text">199</text>
                                </view>
                            </view>
                            <view class="quantity sk-transparent sk-text-14-2857-556 sk-text">x1</view>
                        </view>
                    </navigator>
                    <view class="action">
                        <view class="button primary sk-transparent sk-text-28-7879-141 sk-text"
                            style="background-position-x: 50%;">申请售后</view>
                        <navigator class="button sk-transparent sk-text-28-7879-473 sk-text"
                            style="background-position-x: 50%;"> 去评价 </navigator>
                    </view>
                </view>
                <view class="total">
                    <view class="row">
                        <view class="text sk-transparent sk-text-0-0000-624 sk-text">商品总价: </view>
                        <view class="symbol sk-transparent sk-text-0-0000-884 sk-text sk-pseudo sk-pseudo-circle">199</view>
                    </view>
                    <view class="row">
                        <view class="text sk-transparent sk-text-0-0000-111 sk-text">运费: </view>
                        <view class="symbol sk-transparent sk-text-0-0000-925 sk-text sk-pseudo sk-pseudo-circle">4</view>
                    </view>
                    <view class="row">
                        <view class="text sk-transparent sk-text-0-0000-652 sk-text">应付金额: </view>
                        <view class="symbol primary sk-transparent sk-text-0-0000-439 sk-text sk-pseudo sk-pseudo-circle">
                            203</view>
                    </view>
                </view>
            </view>
            <view class="detail">
                <view class="title sk-transparent sk-text-0-0000-288 sk-text">订单信息</view>
                <view class="row">
                    <view class="item sk-transparent"> 订单编号: 1699712223301079041
                        <text class="copy sk-transparent sk-text-0-0000-216 sk-text">复制</text>
                    </view>
                    <view class="item sk-transparent sk-text-0-0000-916 sk-text">下单时间: 2023-09-07 17:12:28</view>
                </view>
            </view>
            <view is="components/XtxGuess" class="r">
                <view class="caption XtxGuess--caption">
                    <text
                        class="text XtxGuess--text sk-transparent sk-text-0-0000-569 sk-text sk-pseudo sk-pseudo-circle">猜你喜欢</text>
                </view>
            </view>
            <view class="toolbar" style="padding-bottom:0px">
                <view class="button primary sk-transparent sk-text-14-2857-934 sk-text"> 去支付 </view>
                <view class="button sk-transparent sk-text-14-2857-103 sk-text"> 取消订单 </view>
            </view>
        </scroll-view>
    </view>
</template>
<style lang="scss">
/* #ifdef H5 || APP-PLUS */
@import '../styles/order-detail.scss';
/* #endif */

.sk-transparent {
    color: transparent !important;
}

.sk-text-14-2857-949 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 43.1159rpx;
    position: relative !important;
}

.sk-text {
    background-origin: content-box !important;
    background-clip: content-box !important;
    background-color: transparent !important;
    color: transparent !important;
    background-repeat: repeat-y !important;
}

.sk-text-0-0000-874 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 34.4203rpx;
    position: relative !important;
}

.sk-text-0-0000-628 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 25.3623rpx;
    position: relative !important;
}

.sk-text-0-0000-107 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 25.3623rpx;
    position: relative !important;
}

.sk-text-15-0000-665 {
    background-image: linear-gradient(transparent 15.0000%, #EEEEEE 0%, #EEEEEE 85.0000%, transparent 0%) !important;
    background-size: 100% 36.2319rpx;
    position: relative !important;
}

.sk-opacity {
    opacity: 0 !important;
}

.sk-text-15-0000-238 {
    background-image: linear-gradient(transparent 15.0000%, #EEEEEE 0%, #EEEEEE 85.0000%, transparent 0%) !important;
    background-size: 100% 36.2319rpx;
    position: relative !important;
}

.sk-text-15-0000-984 {
    background-image: linear-gradient(transparent 15.0000%, #EEEEEE 0%, #EEEEEE 85.0000%, transparent 0%) !important;
    background-size: 100% 36.2319rpx;
    position: relative !important;
}

.sk-text-28-5714-999 {
    background-image: linear-gradient(transparent 28.5714%, #EEEEEE 0%, #EEEEEE 71.4286%, transparent 0%) !important;
    background-size: 100% 63.4058rpx;
    position: relative !important;
}

.sk-text-14-2857-351 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-931 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 32.9710rpx;
    position: relative !important;
}

.sk-text-14-2857-920 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-22-2222-175 {
    background-image: linear-gradient(transparent 22.2222%, #EEEEEE 0%, #EEEEEE 77.7778%, transparent 0%) !important;
    background-size: 100% 42.3913rpx;
    position: relative !important;
}

.sk-text-14-2857-235 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 32.9710rpx;
    position: relative !important;
}

.sk-text-14-2857-556 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 32.9710rpx;
    position: absolute !important;
}

.sk-text-28-7879-141 {
    background-image: linear-gradient(transparent 28.7879%, #EEEEEE 0%, #EEEEEE 71.2121%, transparent 0%) !important;
    background-size: 100% 59.7826rpx;
    position: relative !important;
}

.sk-text-28-7879-473 {
    background-image: linear-gradient(transparent 28.7879%, #EEEEEE 0%, #EEEEEE 71.2121%, transparent 0%) !important;
    background-size: 100% 59.7826rpx;
    position: relative !important;
}

.sk-text-0-0000-624 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 25.3623rpx;
    position: relative !important;
}

.sk-text-0-0000-884 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 25.3623rpx;
    position: relative !important;
}

.sk-text-0-0000-111 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 25.3623rpx;
    position: relative !important;
}

.sk-text-0-0000-925 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 25.3623rpx;
    position: relative !important;
}

.sk-text-0-0000-652 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 25.3623rpx;
    position: relative !important;
}

.sk-text-0-0000-439 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 34.4203rpx;
    position: relative !important;
}

.sk-text-0-0000-288 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 28.9855rpx;
    position: relative !important;
}

.sk-text-0-0000-216 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 19.9275rpx;
    position: relative !important;
}

.sk-text-0-0000-916 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 25.3623rpx;
    position: relative !important;
}

.sk-text-0-0000-569 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 30.7971rpx;
    position: relative !important;
}

.sk-text-14-2857-934 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-103 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-image {
    background: #EFEFEF !important;
}

.sk-pseudo::before,
.sk-pseudo::after {
    background: #EFEFEF !important;
    background-image: none !important;
    color: transparent !important;
    border-color: transparent !important;
}

.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
    border-radius: 0 !important;
}

.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
    border-radius: 50% !important;
}

.sk-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
}</style>