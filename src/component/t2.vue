<template>
    <view class="T2">
        <view class="li">
            <text class="title">{{z18n.t1}}:</text>
            <input type="text" :placeholder="z18n.msg2" v-model="obj.Vp" @confirm="confirm" @input="click($event, 'Vp')" /> %
        </view>
        <view class="li">
            <text class="title">{{z18n.t2}}:</text>
            <input type="text" :placeholder="z18n.msg2" v-model="obj.D" @confirm="confirm" @input="click($event, 'D')" /> mm
        </view>
        <view class="li">
            <text class="title">{{z18n.t3}}:</text>
            <input type="text" :placeholder="z18n.msg2" v-model="obj.d" @confirm="confirm" @input="click($event, 'd')" /> mm
        </view>
        <view class="li">
            <text class="title">{{z18n.t4}}:</text>
            <picker @change="bindPickerChange" :value="index" :range="array">
                <view class="input" :class="{gray:!array[id]}">{{array[id]||z18n.msg1}}</view>
            </picker>
        </view>
        <view class="li">
            <text class="title">{{z18n.t5}}:</text>
            <text class="title">{{Val||z18n.msg3}}</text>0hms
        </view>
        <view  v-for="(item, index) in gs" :key="index" style="font-size: 28rpx;line-height: 50rpx;">
            {{item}}
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide, Watch } from 'vue-property-decorator';
import { i18n } from '@/utils/i18n';
import { getBaseLog, float } from '@/utils/api';
import { gZo } from '@/utils/formula';
@Component({
    name: 'T2',
    components: {},
})
export default class T2 extends Vue {
    @Provide() z18n: any = i18n.t('T2');
    @Provide() gs: any = i18n.t('gs.t2');
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
    click(e: any, key: string): void {
        float(e, key, this);
        this.confirm()
    }
    confirm(): void {
        if (this.obj.Vp && this.obj.D && this.obj.d && this.obj.x) {
            this.getData();
        } else {
            this.Val = '';
        }
    }
    getData(): void {
        this.Val =gZo(this.obj.Vp,this.obj.D,this.obj.d,this.obj.x)
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
        .input {
            line-height: 70rpx;
        }
        .gray {
            color: gray;
        }
    }
}
</style>
