<template>
    <view class="Formula" :style="{paddingTop:barHeight+'px'}">
        <bar :title="title" />
        <block v-for="(item,key) in z18n" :key="key">
            <view class="list"  @click="nativeTo(key,item)" :class="{borderTop:key==='t1'}">{{item}}</view>
        </block>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import { State } from 'vuex-class';
import bar from '@/component/bar.vue';

import { i18n } from '@/utils/i18n';

@Component({
    name: 'Formula',
    components: {
        bar,
    },
})
export default class Formula extends Vue {
    @Provide() title: any = i18n.t('bar.t3');
    @Provide() z18n:any = i18n.t('left')

    @State barHeight!: number;

    nativeTo(key: string, title:string): void {
      uni.navigateTo({
        url:`/pages/formula/details?id=${key}&title=${title}`
      })
    }
    
}
</script>
<style lang="scss" scoped>
.Formula {
    .list {
      height: 90rpx;
      line-height: 90rpx;
      padding: 0 30rpx;
      font-size: 28rpx;
      border-bottom: 1px solid lightgray;
       
    }
    .borderTop{
      border-top: 1px solid lightgray;
    }
}
</style>
