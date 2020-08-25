<template>
    <view class="T2">
        <view class="li">
            <text class="title">{{z18n.t1}}:</text>
            <input type="number" :placeholder="z18n.msg2" v-model="obj.Vp" @confirm="confirm" @input="click($event, 'Vp')" /> %
        </view>
        <view class="li">
            <text class="title">{{z18n.t2}}:</text>
            <input type="number" :placeholder="z18n.msg2" v-model="obj.D" @confirm="confirm" @input="click($event, 'D')" /> mm
        </view>
        <view class="li">
            <text class="title">{{z18n.t3}}:</text>
            <input type="number" :placeholder="z18n.msg2" v-model="obj.d" @confirm="confirm" @input="click($event, 'd')" /> mm
        </view>
        <view class="li">
            <text class="title">{{z18n.t4}}:</text>
            <picker @change="bindPickerChange" :value="index" :range="array">
                <view class="uni-input">{{array[index]}}</view>
                <input type="number" :placeholder="z18n.msg1" :value="array[id]" disabled />
            </picker>
        </view>
        <view class="li">
            <text class="title">{{z18n.t5}}:</text>
            <text class="title">{{Val||z18n.msg3}}</text>0hms
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide, Watch } from 'vue-property-decorator';
import { i18n } from '@/utils/i18n';
import { getBaseLog, float } from '@/utils/api';
@Component({
    name: 'T2',
    components: {},
})
export default class T2 extends Vue {
    @Provide() z18n: any = i18n.t('T2');
    @Provide() array: any = i18n.t('endsArray');
    @Provide() id: string | null = null;
    @Provide() arr: Array<any> = [0.93, 0.97, 1];
    @Provide() Val: string | number = '';
    @Provide() obj: any = {
        Vp: '',
        D: '',
        d: '',
        x: '',
    };

    // @Watch('obj', { deep: true })
    // hander(a: any) {
    //     if (this.obj.Vp && this.obj.D && this.obj.d && this.obj.x) {
    //     } else {
    //         this.Val = '';
    //     }
    // }
    click(e: any, key: string): void {
        float(e, key, this);
    }
    confirm(): void {
        if (this.obj.Vp && this.obj.D && this.obj.d && this.obj.x) {
            this.getData();
        } else {
            this.Val = '';
        }
    }
    getData(): void {
        this.Val = (
            (138 *
                this.obj.Vp *
                getBaseLog((this.obj.D / this.obj.d) * this.obj.x)) /
            100
        ).toFixed(2);
    }
    bindPickerChange(e: any): void {
        const { value } = e.detail;
        this.id = value;
        this.obj.x = this.arr[value];
        this.confirm();
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
