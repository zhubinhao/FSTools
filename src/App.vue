<script lang="ts">
    import Vue from 'vue';
    import {http} from './utils/http'
    import { Mutation } from 'vuex-class'

    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
            console.log(1)
            const data = {
                user:'admin',
                pwd:'21232F297A57A5A743894A0E4A801FC3',
            }
            http({
                url:'/JY/GetToken',
                data
            }).then((res:any)=>{
                this.$store.commit("setToken",res.token)
            })
        },
        onShow() {
        },
        onHide() {
        }
    });
</script>

<style>
    /*每个页面公共css */
</style>
