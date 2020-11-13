<template>
    <view class="Details">
        <bar :title="title" />
        <view :style="{paddingTop:barHeight+'px'}">
            <image :src='imgsrc' mode="widthFix" class="img" @click="preView(imgsrc)"></image>
            <div class="download"  v-if="url">
                <image src="~@/static/img/pdf.jpg" @click="openFile(url,prod_file)"></image>
                <view @click="openFile(url,prod_file)">{{download}}</view>
            </div>
        </view>

        <view class="sc">
            <text @click="shouchang">{{msg}}</text>
            <userinfor />
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import bar from '@/component/bar.vue';
import { State } from 'vuex-class';
import { http } from '@/utils/http';
import { i18n } from '@/utils/i18n';
import userinfor from '@/component/userinfor.vue';

@Component({
    name: 'Details',
    components: { bar, userinfor },
})
export default class Details extends Vue {
    @Provide() title: any = i18n.t('bar.t5');
    @Provide() download: any = i18n.t('bar.download');
    @Provide() imgsrc: string = '';
    @Provide() url: string = '';
    @Provide() prod_file: string = '';

    @Provide() id: string = '';
    @Provide() msg: string = '收藏';

    @State barHeight!: number;

    onLoad(option: any) {
        console.log(option)
        this.imgsrc = option.img;
        this.id = option.id;
        this.url = option.url;
        this.prod_file = option.prod_file;

        this.msg = option.sc ? '已收藏' : '收藏';
    }
    shouchang() {
        const wx = uni.getStorageSync('openid');
        if (this.msg == '已收藏') {
            http({
                url: '/JY/Product_CollectionDel',
                data: { wx, product: this.id },
            }).then(() => {
                this.msg = '收藏';
            });
        } else {
            http({
                url: '/JY/Product_CollectionADD',
                data: { wx, product: this.id },
            }).then(() => {
                this.msg = '已收藏';
            });
        }
    }
    preView(url: string): void {
        uni.previewImage({
            urls: [url],
        });
    }
    openFile(path: string, type: string) {
        let ty: any = type.split('.')[1].toLowerCase();
        let imageArr = ['bmp', 'jpg', 'jpeg', 'png', 'gif'];
        if (imageArr.includes(ty)) {
            wx.previewImage({
                urls: [path],
            });
            return;
        }
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
    .sc {
        position: absolute;
        right: 30rpx;
        bottom: 100rpx;
        z-index: 8;
        font-size: 26rpx;
        width: 90rpx;
        height: 90rpx;
        text-align: center;
        line-height: 90rpx;
        border-radius: 50%;
        box-shadow: 1px 1px 5px gray;
        
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
    .download {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20rpx;
            image {
                width: 40rpx;
                height: 40rpx;
                margin-right: 20rpx;
            }
        }
    .img {
        width: 750rpx;
    }
}
</style>
