<template>
  <view class="T3">
    <view class="li">
      <text class="title">{{z18n.t1}}:</text>
      <input type="text" :placeholder="z18n.msg2" v-model="obj.Vp" @confirm="confirm('Vp')" @input="click($event, 'Vp')" /> %
    </view>
    <view class="li">
      <text class="title">{{z18n.t3}}:</text>
      <input type="text" :placeholder="z18n.msg2" v-model="obj.Td" @confirm="confirm('Td')" @input="click($event, 'Td')" /> nS/m
    </view>
    <view class="li">
      <text class="title">{{z18n.t2}}:</text>
      <input type="text" :placeholder="z18n.msg2" v-model="obj.j" @confirm="confirm('j')" @input="click($event, 'j')" />
    </view>

    <view v-for="(item, index) in gs" :key="index" style="font-size: 28rpx;line-height: 50rpx;">
      {{item}}
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide, Watch } from 'vue-property-decorator';
import { i18n } from '@/utils/i18n';
import { getBaseLog, float } from '@/utils/api';
@Component({
  name: 'T3',
  components: {},
})
export default class T3 extends Vue {
  @Provide() z18n: any = i18n.t('T3');
  @Provide() gs: any = i18n.t('gs.t3');
  @Provide() Val: string | number = '';
  @Provide() Val1: string | number = '';
  @Provide() obj: any = {
    Vp: '',
    Td: '',
    j: '',
  };
  click(e: any, key: string): void {
    float(e, key, this);
    let t: number = setTimeout((_) => {
      this.confirm(key);
      clearTimeout(t);
    }, 100);
  }
  confirm(key: string): void {
    let obj = JSON.parse(JSON.stringify(this.obj));
    if (key === 'Vp') {
      obj.Td = ((3.33 / obj.Vp) * 100).toFixed(2);
      obj.j = ((1 / (obj.Vp * obj.Vp)) * 10000).toFixed(2);
    }
    if (key === 'Td') {
      obj.j = ((obj.Td * obj.Td) / 3.33 / 3.33).toFixed(2);
      obj.Vp = ((3.33 / obj.Td) * 100).toFixed(2);
    }
    if (key === 'j') {
      obj.Td = (3.33 * Math.sqrt(obj.j)).toFixed(2);
      obj.Vp = ((1 / Math.sqrt(obj.j)) * 100).toFixed(2);
    }
    console.log(obj);
    this.obj = obj;
  }
}
</script>

<style lang="scss" scoped>
.T3 {
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
    input,
    .input {
      width: 260rpx;
      border-bottom: 1px solid gray;
      margin-right: 10rpx;
      text-align: center;
      font-size: 30rpx;
      margin-right: 20rpx;
      height: 60rpx;
    }
  }
}
</style>
