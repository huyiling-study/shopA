import { router, addRoutes } from "~/router";
import { getToken } from "~/composables/auth";
import { toast, showLoading, hideLoading } from '~/composables/util'
import store from '~/store';


// 防止重复性的加载getinfo
let hasGetInfo = false

// 全局前置守卫
// from:从哪个路径来  to:到哪个路径去
router.beforeEach(async (to, from, next) => {
    // console.log(to,from);
    showLoading()
    const token = getToken()
    // 没有登陆
    if (!token && to.path != "/login") {
        toast("请先登录", "error")
        return next({ path: '/login' });
    }
    // 防止重复登录
    if (token && to.path == "/login") {
        toast("请勿重复登录", "error")
        return next({ path: from.path ? from.path : '/' });
    }

    // 如果用户登录成功，自获取用户信息，并存储在vuex当中
    let hasNewRoutes = false;
    if (token && !hasGetInfo) {
        let {menus} = await store.dispatch("getinfo")
        hasGetInfo = true
        // 动态添加路由
        hasNewRoutes = addRoutes(menus)
    }

    // 设置页面动态标题
    // console.log(to.meta.title);
    const title = to.meta.title ? to.meta.title : '';
    document.title = title + '-胡伊玲蟹黄堡后台管理系统';

    // 当有next参数时，要有next()才能放行，页面才能显示
    hasNewRoutes? next(to.fullPath):next()
})

// 全局后置钩子
router.afterEach((to, from) => hideLoading())