import {reqUserList,reqUserCount} from '../../util/request'
// 初始数据
const state ={
    list:[],
    page:1,//当前的页码数
    size:2,//每页展示的数据
    total:0//请求回来的总数据

}
// 同步操作
const mutations ={
    changeList(state,arr){
        state.list=arr
    },
    // 总数据
    changeTotal(state,num){
        state.total=num
    },
    changePage(state,page){
        state.page=page
    }

}
// 异步操作
const actions ={
    requstUserList(context){
        reqUserList({
            page:context.state.page,
            size:context.state.size
        }).then(res=>{
          context.commit('changeList',res.data.list)  
        })  
    },
    //请求回来的总数
    requstUserCount(context,res){
        reqUserCount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    // 请求回来的页数
    userPage(context,page){
        context.commit('changePage',page)
        // 目的是为了根据page的不同发送axios请求，那么这个请求的数据在mutations中，那么mutations不能修改actions，所以需要用下面方法
        context.dispatch('requstUserList')
    }


}
// 
const getters ={
   list(state){
       return state.list
   },
   total(state){
       return state.total
   },
   page(state){
       return state.page
   }

}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}