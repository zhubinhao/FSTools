
// x 为底 y 的对数（即logx y）：
export const getBaseLog = function(y:number,x:number=10){
	return Math.log(y) / Math.log(x);
}