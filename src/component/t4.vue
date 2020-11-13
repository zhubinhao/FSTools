<template>
  <view class="T4">
    <view class="li">
      <text class="title">{{z18n.t1}}:</text>
      <input type="text" :placeholder="z18n.msg2" v-model="obj.F" @confirm="confirm" @input="click($event, 'F')" /> GHz
    </view>
    <view class="li">
      <text class="title">{{z18n.t2}}:</text>
      <input type="text" :placeholder="z18n.msg2" v-model="obj.Vp" @confirm="confirm" @input="click($event, 'Vp')" /> %
    </view>

    <view class="li mt30">
      <text class="title">{{z18n.t3}}:</text>
      <text class="input">{{Val||z18n.msg3}}</text>mm/°
    </view>
    <view class="li">
      <text class="title">{{z18n.t3}}:</text>
      <text class="input">{{Val1||z18n.msg3}}</text>°/mm
    </view>
    <view v-for="(item, index) in gs" :key="index" style="font-size: 28rpx;line-height: 50rpx;">
      {{item}}
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide, Watch } from 'vue-property-decorator';
import { i18n } from '@/utils/i18n';
import { float } from '@/utils/api';
@Component({
  name: 'T4',
  components: {},
})
export default class T4 extends Vue {
  @Provide() z18n: any = i18n.t('T4');
  @Provide() gs: any = i18n.t('gs.t4');
  @Provide() Val: string | number = '';
  @Provide() Val1: string | number = '';

  @Provide() obj: any = {
    Vp: '',
    F: '',
  };

  confirm(): void {
    if (this.obj.Vp && this.obj.F) {
      this.getData();
    } else {
      this.Val = '';
      this.Val1 = '';
    }
  }
  click(e: any, key: string): void {
    float(e, key, this);
    this.confirm();
  }
  getData(): void {
    this.Val = ((3 * this.obj.Vp) / (this.obj.F * 360)).toFixed(3);
    this.Val1 = ((this.obj.F * 360) / ((3 * this.obj.Vp) / 100)).toFixed(2);
  }
}
</script>

<style lang="scss" scoped>
.T4 {
  padding: 60rpx 30rpx 0 90rpx;
  .li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 80rpx;
    font-size: 28rpx;
    margin-bottom: 10px;
    .title {
      width: 250rpx;
    }
    input {
      width: 260rpx;
      border-bottom: 1px solid gray;
      margin-right: 10rpx;
      text-align: center;
      font-size: 30rpx;
      margin-right: 20rpx;
      height: 60rpx;
    }
    .input {
      width: 260rpx;
      margin-right: 10rpx;
      text-align: center;
      font-size: 30rpx;
      margin-right: 20rpx;
    }
  }
}
</style>
