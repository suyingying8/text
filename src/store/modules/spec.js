import {reqSpecList} from '../../util/request'
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
    requstSpecList(context){
        reqSpecList({
            page:1,
            size:5
        }).then(res=>{
            let arr = res.data.list
            arr.forEach(item=>{
                item.attrs = JSON.parse(item.attrs)
              })
          context.commit('changeList',arr)  
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