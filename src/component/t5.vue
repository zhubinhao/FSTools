<template>
    <view class="T5">
        <view class="li">
            <text class="title">{{z18n.t1}}:</text>
            <input type='number' :placeholder="z18n.msg2" v-model="obj.L" @confirm="confirm" @input="click($event, 'L')" /> mm
        </view>
        <view class="li">
            <text class="title">{{z18n.t2}}:</text>
            <input type='number' :placeholder="z18n.msg2" v-model="obj.F" @confirm="confirm" @input="click($event, 'F')" /> GHz
        </view>
        <view class="li">
            <text class="title">{{z18n.t3}}:</text>
            <input type='number' :placeholder="z18n.msg2" v-model="obj.Vp" @confirm="confirm" @input="click($event, 'Vp')" /> %
        </view>

        <view class="li">
            <text class="title">{{z18n.t5}}:</text>
            <text class="input">{{Val||z18n.msg3}}</text>
            °
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide, Watch } from 'vue-property-decorator';
import { i18n } from '@/utils/i18n';
import { float } from '@/utils/api';
@Component({
    name: 'T5',
    components: {},
})
export default class T5 extends Vue {
    @Provide() z18n: any = i18n.t('T5');
    @Provide() Val: string | number = '';

    @Provide() obj: any = {
        Vp: '',
        L: '',
        F: '',
    };

    // @Watch('obj', { deep: true })
    // hander(a: any) {
    //     if (this.obj.Vp && this.obj.L && this.obj.F) {
    //     }else{
    //       this.Val= ""
    //     }
    // }
    confirm(): void {
        if (this.obj.Vp && this.obj.L && this.obj.F) {
            this.getData();
        } else {
            this.Val = '';
        }
    }
    click(e: any, key: string): void {
        float(e, key, this);
    }
    getData(): void {
        const { Vp, L, F } = this.obj;
        this.Val = ((L * F * 360) / (3 * Vp)).toFixed(2);
    }
}
</script>

<style lang="scss" scoped>
.T5 {
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
