export const chooseData = function(obj:any,str:string='?'):string{
	let arr: Array<any>=[];
	for(const i in obj){
		arr.push(`${i}=${obj[i]}`)
	}
	return `${str}${arr.join("&")}`
}