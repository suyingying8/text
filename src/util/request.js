import axios from 'axios'
import qs from 'qs'

const baseUrl = '/api'

// 响应拦截器
axios.interceptors.response.use(res=>{
    console.log(res);
    return res
})

// 点击添加菜单
export const reqMenuAdd=(from)=>{
    return axios({
        url:baseUrl+'/api/menuadd',
        method:'post',
        data:qs.stringify(from)
    })
}

// 菜单列表
export const reqMenuList=(params)=>{
    return axios({
        url:baseUrl+'/api/menulist',
        method:'get',
        params:params
    })
}

// 菜单删除
export const reqMenuDel=(id)=>{
   return axios({
       url:baseUrl+'/api/menudelete',
       method:'post',
       data:id
   })
}

// 获取一条数据
export const reqMenuOne=(params)=>{
    return axios({
        url:baseUrl+'/api/menuinfo',
        method:'get',
        params:params
    })
}

// 菜单修改
export const reqMenuEdit=(form)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'post',
        data:form
    })
}

///////////////////角色管理///////////////////////////

// 点击添加角色
export const reqRoleAdd=(from)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:qs.stringify(from)
    })
}

// 角色列表
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get',
    })
}

// 角色删除
export const reqRoleDel=(id)=>{
   return axios({
       url:baseUrl+'/api/roledelete',
       method:'post',
       data:id
   })
}

// 获取一条数据
export const reqRoleOne=(params)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:'get',
        params:params
    })
}

// 角色修改
export const reqRoleEdit=(form)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:form
    })
}


///////////////////角色管理///////////////////////////

// 点击添加管理员
export const reqUserAdd=(from)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:'post',
        data:qs.stringify(from)
    })
}

// 管理员列表
export const reqUserList=(params)=>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:'get',
        params:params
    })
}

// 管理员总数（用于计算分页）
export const reqUserCount=()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:'get'
    })
}

// 管理员删除
export const reqUserDel=(uid)=>{
   return axios({
       url:baseUrl+'/api/userdelete',
       method:'post',
       data:uid
   })
}

// 管理员登录
export const reqUserLogin=(data)=>{
    return axios({
        url:baseUrl+'/api/userlogin',
        method:'post',
        data:data
    })
}

// 获取一条数据
export const reqUserOne=(params)=>{
    return axios({
        url:baseUrl+'/api/userinfo',
        method:'get',
        params:params
    })
}

// 管理员修改
export const reqUserEdit=(form)=>{
    return axios({
        url:baseUrl+'/api/useredit',
        method:'post',
        data:form
    })
}


///////////////////商品分类///////////////////////////

// 点击添加商品分类
export const reqClassifyAdd=(form)=>{
    var data = new FormData();
    for(var i in form){
        data.append(i,form[i])
    }
    return axios({
        url:baseUrl+'/api/cateadd',
        method:'post',
        data:data
    })
}

// 商品分类列表
export const reqClassifyList=(params)=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params:params
    })
}

// 商品分类删除
export const reqClassifyDel=(id)=>{
   return axios({
       url:baseUrl+'/api/catedelete',
       method:'post',
       data:id
   })
}

// 获取一条数据
export const reqClassifyOne=(params)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params:params
    })
}

// 商品分类修改
export const reqClassifyEdit=(form)=>{
    var data = new FormData();
    for(var i in form){
        data.append(i,form[i])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:data
    })
}


///////////////////商品规格///////////////////////////

// 点击添加商品规格
export const reqSpecAdd=(form)=>{
    return axios({
        url:baseUrl+'/api/specsadd',
        method:'post',
        data:qs.stringify(form)
    })
}

// 商品规格列表
export const reqSpecList=(params)=>{
    return axios({
        url:baseUrl+'/api/specslist',
        method:'get',
        params:params
    })
}

// 商品规格删除
export const reqSpecDel=(id)=>{
   return axios({
       url:baseUrl+'/api/specsdelete',
       method:'post',
       data:id
   })
}

// 获取一条数据
export const reqSpecOne=(params)=>{
    return axios({
        url:baseUrl+'/api/specsinfo',
        method:'get',
        params:params
    })
}

// 商品规格修改
export const reqSpecEdit=(form)=>{
    return axios({
        url:baseUrl+'/api/specsedit',
        method:'post',
        data:qs.stringify(form)
    })
}


///////////////////商品管理///////////////////////////

// 点击添加商品管理
export const reqGoodAdd=(form)=>{
    var data = new FormData();
    for(var i in form){
        data.append(i,form[i])
    }
    return axios({
        url:baseUrl+'/api/goodsadd',
        method:'post',
        data:data
    })
}

// 商品管理列表
export const reqGoodList=(params)=>{
    return axios({
        url:baseUrl+'/api/goodslist',
        method:'get',
        params:params
    })
}

// 商品管理删除
export const reqGoodDel=(id)=>{
   return axios({
       url:baseUrl+'/api/goodsdelete',
       method:'post',
       data:id
   })
}

// 获取一条数据
export const reqGoodOne=(params)=>{
    return axios({
        url:baseUrl+'/api/goodsinfo',
        method:'get',
        params:params
    })
}

// 商品管理修改
export const reqGoodEdit=(form)=>{
    var data = new FormData();
    for(var i in form){
        data.append(i,form[i])
    }
    return axios({
        url:baseUrl+'/api/goodsedit',
        method:'post',
        data:data
    })
}

// 商品总数
export const reqGoodCount=()=>{
    return axios({
      url:baseUrl+'/api/goodscount',
      method:'get'
    })
    
}


///////////////////会员管理///////////////////////////

// 会员列表
export const reqVipList=()=>{
    return axios({
        url:baseUrl+'/api/memberlist',
        method:'get'
    })
}

// 获取一条数据
export const reqVipOne=(params)=>{
    return axios({
        url:baseUrl+'/api/memberinfo',
        method:'get',
        params:params
    })
}

// 管理员修改
export const reqVipEdit=(form)=>{
    return axios({
        url:baseUrl+'/api/memberedit',
        method:'post',
        data:form
    })
}

