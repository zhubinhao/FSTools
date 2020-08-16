const urlObj:any={
	development:'http://120.24.92.135:9009', //本地
	test:'http://120.24.92.135:9009',//测试
	pro:'http://120.24.92.135:9009', //生产
}


console.log(process.env.NODE_ENV)
export const httpUrl = urlObj[process.env.NODE_ENV]



