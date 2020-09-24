<template>
    <view class="About" :style="{paddingTop:barHeight+'px'}">
        <bar :title="title" />
        <view v-for="(item,index) in info" :key="index" class="list" @click="nativeTo(item)">
           <text>{{item.prod_code}}</text>
        </view>
        <view v-if="info.length==0" class="wu">{{msg}}</view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import {State} from "vuex-class"
import bar from '@/component/bar.vue'
import { http } from '@/utils/http';
import { imgUrl } from '@/utils/path';
import { i18n } from '@/utils/i18n';
import userinfor from "@/component/userinfor.vue"


@Component({
    name: 'About',
    components: {bar,userinfor},
})
export default class Index extends Vue {
    @Provide() info: any = {};
    @Provide() z18n: any = i18n.t('about');
    @Provide() title: any = i18n.t('bar.t7');
    @Provide() msg: any = i18n.t('bar.msg3');


    @State barHeight!:number;
    onShow() {
        this.getData();
    }
    async getData() {
       const wx =  uni.getStorageSync("openid");
       const info = await http({url: '/JY/Product_Collection',data:{wx}}).then((res: any) => res.data);
       info.map((res:any)=>{
         res.prod_image = imgUrl+ res.prod_image
       })
       this.info =info
    }
    nativeTo(item:any){
     uni.navigateTo({
       url:`/pages/my/details?img=${item.prod_image}&id=${item.prod_id}&sc=1`
     })
    }
    
}
</script>

<style lang="scss" scope>

.list{
  display: flex;
  justify-content: space-between;
  padding: 0 30rpx;
  align-items: center;
  border-bottom: 1px solid lightgray;
  height: 90rpx;
  font-size: 28rpx;
 
}
.wu{
  text-align: center;
  font-size: 28rpx;
  padding: 30rpx;
}

</style>
