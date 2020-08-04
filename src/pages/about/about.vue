<template>
    <view class="About">
        <image src='../../static/img/company.png' mode="widthFix"></image>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';

@Component({
    name: 'About',
    components: {},
})
export default class Index extends Vue {}
</script>

<style lang="scss" scope>
    image {
        width: 750rpx;
    }
</style>
