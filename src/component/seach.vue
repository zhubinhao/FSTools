<template>
  <view class="Seach">
    <view class="li">
      <text>{{z18n.t1}}:</text>
      <input type="digit" v-model="ghz" :placeholder="z18n.msg2" />
    </view>

    <view class="li">
      <text>{{z18n.t2}}:</text>
      <input type="digit" v-model="mm" :placeholder="z18n.msg2" />
    </view>
    <view class="li">
      <text>{{z18n.t3}}:</text>
      <input type="digit" v-model="db" :placeholder="z18n.msg2" />
    </view>
    <view class="li">
      <text>{{z18n.t4}}:</text>
      <input type="digit" v-model="xs" :placeholder="z18n.msg2" />
    </view>
    <view class="seach" @click="seach">{{z18n.t5}}</view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from "vue-property-decorator";
import { i18n } from "@/utils/i18n";
import { http } from "@/utils/http";
import { imgUrl } from "@/utils/path";

@Component({
  name: "Seach",
  components: {}
})
export default class Seach extends Vue {
  @Provide() z18n: any = i18n.t("seach");
  @Provide() toast: any = i18n.t("toast");

  @Provide() ghz: string = "";
  @Provide() mm: string = "";
  @Provide() db: string = "";
  @Provide() xs: string = "";

   nativeTo(item:any){
     uni.navigateTo({
       url:`/pages/index/details?img=${item.prod_image}&id=${item.prod_id}&sc=${item.coll_id||""}`
     })
    }
  async seach() {
    const data = {
      ghz: this.ghz,
      mm: this.mm,
      db: this.db,
      xs: this.xs,
      wx:uni.getStorageSync("openid"),
    };
    console.log(data)
    if(data.db&&!data.ghz){
      console.log(1111)
      wx.showToast({
        title: this.toast,
        icon:"none"
      })
      return
    }
    const info = await http({ url: "/JY/Product_Find", data }).then(
      (res:any) => res.data
    );
    info.map((res: any) => {
      res.prod_image = imgUrl + res.prod_image;
    });
    uni.navigateTo({
        url:`/pages/project/list?info=${JSON.stringify(info)}`
    })
  }
}
</script>

<style lang="scss" scoped>
.Seach {
  .li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100rpx;
    font-size: 30rpx;
    text {
      width: 300rpx;
      word-break: break-all;
    }
    input {
      width: 260rpx;
      border-bottom: 1px solid gray;
    }
  }
  .seach {
    font-size: 36rpx;
    text-align: center;
    margin-top: 30rpx;
    color: #1296db;
  }

}
</style>
