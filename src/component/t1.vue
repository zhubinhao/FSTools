<template>
    <view class="T1">
        <view class="li">
            <text class="title">{{z18n.t1}}:</text>
            <picker @change="bindPickerChange1" :value="index" range-key="prod_code" :range="cableList">
                <view class="input" :class="{gray:!cableList[cableIndex].prod_code}" >{{cableList[cableIndex].prod_code||z18n.msg1}}</view>
            </picker>
        </view>
        <view class="li">
            <text class="title">{{z18n.t2}}:</text>
            <input type="text" :placeholder="z18n.msg2" v-model="obj.F" @confirm="confirm" @input="click($event, 'F')" /> GHZ
        </view>
        <view class="li">
            <text class="title">{{z18n.t3}}:</text>
            <picker @change="bindPickerChange($event,'Lid')" :value="index" :range="option" range-key="di_name">
                <view class="input" :class="{gray:!option[Lid]}" >{{option[Lid].di_name||z18n.msg1}}</view>
            </picker>
        </view>
        <view class="li">
            <text class="title">{{z18n.t4}}:</text>
            <picker @change="bindPickerChange($event,'Rid')" :value="index" :range="option" range-key="di_name">
                <view class="input" :class="{gray:!option[Rid]}" >{{option[Rid].di_name||z18n.msg1}}</view>
            </picker>
        </view>
        <view class="li">
            <text class="title">{{z18n.t5}}:</text>
            <input type="text" :placeholder="z18n.msg2" v-model="obj.M" @confirm="confirm" @input="click($event, 'M')" /> M
        </view>
        <view class="li">
            <text class="title">{{z18n.t6}}:</text>
            <text class="title">{{Val||z18n.msg3}}</text> dB
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
import { http } from "@/utils/http";
import cable from '@/static/cable';
import {gIL} from '@/utils/formula'
@Component({
    name: 'T1',
    components: {},
})
export default class T1 extends Vue {
    @Provide() z18n: any = i18n.t('T1');
    @Provide() gs: any = i18n.t('gs.t1');
    @Provide() id: string = '';
    @Provide() array: any = i18n.t('selectArray');
    @Provide() Lid: any  = '';
    @Provide() Rid: any  = '';
    @Provide() cableIndex: string | null = null;
    @Provide() option:Array<any> = []
    @Provide() Val: string | number = '';
    @Provide() cableList: any = [];

    @Provide() obj: any = {
        F: '',
        M: '',
    };
    mounted(){
        this.getType()
        this.getCableList()
    }
    click(e: any, key: string): void {
        float(e, key, this);
        this.confirm()
    }
    confirm(): void {
        if (this.obj.F && this.obj.M && this.id) {
            this.getData();
        } else {
            this.Val = '';
        }
    }
    async getType(){
      const data = await http({ url: "/JY/Dict_Info",data:{di_type:"连接器"}} ).then((res:any)=>res.data)
      this.option = data

    }
    async getCableList(){
      const List = await http({ url: '/JY/Cable_List' }).then((res: any) => res.data);
      this.cableList = List.filter((_:any)=>!_.prod_name.includes("结构"))
      console.log(this.cableList)
    }
     
    async getData() {
        const Info = await http({url: '/JY/Cable_Info',data: { prod_id:this.id}}).then((res: any) => res.data[0]);
        const k1 =Info.prod_field20
        const k2 =Info.prod_field21
        let { F, M } = this.obj;
        let Lid = this.option[this.Lid].di_value||0;
        let Rid = this.option[this.Rid].di_value||0;
        this.Val = gIL(F,M,k1,k2,Lid,Rid);
    }
    bindPickerChange1(e: any): void {
        const { value } = e.detail;
        console.log(value)
        this.cableIndex = value;
        this.id = this.cableList[value].prod_id
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
        min-height: 80rpx;
        font-size: 28rpx;
        margin-bottom: 10px;
        .title {
            width: 250rpx;
            word-break: break-all;
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
