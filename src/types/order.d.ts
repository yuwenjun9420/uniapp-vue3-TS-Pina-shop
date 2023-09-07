export type OrderResult = {
    userAddresses: UserAddresses[]
    goods: Goods[]
    summary: Summary
}

export type UserAddresses = {
    id: string
    provinceCode: string
    cityCode: string
    countyCode: string
    address: string
    isDefault: number
    receiver: string
    contact: string
    fullLocation: string
    postalCode: string
}

export type Goods = {
    attrsText: string
    count: number
    id: string
    name: string
    payPrice: string
    picture: string
    price: number
    skuId: string
    totalPayPrice: number 
    totalPrice: number 
}

export type Summary = {
    discountPrice: number
    goodsCount: number
    postFee: number
    totalPayPrice: number
    totalPrice: number
}

export type OrderPreNowParams = {
    skuId: string
    count: number
    addressId?:string
}

export type OrderParams = {
    goods: {
        skuId: string
        count: number
    }[]
    addressId: string
    deliveryTimeType: DayTime
    buyerMessage: string
    payType: number
    payChannel: number
}

export enum DayTime {
    '不限' = 1,
    '工作日' = 2,
    '双休或假日' = 3
}

/** 订单详情 返回信息 */
export type OrderDetailResult = {
    /** 订单编号 */
    id: string
    /** 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消 */
    orderState: number
    /** 倒计时--剩余的秒数 -1 表示已经超时，正数表示倒计时未结束 */
    countdown: number
    /** 商品集合 [ 商品信息 ] */
    skus: OrderDetailSkuItem[]
    /** 收货人 */
    receiverContact: string
    /** 收货人手机 */
    receiverMobile: string
    /** 收货人完整地址 */
    receiverAddress: string
    /** 下单时间 */
    createTime: string
    /** 商品总价 */
    totalMoney: number
    /** 运费 */
    postFee: number
    /** 应付金额 */
    payMoney: number
  }
  
  /** 商品信息 */
  export type OrderDetailSkuItem = {
    /** sku id */
    id: string
    /** 商品 id */
    spuId: string
    /** 商品名称 */
    name: string
    /** 商品属性文字 */
    attrsText: string
    /** 数量 */
    quantity: number
    /** 购买时单价 */
    curPrice: number
    /** 图片地址 */
    image: string
  }

export type OrderLogistics = {
    picture: string
    count: number
    company: {
        name: string
        number: string
        tel: string
    }
    list: {
        id: string
        text: string
        time: string
    }[]
}

export type OrderListPrams = {
    page?: number
    pageSize?: number
    orderState?: number
}

export type OrderListResult = {
 /** 总记录数 */
  counts: number
  /** 数据集合    [ 订单信息 ] */
  items: OrderItem[]
  /** 当前页码 */
  page: number
  /** 总页数 */
  pages: number
  /** 页尺寸 */
  pageSize: number
}

export type OrderItem = OrderDetailResult & {
    totalNum: number
}