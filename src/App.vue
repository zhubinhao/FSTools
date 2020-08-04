<script lang="ts">
    import Vue from 'vue';
	import {http} from './utils/http'
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style>
    /*每个页面公共css */
</style>
