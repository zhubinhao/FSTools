<template>
    <view class="content">
        <view class='banner'>
           <image :src="bannerImg" mode="aspectFill"></image>
        </view>
        <u-list></u-list>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import List from '@/component/list.vue'

@Component({
    name: 'Index',
    components: {
        'u-list': List
    },
})
export default class Index extends Vue {
    @Provide() bannerImg:string = require("@/static/img/banner.jpg")
    public $refs!: {};
}
</script>

<style lang="scss" scope>
.banner{
  height: 400rpx;
  width: 750rpx;
  overflow: hidden;
  image{
    height: 400rpx;
    width: 750rpx;
    background: #f6f6f6
  }
}
</style>
