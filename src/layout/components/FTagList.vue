<template>
    <div class="tagList" :style="{ left: $store.state.asideWidth }">
        <el-tabs v-model="activeTab" type="card" class="demo-tabs" @tab-change="changeTab" @tab-remove="removeTab"
            style="min-width: 100px;">
            <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"
                :closable="item.path != '/'">
            </el-tab-pane>
        </el-tabs>

        <span class="tag-btn ">
            <el-dropdown @command="handleClose">
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <!-- 解决tab标签对应的内容部分遮盖问题 -->
    <div style="height: 40px;"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { setCookie, getCookie } from '~/composables/cookie'

const route = useRoute()
const router = useRouter()
const activeTab = ref(route.path)

const tabList = ref([
    {
        title: '后台管理',
        path: '/'
    }
])

// 添加新标签导航
function addTab(newTab) {
    const Tab = tabList.value.find(t => t.path == newTab.path)
    if (!Tab) {
        tabList.value.push(newTab)
        // 存储
        setCookie("tab-list", tabList.value)
    }
}


// 实现点击菜单添加新标签页
onBeforeRouteUpdate((to, from) => {
    // console.log(to);
    activeTab.value = to.path
    addTab({
        title: to.meta.title,
        path: to.path
    })
})

// 切换标签导航
const changeTab = (t) => {
    // console.log(t);
    activeTab.value = t
    router.push(t)
}

// 初始化标签导航(页面刷新标签任然存在)
function initTab() {
    let tab = getCookie('tab-list')
    if (tab) {
        tabList.value = tab
    }
}
initTab()

// 删除标签导航
const removeTab = (t) => {
    let tabs = tabList.value
    let a = activeTab.value
    if (a == t) {
        tabs.forEach((tab, index) => {
            if (tab.path == t) {
                let nextorlastTab = tabs[index + 1] || tabs[index - 1]
                if (nextorlastTab) {
                    a = nextorlastTab.path
                }
            }
        })
    }

    activeTab.value = a

    // 过滤出tabs中与要删除的路径不同的，并保留
    tabList.value = tabs.filter(tab => tab.path != t)
}

// 关闭标签导航
const handleClose = (c) => {
    // console.log(c);
    if (c == "closeAll") {
        activeTab.value = '/'
        tabList.value = [{
                title: '后台管理',
                path: '/'
        }]
    } else if (c == "closeOther") {
        // 关闭其他，保留后台首页和当前激活标签页
        tabList.value = tabList.value.filter(t=>t.path == '/' || t.path ==activeTab.value)
    }
    setCookie('tab-list', tabList.value)
}


</script>


<style scoped>
.tagList {
    @apply fixed flex items-center bg-gray-100 px-2;
    height: 44px;
    top: 64px;
    right: 0px;
    z-index: 100;
}

.tag-btn {
    @apply ml-auto bg-white rounded flex items-center justify-center px-2;
    height: 32px;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
    border: 0;
}

.el-tabs--card>.el-tabs__header .el-tabs__item {
    border: 0px;
}

:deep(.el-tabs__header) {
    @apply mb-0 mt-2;
    border: 0;
}

:deep(.el-tabs__item) {
    border: 0, !important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;

}

:deep(.el-tabs__nav-next) {
    line-height: 36px;
}

.el-dropdown-link:focus {
    outline: none;
}

.el-tabs__nav-prev {
    line-height: 36px;
}

.el-tabs__nav-next,
.el-tabs__nav-prev {
    cursor: not-allowed;
    @apply text-gray-300
}
</style>