<template>
    <view class="T2">
        <view class="li">
            <text class="title">{{z18n.t1}}:</text>
            <input type='text' :placeholder="z18n.msg2" v-model="obj.L" @confirm="confirm" @input="click($event, 'L')" /> mm
        </view>
        <view class="li">
            <text class="title">{{z18n.t2}}:</text>
            <input type='text' :placeholder="z18n.msg2" v-model="obj.F" @confirm="confirm" @input="click($event, 'F')" /> GHz
        </view>
        <view class="li">
            <text class="title">{{z18n.t3}}:</text>
            <input type='text' :placeholder="z18n.msg2" v-model="obj.Vp" @confirm="confirm" @input="click($event, 'Vp')" /> %
        </view>
        <view class="li">
            <text class="title">{{z18n.t4}}:</text>
            <input type='text' :placeholder="z18n.msg2" v-model="obj.Q" @confirm="confirm" @input="click($event, 'Q')" />
        </view>

        <view class="li">
            <text class="title">{{z18n.t5}}:</text>
            <text class="input">{{Val||z18n.msg3}}</text>
            °
        </view>
        <view  v-for="(item, index) in gs" :key="index" style="font-size: 28rpx;line-height: 50rpx;">
            {{item}}
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide, Watch } from 'vue-property-decorator';
import { i18n } from '@/utils/i18n';
import { float } from '@/utils/api';
@Component({
    name: 'T6',
    components: {},
})
export default class T6 extends Vue {
    @Provide() z18n: any = i18n.t('T6');
    @Provide() gs: any = i18n.t('gs.t6');
    @Provide() Val: string | number = '';

    @Provide() obj: any = {
        Vp: '',
        L: '',
        Q: '',
        F: '',
    };

    // @Watch('obj', { deep: true })
    // hander(a: any) {
    //     if (this.obj.Vp && this.obj.L && this.obj.Q && this.obj.F) {
    //     } else {
    //         this.Val = '';
    //     }
    // }
    confirm(): void {
        if (this.obj.Vp && this.obj.L && this.obj.Q && this.obj.F) {
            this.getData();
        }else{
            this.Val = '';
        }
    }
    click(e: any, key: string): void {
        float(e, key, this);
    }
    getData(): void {
        const { Vp, L, Q, F } = this.obj;
        this.Val = (((L * F * 360) / (3 * Vp)) * (Q / 1000000)).toFixed(2);
    }
}
</script>

<style lang="scss" scoped>
.T2 {
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
