<template>
    <view class="Contrast">
        <view class='li'>
            <text>{{z18n.t1}}:</text>
            <input type='number' class='iput' disabled :placeholder="z18n.msg1" />
            <input type='number' class='iput' disabled :placeholder="z18n.msg1" />
        </view>
        <view class='li'>
            <text>{{z18n.t2}}:</text>
            <input type='text' disabled :placeholder="z18n.msg1" />
        </view>
        <view class='li'>
            <text>{{z18n.t3}}:</text>
            <input type='text' disabled :placeholder="z18n.msg1" />
        </view>
        <view class='li1'>
            <text>{{z18n.t4}}:</text>
            <input type='number' :placeholder="z18n.msg2" />GHZ
        </view>
        <view class='li1'>
            <text>{{z18n.t5}}:</text>
            <input type='number' :placeholder="z18n.msg2" />M
        </view>

        <view class='li1'>
            <text>{{z18n.t6}}:</text>
            <view>{{z18n.msg3}}</view>
            <view>{{z18n.msg3}}</view>mm
        </view>
        <view class='li1'>
            <text>{{z18n.t7}}:</text>
            <view>{{z18n.msg3}}</view>
            <view>{{z18n.msg3}}</view>GHZ
        </view>
        <view class='li1'>
            <text>{{z18n.t8}}:</text>
            <view>{{z18n.msg3}}</view>
            <view>{{z18n.msg3}}</view>dB
        </view>
        <view class='li1'>
            <text>{{z18n.t9}}:</text>
            <view>{{z18n.msg3}}</view>
            <view>{{z18n.msg3}}</view>Max
        </view>
        <view class='li1'>
            <text>{{z18n.t10}}:</text>
            <view>{{z18n.msg3}}</view>
            <view>{{z18n.msg3}}</view>ns/m
        </view>
        <view class='li1'>
            <text>{{z18n.t11}}:</text>
            <view>{{z18n.msg3}}</view>
            <view>{{z18n.msg3}}</view>Vr.m.s
        </view>
        <view class='li1'>
            <text>{{z18n.t12}}:</text>
            <view>{{z18n.msg3}}</view>
            <view>{{z18n.msg3}}</view>KW
        </view>
        <view class='li1'>
            <text>{{z18n.t13}}:</text>
            <view>{{z18n.msg3}}</view>
            <view>{{z18n.msg3}}</view>
        </view>
        <view class='li2'>
            <text>{{z18n.t14}}:</text>
            <view>{{z18n.msg3}}</view>
            <view>{{z18n.msg3}}</view>
        </view>
        <view class='li2'>
            <text>{{z18n.t15}}:</text>
            <view>{{z18n.msg3}}</view>
            <view>{{z18n.msg3}}</view>
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import {i18n} from '@/utils/i18n'

@Component({
    name: 'Contrast',
    components: {},
})
export default class Contrast extends Vue {
    @Provide() imgs: string = require('@/static/img/JC.png');
    @Provide() z18n:any = i18n.t('contrast')

    nativeTo(url: string): void {
        uni.navigateTo({ url });
    }
}
</script>

<style lang="scss" scoped>
.Contrast {
    padding-bottom: 70rpx;
    .li,
    .li1,
    .li2 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 80rpx;
        font-size: 30rpx;
    }

    .li1,
    .li2 {
        font-size: 28rpx;
    }

    .li text,
    .li1 text {
        width: 350rpx;
    }

    .li1 view {
        width: 124rpx;
    }

    .li1 > view:last-child {
        margin-left: 20rpx;
    }

    .li2 text {
        width: 200rpx;
    }

    .li2 view {
        width: 350rpx;
        font-size: 26rpx;
    }

    .li input,
    .li1 input {
        width: 260rpx;
        border-bottom: 1px solid gray;
        margin-right: 10rpx;
        text-align: center;
        font-size: 30rpx;
    }

    .li .iput {
        width: 130rpx;
    }
}
</style>
