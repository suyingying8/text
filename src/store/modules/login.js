
// 初始数据
const state ={
    // 登录请求回来到数据
    list:sessionStorage.getItem('list')?JSON.parse(sessionStorage.getItem('list')):{}

}
// 同步操作
const mutations ={
    changeList(state,obj){
        state.list=obj
        // 将请求回来的数据存储到sessionstorage中
        sessionStorage.setItem('list',JSON.stringify(obj))
    }

}
// 异步操作
const actions ={
    requsetUserLogin(context,obj){
          context.commit('changeList',obj)   
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