<template>
    <view class="Details">
        <bar :title="title" />

        <scroll-view scroll-x class='header' :scroll-into-view="`id${current}`" :style="{top:barHeight+'px'}">
            <view>
                <block v-for="(item,index) in listData"  :key="item.prod_id">
                    <text :class='{active:current===index}' :id="`id${index-2}`" @click="changeBar(index)">{{item.prod_code}}</text>
                </block>
            </view>
        </scroll-view>
        <swiper :style='{height:screenHeight}' :current="current" @change="changeType">
            <swiper-item v-for="item in listData" :key="item.prod_id">
                <scroll-view scroll-y :style='{height:screenHeight,top:barHeight+"px"}' class="box" >
                    <image :src='item.prod_image' mode="widthFix" class="img" @click="preView(item.prod_image)"></image>
                    
                    <view style="height:160rpx"></view>
                    <view class="sc" v-if="isuser">
                        <text  @click="shouchang(item)">{{item.coll_id?"已收藏":"收藏"}}</text>
                        <userinfor/>
                    </view>
                </scroll-view>
           
            </swiper-item>
           
        </swiper>
       
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import bar from '@/component/bar.vue'
import { State } from 'vuex-class';
import { http } from '@/utils/http';
import { imgUrl } from '@/utils/path';
import { i18n } from '@/utils/i18n';

@Component({
    name: 'Details',
    components: {bar},
})
export default class Details extends Vue {
    @Provide() token: string = uni.getStorageSync('token');
    @Provide() screenHeight: string = '';
    @Provide() listData: Array<any> = [];
    @Provide() current: number = 0
    @Provide() title: any = i18n.t('bar.t5');
    @Provide() msg: string = '收藏';
    @Provide() isuser:any =  uni.getStorageSync("isuser");

    @State barHeight!:number;

    onLoad(option: any) {
        this.screenHeight = (uni.getSystemInfoSync().windowHeight||655) -10+ 'px';
        this.getData(option);
    }
     shouchang(item:any){
        const wx =  uni.getStorageSync("openid");
        if(item.coll_id){
           http({ url: "/JY/Product_CollectionDel",data:{wx,product:item.prod_id} }).then(()=>{
             item.coll_id=null
            });
        }else{
            http({ url: "/JY/Product_CollectionADD",data:{wx,product:item.prod_id} }).then(()=>{
             item.coll_id=111
            });
        }
     
    }
    changeType(e:any):void{
        const {current} = e.detail
        this.current = current
        this.setHistory(this.listData[current])
    }
    changeBar(index:number):void{
        this.current = index
        this.setHistory(this.listData[index])

    }
    preView(url:string):void{
        uni.previewImage({
            urls: [url],
        })
    }
    async getData(option: any) {
        const data = {
            sty_id: option.id,
            wx :  uni.getStorageSync("openid"),
        };
        let require: Array<any> = await http({
            url: '/JY/Product_Query',
            data,
        }).then((res: any) => res.data);
        require.map((res: any) => {
            res.prod_image = imgUrl + res.prod_image;
        });
        this.listData = require;
        this.setHistory(this.listData[0])

    }
    async setHistory(obj: any){
        this.msg = obj.coll_id?"已收藏":"收藏"
        const data = {
            product: obj.prod_id,
            wx:uni.getStorageSync("openid"),
        };
        await http({
            url: '/JY/Product_LogInfo',
            data,
        })

    }
}
</script>

<style lang="scss" scope>
.Details {
    .header {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 60rpx;
        z-index: 1;
        background: white;
        font-size: 30rpx;
        width: 750rpx;
        border-bottom: 1px solid #f6f6ff;
        view {
            padding: 0 30rpx;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        text {
            margin-right: 30rpx;
            line-height: 58rpx;
        }
        .active {
            color: #4379fe;
            border-bottom: 1px solid #4379fe;
        }
    }
    .box {
        box-sizing: border-box;
        padding-top: 60rpx;
        position: relative;
    }
    .img{
        width: 750rpx;
    }
    .sc{
        position: fixed;
        right: 30rpx;
        bottom: 60rpx;
        z-index: 8;
        font-size: 26rpx;
        width: 90rpx;
        height: 90rpx;
        text-align: center;
        line-height: 90rpx;
        border-radius: 50%;
        box-shadow: 1px 1px 5px gray;
        background: white;
        text{
            position: absolute;
            right: 0rpx;
            bottom: 0rpx;
            z-index: 8;
            font-size: 26rpx;
            width: 90rpx;
            height: 90rpx;
            z-index: 1;
        }
    }
}
</style>
