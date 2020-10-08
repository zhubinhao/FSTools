<template>
    <view class="content" :style="{paddingTop:barHeight+'px'}" >
        <bar :title="title" />
        <view v-for="item in productList" :key="item.sty_id">
            <u-list :inner="item" @nativeTo="nativeTo"></u-list>
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import bar from '@/component/bar.vue'
import { State } from 'vuex-class';
import List from '@/component/list.vue';
import { i18n } from '@/utils/i18n';
import { http } from '@/utils/http';
import { imgUrl } from '@/utils/path';

@Component({
    name: 'Index',
    components: {
        'u-list': List,
         bar
    },
})
export default class Index extends Vue {
    @Provide() title:string = '';
    @Provide() productList: Array<any> = [];

    @State token!: string;
    @State barHeight!:number;
    onLoad(option: any) {
      this.title = option.title;
      this.getData(option.id);
    }
    nativeTo(data:any):void{
        console.log(data)
        uni.navigateTo({
            url:`/pages/index/details?id=${data.sty_id}`
        })
    }
    async getData(id:string) {
        const data = {}
        const product = await http({url: '/JY/Home_Product',data:{parent:id}}).then((res: any) => res.data);
        product.map((res: any) => {
            res.sty_image = imgUrl + res.sty_image;
        });
        this.productList = product;
    }
}
</script>

<style lang="scss" scope>
.swiper {
    height: 300rpx;
    .banner {
        height: 300rpx;
        width: 750rpx;
        overflow: hidden;
        .adImg {
            height: 300rpx;
            width: 750rpx;
            background: lightgray;
        }
    }
}
</style>
