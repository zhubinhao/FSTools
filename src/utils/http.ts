import {httpUrl} from './path'
export const http =function(obj:any){
	console.log(httpUrl+obj.url)
	return new Promise((resolve,reject) => uni.request({
			url: httpUrl+obj.url, 
			data: obj.data||{},
			method:obj.method||"GET",
			header: {
				"content-type": "application/json",
			},
			success: (res:any)=>{
			  if(res.data.flag==1||res.data.flag===undefined){
				  resolve(res.data) 
			  }else{ 
				  reject(res.data)
			  }
			} 
		})
	)
}