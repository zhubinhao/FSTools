const urlObj:any={
	development:'https://zxbx-applet-test.li-an.cn', //本地
	test:'https://zxbx-applet-test.li-an.cn',//测试
	pro:'https://zxbx-applet.li-an.cn', //生产
}
// 1v1
const ptahObjv1:any={
	development:'https://consult-h5-dev.shenlanbao.com', //本地
	test:'https://consult-release.shenlanbao.com',//测试
	pro:'https://consult.shenlanbao.com', //生产
}
// 神策
const sensorsObj:any={
	development:'https://shence-api.shenlanbao.com/sa?project=default', //本地
	test:'https://shence-api.shenlanbao.com/sa?project=default',//测试
	pro:'https://shence-api.shenlanbao.com/sa?project=production', //生产
}

console.log(process.env.NODE_ENV)
export const httpUrl = urlObj[process.env.NODE_ENV]
export const pathUrlv1 = ptahObjv1[process.env.NODE_ENV]
export const sensorsUrl = sensorsObj[process.env.NODE_ENV]



