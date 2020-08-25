<template>
  <view class="Bar" :style="{paddingTop:top+'px',height:height+'px' }">
    <text class="back iconfont icon-seach" @click="seachs" v-if="seach"></text>
    <text class="back blue" @click="back"  v-if="btnTitle=='CN/EN'" >{{btnTitle}}</text>

    <text class="back iconfont icon-left" @click="back"  v-if="!seach&&btnTitle=='返回'"></text>

    <text class="title">{{title}}</text>
    
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop } from "vue-property-decorator";
import { i18n } from "@/utils/i18n";

@Component({
  name: "Bar",
  components: {}
})
export default class Bar extends Vue {
  @Provide() top: number = 0;
  @Provide() height: number = 0;
  @Provide() btnTitle: string = "";

  @Prop() private title!: string;
  @Prop() private seach: boolean = false;

  created() {
    this.top = uni.getMenuButtonBoundingClientRect().top || 0;
    this.height = 5 + (uni.getMenuButtonBoundingClientRect().height || 0);
    this.$store.commit("setBarHeight", this.top + this.height);
    let routeArr: Array<any> = [
      "pages/index/index",
      "pages/project/project",
      "pages/formula/formula",
      "pages/about/about"
    ];
    let pagesArr: any = getCurrentPages();
    let pages = pagesArr[pagesArr.length - 1].route;

    if (!routeArr.includes(pages) && pagesArr.length != 1) {
      this.btnTitle = "返回";
    }
    if (!routeArr.includes(pages) && pagesArr.length == 1) {
      this.btnTitle = "首页";
    }
    if (pages === "pages/index/index") {
      this.btnTitle = "CN/EN";
    }
  }
  seachs():void{
    uni.navigateTo({
      url:'/pages/project/seach'
    })

  }

  back(): void {
    if (this.btnTitle === "返回") {
      uni.navigateBack();
    }
    if (this.btnTitle === "首页") {
      uni.switchTab({
        url: "/pages/index/index"
      });
    }
    if (this.btnTitle === "CN/EN") {
      let locale = i18n.locale;
      locale === "zh" ? (i18n.locale = "en") : (i18n.locale = "zh");
      let msg: string =i18n.locale == "zh" ? "已经切换成中文,请重启小程序" : "已经切换成英文,请重启小程序";
      uni.showToast({ title: msg });
      uni.setStorageSync("locale", i18n.locale);
      const updateManager = uni.getUpdateManager();
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.onUpdateReady(function (res) {
        //  updateManager.applyUpdate();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Bar {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 99999;
  padding-top: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  .back {
    position: absolute;
    left: 30rpx;
    width: 50rpx;
    padding: 10rpx 0;

  }
  .blue {
    color: #1296db;
  }
  .title{
    width: 300rpx;
    position: relative;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
