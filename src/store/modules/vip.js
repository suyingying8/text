import {reqVipList} from '../../util/request'
// 初始数据
const state ={
    list:[]

}
// 同步操作
const mutations ={
    changeList(state,arr){
        state.list=arr
    }

}
// 异步操作
const actions ={
    reqVipList(context){
        reqVipList({istree:true}).then(res=>{
          context.commit('changeList',res.data.list)  
        })  
    }

}
// 
const getters ={
   list(state){
       return state.list
   }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}