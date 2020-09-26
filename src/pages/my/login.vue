<template>
  <view class="Login" :style="{paddingTop:barHeight+'px'}">
    <bar title=" "/>

    <view class="ul">
      <text class="title">登录</text>
      <view class="li">
        <input type="text" placeholder="输入姓名" bindinput="setValue" v-model="wx_name" />
      </view>
      <view class="li">
        <input type="number" placeholder="输入手机号" bindinput="setValue" v-model="wx_mobile" maxlength="11"/>
      </view>
      <view class="li">
        <input type="text" placeholder="输入公司名" v-model="wx_company" bindinput="setValue"/>
      </view>
    </view>

    <view  class="submits">
      <view @click="submits">登录</view>
      <userinfor @load="submits"></userinfor>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from "vue-property-decorator";
import { State } from "vuex-class";
import bar from "@/component/bar.vue";
import userinfor from "@/component/userinfor.vue"
import { http } from "@/utils/http";
import { i18n } from "@/utils/i18n";

@Component({
  components:{
    userinfor,
    bar
  }
})
export default class Login extends Vue {
  @Provide() z18n: any = i18n.t("about");
  @Provide() wx_name:string = ""
  @Provide() wx_mobile:string = ""
  @Provide() wx_company:string = ""
  @State barHeight!: number;

  async submits(){
    const data =  this.getData()
    if(!data)return
    await http({ url: "/JY/WX_Info",data })
    uni.switchTab({
      url:"/pages/index/index"
    })
  }
  getData():any{
    const userInfos = uni.getStorageSync("userInfos")
    let data:any = {
      wx_name:this.wx_name,
      wx_mobile:this.wx_mobile,
      wx_company:this.wx_company,
      wx_code:uni.getStorageSync("openid"),
      wx_nickname:userInfos.nickName
    }
    if(!data.wx_name){
      this.toast("姓名不能为空")
      return false
    }
    if(!data.wx_mobile){
      this.toast("手机号不能为空")
      return false
    }
    if(data.wx_mobile.length!==11){
      this.toast("请输入正确的手机号")
      return false
    }
    if(!data.wx_company){
      this.toast("公司名不能为空")
      return false
    }
    return data
  }
  toast(title:string){
    uni.showToast({
      title,
      icon:"none"
    })
  }
}
</script>

<style lang="scss" scope>
.Login {
  margin: 0 30rpx;
  ul {
    background: #fff;
    padding: 0 40rpx;
  }

  .title {
    font-size: 34rpx;
    color: #000;
    font-weight: bold;
    margin-bottom: 30rpx;
    margin-top: 50rpx;
    display: block;
  }

  .li {
    height: 90rpx;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30rpx;
  }

  input {
    flex: 1;
  }

  .submits {
    height: 96rpx;
    margin-top: 90rpx;
    background: #1f63f9;
    color: white;
    position: relative;
    width: 690rpx;
    padding: 0;
    border-radius: 10rpx;
    >view{
      height: 96rpx;
      width: 690rpx;
      text-align: center;
      line-height: 96rpx;
    }
    
  }


 
}
</style>
