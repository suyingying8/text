import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import classify from './modules/classify'
import spec from './modules/spec'
import user from './modules/user'
import good from './modules/good'
import vip from './modules/vip'
import login from './modules/login'
export default new Vuex.Store({
    modules:{
        menu,
        role,
        classify,
        spec,
        user,
        good,
        vip,
        login
    }
})