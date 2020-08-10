<template>
  <view class="Formula">
    <view class="head">
      <text class="iconfont icon-gengduo" @click="open"></text>
      <text>{{title}}</text>
    </view>
    <u-t2 v-if="type==='t2'"></u-t2>
    <u-left @setData="setData" ref="leftRef"></u-left>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from "vue-property-decorator";
import Left from "@/component/left.vue";
import T2 from "@/component/t2.vue"

@Component({
  name: "Formula",
  components: {
    "u-left": Left,
    "u-t2": T2
  }
})
export default class Formula extends Vue {
  @Provide() title: string ="阻抗(Zo)"
  @Provide() type: string = "t2"

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
