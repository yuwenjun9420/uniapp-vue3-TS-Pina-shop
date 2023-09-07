<template>
  <view class="content">
    <uni-forms ref="formRef" :model="formData" :rules="rules">
      <!-- 表单内容 -->
      <uni-forms-item name="receiver" class="form-item">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="formData.receiver" />
      </uni-forms-item>
      <uni-forms-item name="contact" class="form-item">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="formData.contact" />
      </uni-forms-item>
      <!-- #ifdef MP-WEIXIN -->
      <uni-forms-item name="countyCode" class="form-item">
        <text class="label">所在地区</text>
        <picker @change="onChangeRegion" class="picker" mode="region" :value="formData.fullLocation">
          <view v-if="formData.fullLocation">{{ formData.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </uni-forms-item>
      <!-- #endif -->
      <!-- #ifdef H5 || APP-PLUS -->
      <uni-forms-item name="countyCode" class="form-item">
        <uni-data-picker 
          placeholder="请选择地址" 
          popup-title="请选择城市" 
          collection="opendb-city-china" 
          field="code as value, name as text" 
          orderby="value asc" 
          :step-searh="true" 
          self-field="code" 
          parent-field="parent_code"
          :clear-icon="false"
          @change="onChangeAddress"
          v-model="formData.countyCode"
        >
        </uni-data-picker>
      </uni-forms-item>
      <!-- #endif -->
      <uni-forms-item name="address" class="form-item">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="formData.address" />
      </uni-forms-item>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch @change="onChangeIsDefault" class="switch" color="#27ba9b" :checked="formData.isDefault === 1" />
      </view>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="saveAddress">保存并使用</button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getMemberAddressByIdApi, postMemberAddressApi,putMemberAddressByIdApi } from '@/api/address'
import { onLoad } from '@dcloudio/uni-app';
// import type { UniDataPickerOnChange } from '@uni-helper/uni-ui-types';

// 表单数据
const formData = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})

const rules:UniHelper.UniFormsRules = {
  receiver: {
    rules: [
      {
        required: true,
        errorMessage: '请填写收货人'
      }
    ]
  },
  contact: {
    rules: [
      {
        required: true,
        errorMessage: '请填写联系方式'
      },
      {
        pattern: /^1[3-9]\d{9}$/,
        errorMessage: '请输入正确的手机号'
      }
    ]
  },
  countyCode: {
    rules: [
      {
        required: true,
        errorMessage: '请选择所在地区'
      }
    ]
  },
  address: {
    rules: [
      {
        required: true,
        errorMessage: '请填写详细地址'
      }
    ]
  },
}

const query = defineProps<{
  id?: string
}>()
console.log(query)
uni.setNavigationBarTitle({ title: query.id ? '修改地址' : '新增地址' })

const onChangeRegion:UniHelper.RegionPickerOnChange = (event) => {
  formData.value.fullLocation = event.detail.value.join(' ')
  let codeList: string[] = event.detail.code!
  const [ provinceCode,cityCode,countyCode ] = codeList
  Object.assign(formData.value,{ provinceCode,cityCode,countyCode })
}

const onChangeAddress: UniHelper.UniDataPickerOnChange = (event) =>{
  const [ provinceCode,cityCode,countyCode ] = event.detail.value.map(v => v.value)
  // const provinceCode = event.detail.value[0].value
  // const cityCode = event.detail.value[1].value
  // const countyCode = event.detail.value[2].value
  Object.assign(formData.value,{ provinceCode,cityCode,countyCode })
}
const onChangeIsDefault:UniHelper.SwitchOnChange = (event) => {
  formData.value.isDefault = event.detail.value ? 1 : 0
}

const getAddressInfo = async() => {
  if(query.id){
    let res = await getMemberAddressByIdApi(query.id)
    Object.assign(formData.value,res.result)
  }
  
}

onLoad(()=>{
  getAddressInfo()
})

// const formRef= ref<UniHelper.UniFormsInstance>()
const formRef= ref<UniHelper.UniFormsInstance>()
const saveAddress = async () => {
  try {
    await formRef.value?.validate?.()
    console.log('提交...',formData)
    query.id ? await putMemberAddressByIdApi(query.id,formData.value) 
                       : await postMemberAddressApi(formData.value)
    uni.showToast({ 
      icon: 'success',
      title: query.id ? '修改地址成功' : '新增地址成功'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 500);
  } catch (error) {
    uni.showToast({
      icon: 'error',
      title: '请填写完整信息'
    })
  }

  }
</script>
<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>