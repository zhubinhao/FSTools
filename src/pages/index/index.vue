<template>
    <view class="content">
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import { pathUrlv1 } from '@/utils/path';

@Component({
    name: 'Index',
    components: {},
})
export default class Index extends Vue {
    public $refs!: {};
    // data
    @Provide() path: string = pathUrlv1;
    @Provide() pathV1: string = pathUrlv1;
    @Provide() channel: string = 'ZXBXXCX';
    @Provide() pageData: object = {};
    onLoad(e: any = {}) {
        if (e.istrue) {
            this.path = `${
                this.pathV1
            }/pages/paySuccessIndex/index${this.chooseData(e)}`;
        } else {
            e.channel = e.channel || 'ZXBXXCX';
            this.pageData = e;
            this.path = `${this.pathV1}${this.chooseData({})}`;
        }
    }
    chooseData(obj: any): string {
        let str: string = `?`;
        let arr: Array<any> = [];
        delete obj.istrue;
        let newObj = { ...this.pageData, ...obj };
        for (const i in newObj) {
            arr.push(`${i}=${newObj[i]}`);
        }
        return `${str}${arr.join('&')}`;
    }
}
</script>

<style >
</style>
