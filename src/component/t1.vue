<template>
    <view class="T1">
        <view class="li">
            <text class="title">{{z18n.t1}}:</text>
            <picker @change="bindPickerChange1" :value="index" range-key="name" :range="cableList">
                <view class="input" :class="{gray:!cableList[cableIndex].name}" >{{cableList[cableIndex].name||z18n.msg1}}</view>
            </picker>
        </view>
        <view class="li">
            <text class="title">{{z18n.t2}}:</text>
            <input type="number" :placeholder="z18n.msg2" v-model="obj.F" @confirm="confirm" @input="click($event, 'F')" /> GHZ
        </view>
        <view class="li">
            <text class="title">{{z18n.t3}}:</text>
            <picker @change="bindPickerChange($event,'Lid')" :value="index" :range="array">
                <view class="input" :class="{gray:!array[Lid]}" >{{array[Lid]||z18n.msg1}}</view>
            </picker>
        </view>
        <view class="li">
            <text class="title">{{z18n.t4}}:</text>
            <picker @change="bindPickerChange($event,'Rid')" :value="index" :range="array">
                <view class="input" :class="{gray:!array[Rid]}" >{{array[Rid]||z18n.msg1}}</view>
            </picker>
        </view>
        <view class="li">
            <text class="title">{{z18n.t5}}:</text>
            <input type="number" :placeholder="z18n.msg2" v-model="obj.M" @confirm="confirm" @input="click($event, 'M')" /> M
        </view>
        <view class="li">
            <text class="title">{{z18n.t6}}:</text>
            <text class="title">{{Val||z18n.msg3}}</text> dB
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide, Watch } from 'vue-property-decorator';
import { i18n } from '@/utils/i18n';
import { getBaseLog, float } from '@/utils/api';
import cable from '@/static/cable';
@Component({
    name: 'T1',
    components: {},
})
export default class T1 extends Vue {
    @Provide() z18n: any = i18n.t('T1');
    @Provide() array: any = i18n.t('selectArray');
    @Provide() Lid: string | null = null;
    @Provide() Rid: string | null = null;
    @Provide() cableIndex: string | null = null;
    @Provide() k1: any = null;
    @Provide() k2: any = null;

    @Provide() Val: string | number = '';
    @Provide() cableList: any = cable;

    @Provide() obj: any = {
        F: '',
        M: '',
    };
    click(e: any, key: string): void {
        float(e, key, this);
    }
    confirm(): void {
        if (this.obj.F && this.obj.M && this.k1) {
            this.getData();
        } else {
            this.Val = '';
        }
    }
    getData(): void {
        let { F: f, M } = this.obj;
        let g = f * 1000;
        let Lid = this.Lid === '1' ? 0.06 : 0;
        let Rid = this.Rid === '1' ? 0.06 : 0;
        this.Val = (
            ((this.k1 * Math.sqrt(g) + this.k2 * (f * 1000)) / 100) * M +
            Lid * Math.sqrt(f) +
            Rid * Math.sqrt(f)
        ).toFixed(2);
    }
    bindPickerChange1(e: any): void {
        const { value } = e.detail;
        this.cableIndex = value;
        this.k1 = this.cableList[value].k1;
        this.k2 = this.cableList[value].k2;
        this.confirm();
    }
    bindPickerChange(e: any, key: string): void {
        const { value } = e.detail;
        (this as any)[key] = value;
        this.confirm();
    }
}
</script>

<style lang="scss" scoped>
.T1 {
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
        .input{
            line-height: 70rpx;
        }
        .gray{
            color:gray;
        }
    }
}
</style>
