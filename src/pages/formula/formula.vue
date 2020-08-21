<template> 
  <view class="Formula" >
    <bar :title="titles" />
    <view class="head" :style="{paddingTop:barHeight+'px'}">
      <text class="iconfont icon-gengduo" @click="open"></text>
      <text>{{title}}</text>
    </view>
    <u-t1 v-if="type==='t1'"></u-t1>
    <u-t2 v-if="type==='t2'"></u-t2>
    <u-t3 v-if="type==='t3'"></u-t3>
    <u-t4 v-if="type==='t4'"></u-t4>
    <u-t5 v-if="type==='t5'"></u-t5>
    <u-t6 v-if="type==='t6'"></u-t6>
    <u-t7 v-if="type==='t7'"></u-t7>
    <u-t8 v-if="type==='t8'"></u-t8>
    <u-t9 v-if="type==='t9'"></u-t9>
    <u-left @setData="setData" ref="leftRef"></u-left>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from "vue-property-decorator";
import {State} from "vuex-class"
import bar from '@/component/bar.vue'
import Left from "@/component/left.vue";
import T1 from "@/component/t1.vue"
import T2 from "@/component/t2.vue"
import T3 from "@/component/t3.vue"
import T4 from "@/component/t4.vue"
import T5 from "@/component/t5.vue"
import T6 from "@/component/t6.vue"
import T7 from "@/component/t7.vue"
import T8 from "@/component/t8.vue"
import T9 from "@/component/t9.vue"
import { i18n } from '@/utils/i18n';

@Component({
  name: "Formula",
  components: {
    "u-left": Left,
    "u-t1": T1,
    "u-t2": T2,
    "u-t3": T3,
    "u-t4": T4,
    "u-t5": T5,
    "u-t6": T6,
    "u-t7": T7,
    "u-t8": T8,
    "u-t9": T9,
    bar
  }
})
export default class Formula extends Vue {
  @Provide() title: string ="插入损耗(IL)"
  @Provide() type: string = "t1"
    @Provide() titles: any = i18n.t('bar.t3');

  @State barHeight!:number;

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
