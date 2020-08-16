<template>
    <view class="About">
        <image src='../../static/img/company.png' mode="widthFix"></image>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import {http} from '@/utils/http'

@Component({
    name: 'About',
    components: {},
})
export default class Index extends Vue {
     mounted(){
        console.log(121)
        this.getData()
    }
    async getData(){
        const token = uni.getStorageSync('token')
        const info = await http({url:'/JY/Company_Info',data:{token}}).then((res:any)=>res.data)     
       console.log(info)
    }
}
</script>

<style lang="scss" scope>
    image {
        width: 750rpx;
    }
</style>
