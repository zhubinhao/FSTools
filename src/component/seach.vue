<template>
    <view class="Seach">
        <view class='li'>
            <text>频率(GHZ):</text>
            <input type='number' placeholder="请输入"/>
        </view>

        <view class='li'>
            <text>长度(mm):</text>
            <input type='number' placeholder="请输入"/>
        </view>
        <view class='li'>
            <text>衰减要求(dB):</text>
            <input type='number' placeholder="请输入"/>
        </view>
        <view class='li'>
            <text>连接器衰减系数:</text>
            <input type='number' placeholder="请输入"/>
        </view>
        <view class='seach'>搜索</view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';

@Component({
    name: 'Seach',
    components: {},
})
export default class Seach extends Vue {
    @Provide() imgs: string = require('@/static/img/JC.png');

    nativeTo(url: string): void {
        uni.navigateTo({ url });
    }
}
</script>

<style lang="scss" scoped>
.Seach {
    .li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 80rpx;
        font-size: 30rpx;
        text {
            width: 280rpx;
        }
        input {
            width: 260rpx;
            border-bottom: 1px solid gray;
        }
        
    }
    .seach {
            font-size: 36rpx;
            text-align: center;
            margin-top: 30rpx;
            color: #1296db;
        }
}
</style>
