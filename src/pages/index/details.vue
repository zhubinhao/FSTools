<template>
    <view class="Details">
        <scroll-view scroll-x class='header' :scroll-into-view="`id${current}`">
            <view>
                <block v-for="(item,index) in listData"  :key="item.prod_id">
                    <text :class='{active:current===index}' :id="`id${index-2}`" @click="changeBar(index)">{{item.prod_code}}</text>
                </block>
            </view>
        </scroll-view>
        <swiper :style='{height:screenHeight}' :current="current" @change="changeType">
            <swiper-item v-for="item in listData" :key="item.prod_id">
                <scroll-view scroll-y :style='{height:screenHeight}' class="box">
                    <image :src='item.prod_image' mode="widthFix" class="img" @click="preView(item.prod_image)"></image>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import { http } from '@/utils/http';
import { imgUrl } from '@/utils/path';

@Component({
    name: 'Details',
    components: {},
})
export default class Details extends Vue {
    @Provide() token: string = uni.getStorageSync('token');
    @Provide() screenHeight: string = '';
    @Provide() listData: Array<any> = [];
    @Provide() current: number = 0

    onLoad(option: any) {
        this.screenHeight = uni.getSystemInfoSync().windowHeight + 'px';
        this.getData(option);
    }
    changeType(e:any):void{
        const {current} = e.detail
        this.current = current
    }
    changeBar(index:number):void{
        this.current = index
    }
    preView(url:string):void{
        console.log(url)
        uni.previewImage({
            urls: [url],
        })
    }
    async getData(option: any) {
        const data = {
            sty_id: option.id,
        };
        let require: Array<any> = await http({
            url: '/JY/Product_Query',
            data,
        }).then((res: any) => res.data);
        require.map((res: any) => {
            res.prod_image = imgUrl + res.prod_image;
        });
        this.listData = require;
        console.log(require);
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
    }
    .img{
        width: 750rpx;
    }
}
</style>
