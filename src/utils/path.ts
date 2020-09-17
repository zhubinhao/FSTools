const urlObj:any={
	development:'http://120.24.92.135:9009', //本地
	test:'http://app.juncoax.com',//测试
	pro:'https://app.juncoax.com', //生产
}

const imgObj:any={
	development:'http://120.24.92.135:9009/firewebv/Image/', //本地
	test:'http://app.juncoax.com/firewebv/Image/',//测试
	pro:'https://app.juncoax.com/firewebv/Image/', //生产
}


console.log(process.env.NODE_ENV)
export const httpUrl = urlObj[process.env.NODE_ENV]
export const imgUrl = imgObj[process.env.NODE_ENV]


