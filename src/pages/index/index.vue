<template>
    <view class="content">
        <view class='banner'>
           <image :src="bannerImg" mode="aspectFill"></image>
        </view>
        <u-list></u-list>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import { State } from 'vuex-class'
import List from '@/component/list.vue'
import {i18n} from '@/utils/i18n'
import {http} from '@/utils/http'

@Component({
    name: 'Index',
    components: {
        'u-list': List
    },
})
export default class Index extends Vue {
    @Provide() bannerImg:string = require("@/static/img/banner.jpg")
    @Provide() title:any = i18n.t('user.name')
    @State token!:string

    get tokens(){
        this.token&&this.getData()
        return this.token
    }
    async getData(){
        const token = uni.getStorageSync('token')
        const ad = await http({url:'/JY/Home_Poster',data:{token}}).then((res:any)=>res.data)
        const product = await http({url:'/JY/Home_Product',data:{token}}).then((res:any)=>res.data)
       
       console.log(ad,product)
    }

}
</script>

<style lang="scss" scope>
.banner{
  height: 400rpx;
  width: 750rpx;
  overflow: hidden;
  image{
    height: 400rpx;
    width: 750rpx;
    background: #f6f6f6
  }
}
</style>
