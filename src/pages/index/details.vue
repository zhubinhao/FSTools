<template>
    <view class="Details">
        <bar :title="title" />

        <scroll-view scroll-x class='header' :scroll-into-view="`id${current}`" :style="{top:barHeight+'px'}">
            <view>
                <block v-for="(item,index) in listData" :key="item.prod_id">
                    <text :class='{active:current===index}' :id="`id${index-2}`" @click="changeBar(index)">{{item.prod_code}}</text>
                </block>
            </view>
        </scroll-view>
        <swiper :style='{height:screenHeight}' :current="current" @change="changeType">
            <swiper-item v-for="item in listData" :key="item.prod_id">
                <scroll-view scroll-y :style='{height:screenHeight,top:barHeight+"px"}' class="box">
                    <image :src='item.prod_image' mode="widthFix" class="img" @click="preView(item.prod_image)"></image>
                    <div class="download" v-if="isuser&&item.url">
                        <image src="~@/static/img/pdf.jpg" ></image>
                        <view @click="openFile(item.url,item.prod_file)" v-if="isuser&&item.url">{{download}}</view>
                    </div>
                    <div class="download" wx:if="!isuser">
                        <image src="~@/static/img/pdf.jpg" ></image>
                        <view @click="native" >{{download}}</view>
                    </div>

                    <view style="height:160rpx"></view>
                    <view class="sc">
                        <text @click="shouchang(item)" v-if="isuser">{{item.coll_id?"已收藏":"收藏"}}</text>
                        <text @click="native" v-else>收藏</text>
                    </view>
                </scroll-view>

            </swiper-item>

        </swiper>

    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import bar from '@/component/bar.vue';
import { State } from 'vuex-class';
import { http } from '@/utils/http';
import { imgUrl } from '@/utils/path';
import { i18n } from '@/utils/i18n';

@Component({
    name: 'Details',
    components: { bar },
})
export default class Details extends Vue {
    @Provide() token: string = uni.getStorageSync('token');
    @Provide() screenHeight: string = '';
    @Provide() listData: Array<any> = [];
    @Provide() current: number = 0;
    @Provide() title: any = i18n.t('bar.t5');
    @Provide() msg: string = '收藏';
    @Provide() download: any = i18n.t('bar.download');
    @Provide() isuser: any = uni.getStorageSync('isuser');

    @State barHeight!: number;

    onLoad(option: any) {
        this.screenHeight =
            (uni.getSystemInfoSync().windowHeight || 655) - 10 + 'px';
        this.getData(option);
    }
    shouchang(item: any) {
        const wx = uni.getStorageSync('openid');
        if (item.coll_id) {
            http({
                url: '/JY/Product_CollectionDel',
                data: { wx, product: item.prod_id },
            }).then(() => {
                item.coll_id = null;
            });
        } else {
            http({
                url: '/JY/Product_CollectionADD',
                data: { wx, product: item.prod_id },
            }).then(() => {
                item.coll_id = 111;
            });
        }
    }
    changeType(e: any): void {
        const { current } = e.detail;
        this.current = current;
        this.setHistory(this.listData[current]);
    }
    changeBar(index: number): void {
        this.current = index;
        this.setHistory(this.listData[index]);
    }
    preView(url: string): void {
        uni.previewImage({
            urls: [url],
        });
    }
    native() {
        uni.navigateTo({
            url: '/pages/my/login',
        });
    }
    async getData(option: any) {
        const data = {
            sty_id: option.id,
            wx: uni.getStorageSync('openid'),
        };
        let require: Array<any> = await http({
            url: '/JY/Product_Query',
            data,
        }).then((res: any) => res.data);
        require.map((res: any) => {
            res.prod_image = imgUrl + res.prod_image;
        });
        this.listData = require;
        this.setHistory(this.listData[0]);
    }
    async setHistory(obj: any) {
        this.msg = obj.coll_id ? '已收藏' : '收藏';
        const data = {
            product: obj.prod_id,
            wx: uni.getStorageSync('openid'),
        };
        await http({
            url: '/JY/Product_LogInfo',
            data,
        });
    }
    openFile(path: string, type: string) {
        let ty: string = type.split('.')[1].toLowerCase();
        let imageArr = ['bmp', 'jpg', 'jpeg', 'png', 'gif'];
        if (imageArr.includes(ty)) {
            wx.previewImage({
                urls: [path],
            });
            return;
        }
        console.log(ty);
        wx.showLoading({
            title: '加载中...',
        });
        wx.downloadFile({
            url: path,
            success: function (res) {
                var filePath = res.tempFilePath;
                wx.openDocument({
                    filePath: filePath,
                    fileType: ty,
                    success: function (res) {
                        wx.hideLoading();
                    },
                    fail: function (r) {
                        wx.hideLoading();
                        wx.showToast({
                            title: '暂时不支持打开该类型文件',
                            duration: 2000,
                        });
                    },
                });
            },
        });
    }
}
</script>

<style lang="scss" scope>
.Details {
    .header {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 60rpx;
        z-index: 1;
        background: white;
        font-size: 30rpx;
        width: 750rpx;
        border-bottom: 1px solid #f6f6ff;
        view {
            padding: 0 30rpx;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        text {
            margin-right: 30rpx;
            line-height: 58rpx;
        }
        .active {
            color: #4379fe;
            border-bottom: 1px solid #4379fe;
        }
    }
    .download{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20rpx;
        image{
            width: 40rpx;
            height: 40rpx;
            margin-right: 20rpx;
        }
    }
    .box {
        box-sizing: border-box;
        padding-top: 60rpx;
        position: relative;
    }
    .img {
        width: 750rpx;
    }
    .sc {
        position: fixed;
        right: 30rpx;
        bottom: 60rpx;
        z-index: 8;
        font-size: 26rpx;
        width: 90rpx;
        height: 90rpx;
        text-align: center;
        line-height: 90rpx;
        border-radius: 50%;
        box-shadow: 1px 1px 5px gray;
        background: white;
        text {
            position: absolute;
            right: 0rpx;
            bottom: 0rpx;
            z-index: 8;
            font-size: 26rpx;
            width: 90rpx;
            height: 90rpx;
            z-index: 1;
        }
    }
}
</style>
