<template>
    <view class="Details">
        <bar :title="title" />
        <view :style="{paddingTop:barHeight+'px'}" >
          <image :src='imgsrc' mode="widthFix" class="img" @click="preView(imgsrc)"></image>
        </view>

        <view class="sc">
            <text  @click="shouchang">{{msg}}</text>
            <userinfor/>
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import bar from '@/component/bar.vue'
import { State } from 'vuex-class';
import { http } from "@/utils/http";
import { i18n } from '@/utils/i18n';
import userinfor from "@/component/userinfor.vue"

@Component({
    name: 'Details',
    components: {bar,userinfor},
})
export default class Details extends Vue {
    @Provide() title: any = i18n.t('bar.t5');
    @Provide() imgsrc: string = '';
    @Provide() id: string = '';
    @Provide() msg: string = '收藏';


    @State barHeight!:number;

    onLoad(option: any) {
        this.imgsrc = option.img
        this.id = option.id
        this.msg = option.sc?"已收藏":"收藏"

    }
     shouchang(){
        const wx =  uni.getStorageSync("openid");
        if(this.msg=="已收藏"){
           http({ url: "/JY/Product_CollectionDel",data:{wx,product:this.id} }).then(()=>{
             this.msg = "收藏"
            });
        }else{
            http({ url: "/JY/Product_CollectionADD",data:{wx,product:this.id} }).then(()=>{
             this.msg = "已收藏"
            });
        }
     
    }
    preView(url:string):void{
        uni.previewImage({
            urls: [url],
        })
    }
}
</script>

<style lang="scss" scope>
.Details {
    .sc{
        position: absolute;
        right: 30rpx;
        bottom: 100rpx;
        z-index: 8;
        font-size: 26rpx;
        width: 90rpx;
        height: 90rpx;
        text-align: center;
        line-height: 90rpx;
        border-radius: 50%;
        box-shadow: 1px 1px 5px gray;
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
    .img{
        width: 750rpx;
    }
}
</style>
