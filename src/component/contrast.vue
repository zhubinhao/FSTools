<template>
    <view class="Contrast">
        <view class='li'>
            <text>{{z18n.t1}}:</text>
            <picker @change="bindPickerChange($event,'list1')" :value="index" range-key="prod_code" :range="listArr">
                <view class="input" :class="{gray:!listArr[list1].prod_code}">{{listArr[list1].prod_code||z18n.msg1}}</view>
            </picker>
            <picker @change="bindPickerChange($event,'list2')" :value="index" range-key="prod_code" :range="listArr">
                <view class="input" :class="{gray:!listArr[list2].prod_code}">{{listArr[list2].prod_code||z18n.msg1}}</view>
            </picker>
        </view>
        <view class='li'>
            <text>{{z18n.t2}}:</text>
            <picker @change="bindPickerChange($event,'Lid')" :value="index" :range="option" range-key="di_name">
                <view class="input w260" :class="{gray:!option[Lid]}">{{option[Lid].di_name||z18n.msg1}}</view>
            </picker>
        </view>
        <view class='li'>
            <text>{{z18n.t3}}:</text>
            <picker @change="bindPickerChange($event,'Rid')" :value="index" :range="option" range-key="di_name">
                <view class="input w260" :class="{gray:!option[Rid]}">{{option[Rid].di_name||z18n.msg1}}</view>
            </picker>
        </view>
        <view class='li1'>
            <text>{{z18n.t4}}:</text>
            <input type='text' v-model="obj.PL" :placeholder="z18n.msg2" @confirm="confirm" @input="click($event, 'PL')" />GHZ
        </view>
        <view class='li1'>
            <text>{{z18n.t5}}:</text>
            <input type='text' v-model="obj.L" :placeholder="z18n.msg2"  @confirm="confirm" @input="click($event, 'L')"  />M
        </view>
        <!-- 电缆外径 -->
        <view class='li1'>
            <text>{{z18n.t6}}:</text>
            <view>{{listObj1.prod_field22||z18n.msg3}}</view>
            <view>{{listObj2.prod_field22||z18n.msg3}}</view>mm
        </view>
        <!--  频率范围 -->
        <view class='li1'>
            <text>{{z18n.t7}}:</text>
            <view>{{listObj1.prod_field2||z18n.msg3}}</view>
            <view>{{listObj2.prod_field2||z18n.msg3}}</view>GHZ
        </view>
        <!--  插入损耗 -->
        <view class='li1'>
            <text>{{z18n.t8}}:</text>
            <view>{{listObj1.IL||z18n.msg3}}</view>
            <view>{{listObj2.IL||z18n.msg3}}</view>dB
        </view>
        <!--  电压驻波比 -->
        <view class='li1'>
            <text>{{z18n.t9}}:</text>
            <view>{{listObj1.VSWR||z18n.msg3}}</view>
            <view>{{listObj2.VSWR||z18n.msg3}}</view>Max
        </view>
        <!--  时延 -->
        <view class='li1'>
            <text>{{z18n.t10}}:</text>
            <view>{{listObj1.prod_field23||z18n.msg3}}</view>
            <view>{{listObj2.prod_field23||z18n.msg3}}</view>ns/m
        </view>
        <!--  电缆耐压 -->
        <view class='li1'>
            <text>{{z18n.t11}}:</text>
            <view>{{listObj1.prod_field8||z18n.msg3}}</view>
            <view>{{listObj2.prod_field8||z18n.msg3}}</view>Vr.m.s
        </view>
        <!--  平均功率 -->
        <view class='li1'>
            <text>{{z18n.t12}}:</text>
            <view>{{listObj1.PG||z18n.msg3}}</view>
            <view>{{listObj2.PG||z18n.msg3}}</view>KW
        </view>
        <!--  温度相位 -->
        <view class='li1'>
            <text>{{z18n.t13}}:</text>
            <view>{{listObj1.prod_field25||z18n.msg3}}</view>
            <view>{{listObj2.prod_field25||z18n.msg3}}</view>
        </view>
        <!--  K1 -->
        <view class='li2'>
            <text>{{z18n.t14}}:</text>
            <view>{{listObj1.prod_field20||z18n.msg3}}</view>
            <view>{{listObj2.prod_field20||z18n.msg3}}</view>
        </view>
        <!--  K2 -->
        <view class='li2'>
            <text>{{z18n.t15}}:</text>
            <view>{{listObj1.prod_field21||z18n.msg3}}</view>
            <view>{{listObj2.prod_field21||z18n.msg3}}</view>
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import { i18n } from '@/utils/i18n';
import { http } from '@/utils/http';
import { getBaseLog, float } from '@/utils/api';
import {gIL} from '@/utils/formula'

