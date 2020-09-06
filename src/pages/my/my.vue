<template>
    <view class="About" :style="{paddingTop:barHeight+'px'}">
        <bar :title="title" />
        <view class="titles">
          <text class='nick'>{{userInfos.nickName||"登录"}}</text>
          <image class="img" :src="userInfos.avatarUrl" ></image>
        </view>
        <view class="p" @click="nativeTo('/pages/about/about')">{{t4}}</view>
        <view class="p" @click="nativeTo('/pages/my/favorites')">{{t7}}</view>
        <view></view>
        <userinfor @load="load"></userinfor>

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
    @Provide() userInfos: any = {};
    @Provide() z18n: any = i18n.t('about');
    @Provide() title: any = i18n.t('bar.t6');
    @Provide() t4: any = i18n.t('bar.t4');
    @Provide() t7: any = i18n.t('bar.t7');

    @State barHeight!:number;
    mounted() {
        this.load()
    }
    load(){
     this.userInfos = uni.getStorageSync("userInfos")||{};
    }
    nativeTo(url:string){
      uni.navigateTo({url})
    }
    
}
</script>

<style lang="scss" scope>

.titles {
    padding: 20rpx  30rpx;
    display: flex;
    font-size: 32rpx;
    justify-content: space-between;
    align-items: center;
    border-bottom: 20rpx solid #f6f6f6;
    position: relative;
    .img{
      width: 90rpx;
      height: 90rpx;
      border-radius: 50%;
      border:1px solid lightgray;
    }

}
.p{
    padding: 0rpx  30rpx;
    font-size: 32rpx;
    height: 90rpx;
    line-height: 90rpx;
    border-bottom: 1rpx solid lightgray;

}

</style>
