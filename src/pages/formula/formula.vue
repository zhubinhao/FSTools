<template>
    <view class="content">
        <view @click="open">按钮</view>
		<u-left @setData= "setData" ref="leftRef"></u-left>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import Left from '@/component/left.vue';

@Component({
    name: 'Index',
    components: {
        'u-left': Left,
    },
})
export default class Index extends Vue {
    @Provide() path: string = '';
	@Provide() urlData: string = '';
	
	setData(str:string):void{
		console.log(str)
        uni.setTabBarItem({
            index:1,
            text:'hah'
        })
	}
	open():void{
		(this.$refs.leftRef as any).open()
	}

}
</script>
<style >
</style>
