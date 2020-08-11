<template>
    <view class="T1">
         <view class="li">
            <text class="title">{{z18n.t1}}:</text>
            <picker @change="bindPickerChange1" :value="index" :range="array">
                <view class="uni-input">{{array[index]}}</view>
                <input type="number" :placeholder="z18n.msg1" :value="array[id]" disabled />
            </picker>
        </view>
        <view class="li">
            <text class="title">{{z18n.t2}}:</text>
            <input type="number" :placeholder="z18n.msg2" v-model="obj.F" @confirm="confirm" @input="click($event, 'F')" /> GHZ
        </view>
         <view class="li">
            <text class="title">{{z18n.t3}}:</text>
            <picker @change="bindPickerChange($event,'Lid')" :value="index" :range="array">
                <view class="uni-input">{{array[index]}}</view>
                <input type="number" :placeholder="z18n.msg1" :value="array[Lid]" disabled />
            </picker>
        </view>
        <view class="li">
            <text class="title">{{z18n.t4}}:</text>
            <picker @change="bindPickerChange($event,'Rid')" :value="index" :range="array">
                <view class="uni-input">{{array[index]}}</view>
                <input type="number" :placeholder="z18n.msg1" :value="array[Rid]" disabled />
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
@Component({
    name: 'T1',
    components: {},
})
export default class T1 extends Vue {
    @Provide() z18n: any = i18n.t('T1');
    @Provide() array: Array<any> = ['不选择', '0.06'];
    @Provide() Lid: string | null = null;
    @Provide() Rid: string | null = null;
    @Provide() K: string | null = '1';
    @Provide() arr: Array<any> = [0.93, 0.97, 1];
    @Provide() Val: string | number = '';
    @Provide() obj: any = {
        F: '',
        M: '',
    };
    click(e: any, key: string): void {
        float(e, key, this);
    }
    confirm(): void {
        if (this.obj.F && this.obj.M && this.K ) {
            this.getData();
        } else {
            this.Val = '';
        }
    }
    getData(): void {
        let k1 = 1.9758324
		let k2 = 0.0012207
		let {F:f,M} = this.obj
        let g = f*1000 
        let Lid = this.Lid === '1'? 0.06:0
        let Rid = this.Rid === '1'? 0.06:0
		this.Val = ((k1*Math.sqrt(g) + k2*(f*1000))/100*M + Lid*Math.sqrt(f) +Rid*Math.sqrt(f)).toFixed(2)
        
    }
    bindPickerChange1(): void{

    }
    bindPickerChange(e: any,key:string): void {
        const { value } = e.detail;
        (this as any)[key] =value 
        this.confirm()
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
    }
}
</style>
