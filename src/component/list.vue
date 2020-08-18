<template>
  <view class="content">
      <view class="com_list" @click="nativeTo('/pages/index/details')">
      <image :src='inner.sty_image'></image>
      <view>
        <text>{{inner.sty_style}}</text>
        <text class="introduce">{{inner.sty_introduce}}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop } from 'vue-property-decorator';

@Component({
    name: 'List',
    components: {},
})
export default class List extends Vue {
  @Prop() private inner!:any
  nativeTo(url:string):void{
    uni.navigateTo({url})
  }
}
</script>

<style lang="scss" scoped>
.com_list{
  height: 200rpx;
  padding: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  image{
    width: 200rpx;
    height: 200rpx;
    margin-right: 30rpx;
    border-radius: 4rpx;
  }
  view{
    flex: 1;
    height: 170rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    font-size: 32rpx;
  }
  view text{
    text-align: center;
  }
  .introduce{
    font-size: 28rpx;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-height: 36rpx;
    height: 106rpx;
  }
}


</style>
