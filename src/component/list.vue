<template>
  <view class="content">
      <view class="com_list" @click="nativeTo(inner)">
      <view>
        <text class="title">{{inner.sty_style}}</text>
        <text class="introduce">{{inner.sty_introduce||""}}</text>
      </view>
      <image :src='inner.sty_image'></image>

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
  nativeTo(inner:any):void{
    this.$emit("nativeTo",inner)
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
    margin-left: 30rpx;
    border-radius: 4rpx;
  }
  .title{
    font-size: 30rpx;
    font-weight: bold;
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
    // text-align: center;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
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
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}


</style>
