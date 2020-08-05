<template>
  <view class="content">
      <view class="com_list" @click="nativeTo('/pages/index/details')">
      <image :src='imgs'></image>
      <view>
        <text>JC系列</text>
        <text>高性能三层屏蔽低损耗柔性射频电缆</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';

@Component({
    name: 'List',
    components: {},
})
export default class List extends Vue {
  @Provide() imgs:string = require("@/static/img/JC.png");
  
  nativeTo(url:string):void{
    uni.navigateTo({url})
  }
}
</script>

<style lang="scss" scoped>
.com_list{
  height: 240rpx;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
  image{
    width: 240rpx;
    height: 240rpx;
    background: #f6f6f6;
  }
  view{
    flex: 1;
    height: 160rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    font-size: 26rpx;
    margin-left: 20rpx;
  }
  view text{
    text-align: center;
  }
}


</style>
