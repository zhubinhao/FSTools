<template>
    <view class="Contrast">
        <view class='li'>
            <text>电缆型号:</text>
            <input type='number' class='iput' disabled placeholder="请选择" />
            <input type='number' class='iput' disabled placeholder="请选择" />
        </view>
        <view class='li'>
            <text>左端连接器:</text>
            <input type='text' disabled placeholder="请选择" />
        </view>
        <view class='li'>
            <text>右端连接器:</text>
            <input type='text' disabled placeholder="请选择" />
        </view>
        <view class='li1'>
            <text>频率(P):</text>
            <input type='number' placeholder="请输入" />GHZ
        </view>
        <view class='li1'>
            <text>长度(L):</text>
            <input type='number' placeholder="请输入" />M
        </view>

        <view class='li1'>
            <text>电缆外径(D):</text>
            <view>待求结果</view>
            <view>待求结果</view>mm
        </view>
        <view class='li1'>
            <text>频率范围(F):</text>
            <view>待求结果</view>
            <view>待求结果</view>GHZ
        </view>
        <view class='li1'>
            <text>插入损耗(IL):</text>
            <view>待求结果</view>
            <view>待求结果</view>dB
        </view>
        <view class='li1'>
            <text>电压驻波比(VSWR):</text>
            <view>待求结果</view>
            <view>待求结果</view>Max
        </view>
        <view class='li1'>
            <text>时延(Td):</text>
            <view>待求结果</view>
            <view>待求结果</view>ns/m
        </view>
        <view class='li1'>
            <text>电缆耐压(DC):</text>
            <view>待求结果</view>
            <view>待求结果</view>Vr.m.s
        </view>
        <view class='li1'>
            <text>平均功率(P):</text>
            <view>待求结果</view>
            <view>待求结果</view>KW
        </view>
        <view class='li1'>
            <text>温度相位(PPM):</text>
            <view>待求结果</view>
            <view>待求结果</view>
        </view>
        <view class='li2'>
            <text>K1:</text>
            <view>待求结果</view>
            <view>待求结果</view>
        </view>
        <view class='li2'>
            <text>K2:</text>
            <view>待求结果</view>
            <view>待求结果</view>
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';

@Component({
    name: 'Contrast',
    components: {},
})
export default class Contrast extends Vue {
    @Provide() imgs: string = require('@/static/img/JC.png');

    nativeTo(url: string): void {
        uni.navigateTo({ url });
    }
}
</script>

<style lang="scss" scoped>
.Contrast {
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
