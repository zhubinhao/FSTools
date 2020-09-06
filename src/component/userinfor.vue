<template>
  <button class="userInfoBtn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-if="show"></button>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop } from "vue-property-decorator";
import { http } from "@/utils/http";
import { State } from 'vuex-class';

@Component({
  name: "List",
  components: {}
})
export default class List extends Vue {
  @Prop() private inner!: any;
  @Provide() show: boolean = false;
  mounted() {
    this.show = uni.getStorageSync("userInfos") ? false : true;
  }

  bindGetUserInfo(e: any) {
    if (e.detail.errMsg != "getUserInfo:ok") {
    } else {
      uni.setStorageSync("userInfos", e.detail.userInfo);
      this.login(e.detail.userInfo)
      this.$emit('load')
      this.show = false;
    }
  }
  async login(userInfos:any) {
    const code =  uni.getStorageSync("openid");
    const nickname = userInfos.nickName
    const info = await http({ url: "/JY/WX_Info",data:{code,nickname} }).then(
      (res: any) =>{
        console.log(res)
      }

    );
  }
}
</script>

<style lang="scss" scoped>
.userInfoBtn {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  background: transparent;
  &::after {
    border: none;
  }
}
</style>
