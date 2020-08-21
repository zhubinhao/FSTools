<script lang="ts">
import Vue from "vue";
import { http } from "./utils/http";
import { Mutation } from "vuex-class";
import { i18n } from "@/utils/i18n";

export default Vue.extend({
  mpType: "app",
  onLaunch() {
    let locale = uni.getStorageSync("locale")|| "zh";
    i18n.locale = locale ;
    this.setBar();
    const data = {
      user: "admin",
      pwd: "21232F297A57A5A743894A0E4A801FC3"
    };
    http({
      url: "/JY/GetToken",
      data
    }).then((res: any) => {
      this.$store.commit("setToken", res.token);
    });

  },
  onShow() {},
  onHide() {},
  methods: {
    setBar() {
      let obj: any = i18n.t("bar");
      uni.setTabBarItem({
        index: 0,
        text: obj.t1
      });
      uni.setTabBarItem({
        index: 1,
        text: obj.t2
      });
      uni.setTabBarItem({
        index: 2,
        text: obj.t3
      });
      uni.setTabBarItem({
        index: 3,
        text: obj.t4
      });
    }
  }
});
</script>

<style>
/*每个页面公共css */
</style>
