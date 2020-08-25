<template>
    <view class="T8">
        <view class="li">
            <text class="title">{{z18n.t1}}:</text>
            <input type="number" :placeholder="z18n.msg2" v-model="obj.VSWR" @confirm="confirm('VSWR')" @input="click($event, 'VSWR')" /> 
        </view>
        <view class="li">
            <text class="title">{{z18n.t2}}:</text>
            <input type="number" :placeholder="z18n.msg2" v-model="obj.RL" @confirm="confirm('RL')" @input="click($event, 'RL')" /> dB
        </view>
        
        <view class="li">
            <text class="title">{{z18n.t3}}:</text>
            <text class="title">{{Val||z18n.msg3}}</text>%
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide, Watch } from 'vue-property-decorator';
import { i18n } from '@/utils/i18n';
import { getBaseLog,float } from '@/utils/api';
@Component({
    name: 'T8',
    components: {},
})
export default class T8 extends Vue {
    @Provide() z18n: any = i18n.t('T8');
    @Provide() id: string | null = null;
    @Provide() Val: string | number = '';
    @Provide() obj: any = {
        VSWR: '',
        RL: '',
    };
    
    click(e: any, key: string): void {
        float(e, key, this);
    }
    confirm(key:string): void {
         let obj = JSON.parse(JSON.stringify(this.obj));
        if (key === 'VSWR') {
            let log = (Number(this.obj.VSWR)-1)/(Number(this.obj.VSWR)+1)
            obj.RL = (-20 * getBaseLog(log)).toFixed(2);
            this.Val = ((1-(log*log))*100).toFixed(2);
        } else {
            let pow = Number(Math.pow(10,-this.obj.RL/20))
            obj.VSWR = ((1+ pow)/(1 - pow)).toFixed(2)
            let log = (Number(obj.VSWR)-1)/(Number(obj.VSWR)+1)
            this.Val = ((1-(log*log))*100).toFixed(2);
        }
        this.obj = obj;
    }
    getData(): void {
        const { Vp, D, d, x } = this.obj;
        this.Val = ((190 * Vp) / 100 / (d * x + Number(D))).toFixed(2);
    }
   
}
</script>

<style lang="scss" scoped>
.T8 {
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
