import { createStore } from 'vuex'
import { login, getinfo, logout } from '~/api/manager'
import { setToken, removeToken } from '~/composables/auth'


// 创建一个新的 store 实例
// mutations里写同步方法，actions里写异步方法
const store = createStore({
    state() {
        return {
            //用户信息  
            user: {},
            asideWidth: '250px',
            menus:[],
            ruleNames:[]
        }
    },
    // 同步方法
    mutations: {
        // 可以通过调用SET_USERINFO 把用户信息记录到state当中
        SET_USERINFO(state, user) {
            state.user = user
        },
        handleAsideWidth(state) {
            state.asideWidth = state.asideWidth == '250px' ? '64px' : '250px'
        },
        SET_MENUS(state,menus){
            state.menus = menus
        },
        SET_RULENAMES(state,ruleNames){
            state.ruleNames = ruleNames
        }
    },
    // 异步方法
    actions: {
        // 登录
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    setToken(res.token)
                    resolve(res)
                }).catch(err => reject(err));
            })
        },

        // 获取管理员信息和权限菜单
        // 解决页面刷新，管理员数据丢失问题    
        // 名为 getinfo 的异步函数，其作用是从服务器获取管理员信息并将其存储在 Vuex store 中
        // commit 是一个解构出来的 Vuex store 的方法，它用于触发一个名为 SET_USERINFO 的 mutation（即 store 的状态变更）。在 getinfo 函数中，当从服务器获取管理员信息时，将调用 SET_USERINFO mutation 将获取的信息存储在 store 中。最后，该函数返回一个 Promise 对象
        getinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo().then(res => {
                    commit("SET_USERINFO", res)
                    commit("SET_MENUS",res.menus)
                    commit("SET_RULENAMES",res.ruleNames)
                    resolve(res)
                })
                    .catch(err => reject(err))
            })
        },

        // 退出登录
        logout({ commit }) {
            // 移除cookie里的Token
            removeToken()
            // 清除当前用户状态
            commit("SET_USERINFO", {})
        }
    }
})

export default store