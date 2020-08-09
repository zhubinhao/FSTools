<template>
  <view class="Formula">
    <view class="head">
      <text class="iconfont icon-gengduo" @click="open"></text>
      <text>{{title}}</text>
    </view>
    <u-left @setData="setData" ref="leftRef"></u-left>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from "vue-property-decorator";
import Left from "@/component/left.vue";

@Component({
  name: "Formula",
  components: {
    "u-left": Left
  }
})
export default class Formula extends Vue {
  @Provide() title: string ="插入损耗(IL)"
  @Provide() type: string = "t1"

  setData(obj: any): void {
    this.title = obj.title
    this.type = obj.key
    console.log(obj);
    
  }
  open(): void {
    (this.$refs.leftRef as any).open();
  }
}
</script>
<style lang="scss" scoped>
.Formula {
  .head {
    height: 80rpx;
    border-bottom: 1px solid #f6f6f6;
    font-size: 32rpx;
    text-align: center;
    line-height: 80rpx;
    .icon-gengduo {
      position: absolute;
      left: 30rpx;
      font-size: 30rpx;
    }
  }
}
</style>
