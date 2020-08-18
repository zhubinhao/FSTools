<template>
    <view class="About">
        <image :src='info.comp_image' mode="widthFix"></image>
        <view class="title">{{info.comp_name}}</view>
        <view class="content" v-html="info.comp_remark"></view>
        <view class="msg" v-if="info.comp_postcode">邮编：{{info.comp_postcode}}</view>
        <view class="msg" v-if="info.comp_tel">Tel：{{info.comp_tel}}</view>
        <view class="msg" v-if="info.comp_fax">Fax：{{info.comp_fax}}</view>
        <view class="msg" v-if="info.comp_email">邮箱：{{info.comp_email}}</view>
        <view class="msg" v-if="info.comp_linkman">联系人：{{info.comp_linkman}}</view>
        <view class="msg" v-if="info.comp_url">网址：{{info.comp_url}}</view>
        <view class="msg pb30">{{info.comp_address}}</view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import {http} from '@/utils/http'
import {imgUrl} from '@/utils/path'

@Component({
    name: 'About',
    components: {},
})
export default class Index extends Vue {
    @Provide() info:any={}
     mounted(){
        console.log(121)
        this.getData()
    }
    async getData(){
        const token = uni.getStorageSync('token')
        const info = await http({url:'/JY/Company_Info',data:{token,ench:'1'}}).then((res:any)=>res.data[0])     
       console.log(info)
       info.comp_image = imgUrl+info.comp_image
       this.info = info
    }
}
</script>

<style lang="scss" scope>
    image {
        width: 750rpx;
    }
    .title{
        font-size: 36rpx;
        text-align: center;
        padding: 30rpx;
    }
    .msg{
        font-size: 30rpx;
        padding: 0 30rpx 0 50rpx;
        line-height: 50rpx;
        color: gray
    }
    .content{
        font-size: 32rpx;
        padding: 0 30rpx;
        line-height: 50rpx;
        text-indent: 2em;
        margin-bottom: 50rpx;
    }
    .pb30{
        padding-bottom: 30rpx;
    }
</style>
