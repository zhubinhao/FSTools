<template>
    <view class="content" :style="{paddingTop:barHeight+'px'}" >
        <bar :title="title" />
        <swiper class="swiper" autoplay circular indicator-dots>
            <swiper-item class='banner' v-for="item in adList" :key="item.h_id">
                <image :src="item.h_image" mode="aspectFill" class="adImg"></image>
            </swiper-item>
        </swiper>
        <view v-for="item in productList" :key="item.sty_id">
            <u-list :inner="item"></u-list>
        </view>
        <!-- <button open-type="getUserInfo" @getuserinfo="getuserinfo">授权</button> -->
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
    @Provide() title: any = i18n.t('bar.t1');
    @Provide() adList: Array<any> = [];
    @Provide() productList: Array<any> = [];

    @State token!: string;
    @State barHeight!:number;

    get tokens() {
        this.token && this.getData();
        return this.token;
    }
    
    async getData() {
        const data = {}
        const ad = await http({url: '/JY/Home_Poster'}).then((res: any) => res.data);
        const product = await http({url: '/JY/Home_Product'}).then((res: any) => res.data);

        ad.map((res: any) => {
            res.h_image = imgUrl + res.h_image;
        });
        product.map((res: any) => {
            res.sty_image = imgUrl + res.sty_image;
        });
        this.adList = ad;
        this.productList = product;
    }
    onShareAppMessage() {
      return {
        title: '军友射频',
        path: '/pages/index/index'
      }
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
