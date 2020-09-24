<template>
    <view class="About" :style="{paddingTop:barHeight+'px'}">
        <bar :title="title" />
        <image :src='info.comp_image' mode="widthFix"></image>
        <view class="title">{{info.comp_name}}</view>
        <view class="content" v-html="info.comp_remark"></view>
        <view class="msg" v-if="info.comp_postcode">{{z18n.t1}}：{{info.comp_postcode}}</view>
        <view class="msg" v-if="info.comp_tel">Tel：{{info.comp_tel}}</view>
        <view class="msg" v-if="info.comp_fax">Fax：{{info.comp_fax}}</view>
        <view class="msg" v-if="info.comp_email">{{z18n.t2}}：{{info.comp_email}}</view>
        <view class="msg" v-if="info.comp_linkman">{{z18n.t3}}：{{info.comp_linkman}}</view>
        <view class="msg" v-if="info.comp_url">{{z18n.t4}}：{{info.comp_url}}</view>
        <view class="msg pb30">{{info.comp_address}}</view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import {State} from "vuex-class"
import bar from '@/component/bar.vue'
import { http } from '@/utils/http';
import { imgUrl } from '@/utils/path';
import { i18n } from '@/utils/i18n';


@Component({
    name: 'About',
    components: {bar},
})
export default class Index extends Vue {
    @Provide() info: any = {};
    @Provide() z18n: any = i18n.t('about');
    @Provide() title: any = i18n.t('bar.t4');

    @State barHeight!:number;
    mounted() {
        this.getData();
    }
    async getData() {
        const info = await http({url: '/JY/Company_Info'}).then((res: any) => res.data[0]);
        info.comp_image = imgUrl + info.comp_image;
        this.info = info;
    }
    
}
</script>

<style lang="scss" scope>
image {
    width: 750rpx;
}
.title {
    font-size: 36rpx;
    text-align: center;
    padding: 30rpx;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
}
.msg {
    font-size: 26rpx;
    padding: 0 30rpx 0 50rpx;
    line-height: 50rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}
.content {
    font-size: 30rpx;
    padding: 0 30rpx;
    line-height: 50rpx;
    text-indent: 2em;
    margin-bottom: 50rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}
.pb30 {
    padding-bottom: 30rpx;
}
.userInfoBtn{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: transparent;
    z-index: 9;
}
</style>
