<template>
    <view class="Project">
        <view class='header'>
            <text :class='{active:type===0}' @click="type=0">电缆比较</text>
            <text :class='{active:type===1}' @click="type=1">参数选电缆</text>
        </view>
        <view>
            <swiper :style='{height:screenHeight}' :current="type" @change="changeType">
                <swiper-item>
                    <scroll-view scroll-y :style='{height:screenHeight}' class="pt70">
                        <!-- 电缆比较 -->
                        <contrast></contrast>
                    </scroll-view>
                </swiper-item>
                <swiper-item>
                    <scroll-view scroll-y :style='{height:screenHeight}' class="pt70">
                        <!-- 参数选电缆 -->
                        <seach></seach>
                    </scroll-view>

                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import seach from '@/component/seach.vue'
import contrast from '@/component/contrast.vue'


@Component({
    name: 'Project',
    components: {
		seach,
		contrast
	},
})
export default class Project extends Vue {
    @Provide() type: number = 0;
    @Provide() screenHeight: string = '';

    onLoad() {
        this.screenHeight = uni.getSystemInfoSync().windowHeight + 'px';
    }
    changeType(event: any): void {
        const { current } = event.detail;
        this.type = current;
    }
}
</script>

<style lang="scss" scope>
.Project {
    .header {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 60rpx;
        z-index: 1;
        background: white;
        font-size: 30rpx;
        padding: 0 30rpx;
        border-bottom: 1px solid #f6f6ff;
		display: flex;
		justify-content: flex-start;
		align-items: center;
        text {
            margin-right: 30rpx;
			line-height: 58rpx;
        }
        .active {
            color: #4379fe;
            border-bottom: 1px solid #4379fe;
        }
    }
    .pt70 {
		margin: 70rpx 30rpx 30rpx 30rpx;
		
    }
}
</style>
