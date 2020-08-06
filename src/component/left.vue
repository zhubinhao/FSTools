<template>
  <view class="Left" v-if="show" @click.stop="close()">
      <view class="content" @click.stop="pro"><view>
     
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';

@Component({
    name: 'Left',
    components: {},
})
export default class Left extends Vue {
    @Provide() show:boolean = false;

    open():void{
        this.show = true
    }
    close():void{
        this.show = false
    }
    choose():void{
        this.$emit('setData','1')
        this.close()
    }
    pro():boolean{
        return false
    }
}
</script>

<style lang="scss" scoped>
.Left{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.4);
  .content{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 550rpx;
      z-index: 10;
      background: #ffffff;
  }

}
</style>
