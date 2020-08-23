<script lang="ts">
import Vue from "vue";
import { http } from "@/utils/http";
import { Mutation } from "vuex-class";
import { i18n } from "@/utils/i18n";
import {getOpenIds} from "@/utils/api"

export default Vue.extend({
  mpType: "app",
  onLaunch() {
    let locale = uni.getStorageSync("locale") || "zh";
    i18n.locale = locale;
    this.setBar();
    this.getToken();
  },
  onShow() {},
  onHide() {},
  methods: {
    async getToken() {
      const data = {
        user: "admin",
        pwd: "21232F297A57A5A743894A0E4A801FC3"
      };
      const token = await http({ url: "/JY/GetToken", data }).then((res: any) => res.token);
      this.$store.commit("setToken", token);
      getOpenIds().then(res=>{
        console.log(res)
      })
    },
    setBar() {
      let obj: any = i18n.t("bar");
      [1, 2, 3, 4].map((res, index) => {
        uni.setTabBarItem({
          index,
          text: obj["t" + res]
        });
      });
    }
  }
});
</script>

<style>
/*每个页面公共css */
</style>
