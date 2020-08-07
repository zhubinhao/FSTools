<template>
    <view class="Seach">
        <view class='li'>
            <text>{{z18n.t1}}:</text>
            <input type='number' :placeholder="z18n.msg2" />
        </view>

        <view class='li'>
            <text>{{z18n.t2}}:</text>
            <input type='number' :placeholder="z18n.msg2" />
        </view>
        <view class='li'>
            <text>{{z18n.t3}}:</text>
            <input type='number' :placeholder="z18n.msg2" />
        </view>
        <view class='li'>
            <text>{{z18n.t4}}:</text>
            <input type='number' :placeholder="z18n.msg2" />
        </view>
        <view class='seach'>{{z18n.t5}}</view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import { i18n } from '@/utils/i18n';

@Component({
    name: 'Seach',
    components: {},
})
export default class Seach extends Vue {
    @Provide() imgs: string = require('@/static/img/JC.png');
    @Provide() z18n: any = i18n.t('seach');

    nativeTo(url: string): void {
        uni.navigateTo({ url });
    }
}
</script>

<style lang="scss" scoped>
.Seach {
    padding-bottom: 70rpx;
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
