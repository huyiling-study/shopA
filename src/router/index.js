import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import Admin from '~/layout/admin.vue'
import GoodsList from '~/pages/goods/list.vue'
import CategoryList from '~/pages/category/list.vue'
import SkusList from '~/pages/skus/list.vue'
import CouponList from '~/pages/coupon/list.vue'
import ImageList from '~/pages/image/list.vue'
import NoticeList from '~/pages/notice/list.vue'
import OrderList from '~/pages/order/list.vue'
import SettingList from '~/pages/setting/list.vue'
import UserList from '~/pages/user/list.vue'
import CommendList from '~/pages/commend/list.vue'


// 定义一些路由
const routes = [{
    path: '/',
    name:"admin",
    component: Admin,
}, {
    path: '/login',
    component: Login,
    meta: {
        title: '登录'
    }
}, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
        title: 'NotFound'
    }
}] 

// 动态路由
const dynamicRoute = [
    {
        path: '/',
        name:'/',
        component: Index,
        meta: {
            title: '后台首页'
        }
    },
    {
        path: '/goods/list',
        name:'/goods/list',
        component: GoodsList,
        meta: {
            title: '商品管理'
        }
    },
    {
        path: '/category/list',
        name: '/category/list',
        component: CategoryList,
        meta: {
            title: '分类管理'
        }
    },
    {
        path: '/skus/list',
        name: '/skus/list',
        component: SkusList,
        meta: {
            title: '规格管理'
        }
    },
    {
        path: '/user/list',
        name: '/user/list',
        component: UserList,
        meta: {
            title: '用户管理'
        }
    },

    {
        path: '/order/list',
        name: '/order/list',
        component: OrderList,
        meta: {
            title: '订单管理'
        }
    },
    {
        path: '/comment/list',
        name: '/comment/list',
        component: CommendList,
        meta: {
            title: '评价管理'
        }
    },
    {
        path: '/image/list',
        name: '/image/list',
        component: ImageList,
        meta: {
            title: '图库管理'
        }
    },
    {
        path: '/notice/list',
        name: '/notice/list',
        component: NoticeList,
        meta: {
            title: '公告管理'
        }
    },
    {
        path: '/setting/base',
        name: '/setting/base',
        component: SettingList,
        meta: {
            title: '配置管理'
        }
    },
    {
        path: '/coupon/list',
        name: '/coupon/list',
        component: CouponList,
        meta: {
            title: '优惠卷管理'
        }
    }
   
]

// 创建路由实例并传递 `routes` 配置
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 动态添加路由的方法
// 菜单是一层一层的，我们不知道有几层，就要用到递归
export function addRoutes(menus) {
    //处理刷新界面丢失问题）
    let hasNewRoutes = false;
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach(e => {
            let item = dynamicRoute.find(o => o.path == e.frontpath)
            if (item && !router.hasRoute(item.path)) {
                //添加嵌套路由
                router.addRoute("admin",item)
                hasNewRoutes = true
            }
            // 判度是否存在子路由(子菜单)
            if (e.child && e.child.length > 0) {
                findAndAddRoutesByMenus(e.child)
            }
        })
    }
    findAndAddRoutesByMenus(menus)

    // console.log(router.getRoutes());
    return hasNewRoutes
}

