<template>
    <view class="Project"  :style="{paddingTop:barHeight+'px'}">
        <bar :title="title" seach=""/>
        <contrast></contrast>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import bar from '@/component/bar.vue';
import { State } from 'vuex-class';
import contrast from '@/component/contrast.vue';
import { i18n } from '@/utils/i18n';

@Component({
    name: 'Project',
    components: {
        contrast,
        bar,
    },
})
export default class Project extends Vue {
    @Provide() type: number = 0;
    @Provide() title: any = i18n.t('bar.t2');

    @State barHeight!: number;
   
}
</script>

<style lang="scss" scope>
.Project {
    position: relative;
    padding: 0 30rpx;
}
</style>
