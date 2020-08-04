<template>
	<view class="content">
        <web-view :src="path" v-if="path"></web-view>
	</view>
</template>

<script lang="ts">  
import { Vue, Component, Provide } from 'vue-property-decorator'; 
import {pathUrlv1} from '@/utils/path'
import {http} from '@/utils/http'
import {chooseData} from '@/utils/api'

@Component({  
  name: 'Index',
  components:{
  }
})  
export default class Index extends Vue { 
	@Provide() path: string ='';
	@Provide() urlData: string = '';
	
	onLoad(options:any={}){
		options.scene?this.getData(options.scene):this.init(options)
	}
	init(e:any):void{
		if(e.istrue){
			delete e.istrue
			this.path = `${pathUrlv1}/pages/paySuccessIndex/index${chooseData(e,this.urlData+'&')}`
		}
	}
	async getData(scene:string){
		uni.showLoading({title: '加载中'});
		const qrcodeData = await http({url:'/miniapp/qrcode/ext/info',data:{id:scene},method:'GET'}).then((res:any)=>res.detail.qrcodeData)
		this.urlData = qrcodeData.startsWith('?')?qrcodeData:'?'+qrcodeData
		this.path = `${pathUrlv1}${this.urlData}`
		uni.hideLoading()
	}
}  
</script>
<style >
</style>
