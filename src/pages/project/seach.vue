<template>
    <view class="Seach"  :style="{paddingTop:barHeight+'px'}">
        <bar :title="z18n.t2" />
        <seach></seach>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import bar from '@/component/bar.vue';
import { State } from 'vuex-class';
import seach from '@/component/seach.vue';
import { i18n } from '@/utils/i18n';

@Component({
    name: 'Seach',
    components: {
        seach,
        bar,
    },
})
export default class Seach extends Vue {
    @Provide() type: number = 0;
    @Provide() screenHeight: string = '';
    @Provide() z18n: any = i18n.t('project');

    @State barHeight!: number;

}
</script>

<style lang="scss" scope>
.Seach {
    position: relative;
    padding: 30rpx;
}
</style>
