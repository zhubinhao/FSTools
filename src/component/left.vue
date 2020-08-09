<template>
  <view class="Left" v-if="show" @click.stop="close">
      <view class="content" @click.stop="pro">
          <block v-for="(item,key) in z18n" :key="key">
            <view class="list" @click="choose(key,item)" :class="{active:key===active}">{{item}}</view>
          </block>
      </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import {i18n} from '@/utils/i18n'

@Component({
    name: 'Left',
    components: {},
})
export default class Left extends Vue {
    @Provide() show:boolean = false;
    @Provide() z18n:any = i18n.t('left')
    @Provide() active:string = 't1'

    open():void{
        this.show = true
    }
    close():void{
        this.show = false
    }
    choose(key:string,title:string):void{
        this.active = key;
        this.$emit('setData',{ key, title })
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
  background: rgba(0, 0, 0, 0.1);
  .content{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 550rpx;
      z-index: 10;
      background: #ffffff;
      font-size: 32rpx;
      .list{
          height: 80rpx;
          line-height: 80rpx;
          border-bottom: 1px solid #f6f6f6;
          padding: 0 30rpx;
      }
      .active{
          background: #f6f6f6
      }
  }

}
</style>
