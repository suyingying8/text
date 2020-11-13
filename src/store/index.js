import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import classify from './modules/classify'
import spec from './modules/spec'
import user from './modules/user'
export default new Vuex.Store({
    modules:{
        menu,
        role,
        classify,
        spec,
        user
    }
})