@Component({
    name: 'Contrast',
    components: {},
})
export default class Contrast extends Vue {
    @Provide() z18n: any = i18n.t('contrast');
    @Provide() array: any = i18n.t('selectArray');
    @Provide() listArr:Array<any> =[]
    @Provide() list1: string | null = null;
    @Provide() list2: string | null = null;
    @Provide() listObj1: any = {};
    @Provide() listObj2: any = {};
    @Provide() Lid: any = null;
    @Provide() Rid: any = null;
    @Provide() option:Array<any> =[]

    @Provide() obj: any = {
        PL: '',
        L: '',
    };

    nativeTo(url: string): void {
        uni.navigateTo({ url });
    }
    mounted() {
        this.getData();
        this.getType();

    }
    async getType(){
      const data = await http({ url: "/JY/Dict_Info",data:{di_type:"连接器"}} ).then((res:any)=>res.data)
      this.option = data
      console.log(data)

    }
    bindPickerChange(e: any, key: string): void {
        const { value } = e.detail;
        (this as any)[key] = value;
        this.confirm();
    }
    confirm():void{
        if(this.obj.PL&&this.obj.L){
          this.list1&&this.getInfo(this.list1,'listObj1');
          this.list2&&this.getInfo(this.list2,'listObj2');
          (this.list2||this.list2)&&uni.showLoading({title:"计算中..."})

        }
    }
    async getData() {
        const List = await http({ url: '/JY/Cable_List' }).then((res: any) => res.data);
        this.listArr = List.filter((_:any)=>!_.prod_name.includes("结构"))
    }
    async getInfo(index:string,key:string) {
        const prod_id = this.listArr[parseInt(index)].prod_id
        const Info:any = await http({url: '/JY/Cable_Info',data: { prod_id}}).then((res: any) => res.data[0]);
        const k1 =Info.prod_field20
        const k2 =Info.prod_field21
        const maxp = Info.prod_field2
        let Lid = this.Lid?this.option[this.Lid].di_value||0:0;
        let Rid = this.Rid?this.option[this.Rid].di_value||0:0;
        console.log(Rid,Lid)
        Info.VSWR = (Lid!=0||Rid!=0)?1.3:1.1
        Info.IL=gIL(this.obj.PL,this.obj.L,k1,k2,Lid,Rid)

        // Info.PG = ((k1 * Math.sqrt(300) + k2*300)/((this.obj.PL*1000))*Info.prod_field26).toFixed(5);
        Info.PG = (((k1 * Math.sqrt(300) + k2*300)/(k1 * Math.sqrt(this.obj.PL*1000)+k2*this.obj.PL*1000))*Info.prod_field26).toFixed(5);
        console.log(maxp)
        if(Number(maxp)<this.obj.PL){
            for(let k in Info){
                Info[k] = '超出频率范围'
            }
        }
        (this as any)[key] =Info
        let t = setTimeout(_=>{
            uni.hideLoading()
            clearTimeout(t)
        },300)
    }
     click(e: any, key: string): void {
        float(e, key, this);
        this.confirm();
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
        font-size: 26rpx;
    }

    .li text,
    .li1 text {
        width: 280rpx;
        font-size: 30rpx;
    }

    .li1 view {
        width: 160rpx;
        font-size: 26rpx;

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
    .input {
        width: 130rpx;
        border-bottom: 1px solid gray;
        margin-right: 10rpx;
        text-align: center;
        font-size: 30rpx;
        margin-right: 20rpx;
        height: 60rpx;
        line-height: 70rpx;
    }
    .w260 {
        width: 260rpx;
    }
    .gray {
        color: gray;
    }
}
</style>
