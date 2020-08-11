<template>
    <view class="T9">
        <view class="li">
            <text class="title">{{z18n.t1}}:</text>
            <input type="number" :placeholder="z18n.msg2" v-model="obj.W" @confirm="confirm('W')" @input="click($event, 'W')" />
        </view>
        <view class="li">
            <text class="title">{{z18n.t2}}:</text>
            <input type="number" :placeholder="z18n.msg2" v-model="obj.D" @confirm="confirm('D')"  @input="click($event, 'D')"/> W
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide, Watch } from 'vue-property-decorator';
import { i18n } from '@/utils/i18n';
import { getBaseLog, clearNoNum , float } from '@/utils/api';
@Component({
    name: 'T9',
    components: {},
})
export default class T9 extends Vue {
    @Provide() z18n: any = i18n.t('T9');
    @Provide() obj: any = {
        W: '',
        D: '',
    };
    click(e: any, key: string): void {
        float(e,key,this)
    }
    confirm(key: string): void {
        let obj = JSON.parse(JSON.stringify(this.obj));
        if (key === 'W') {
            obj.D = (10 * getBaseLog(this.obj.W * 1000)).toFixed(2);
        } else {
            obj.W = (Math.pow(10, this.obj.D / 10) / 1000).toFixed(2);
        }
        this.obj = obj;
    }
}
</script>

<style lang="scss" scoped>
.T9 {
    padding: 60rpx 30rpx 0 90rpx;
    .li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 80rpx;
        font-size: 30rpx;
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
