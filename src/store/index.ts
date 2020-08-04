import Vue from 'vue'
import Vuex, { GetterTree, ActionTree, MutationTree }  from 'vuex'
import main from './modules/main'
import {http} from '../utils/http'

Vue.use(Vuex)

const state: any = {
	openid:''
}; 
const getters: GetterTree<any, any> = {
  
}
const mutations: MutationTree<any> = {
	setOpenID(state:any,openid:string){
		state.openid = openid
	}
}; 
const actions: ActionTree<any, any> = {
	// async unifiedOrder({commit},data:any){
	// 	const requery = await http({url:'/pay/unifiedOrder',data,method:'POST'}).then((res:any)=>res)
	// }
	
};
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {
		main
	}
})
