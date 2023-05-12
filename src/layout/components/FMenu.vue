<template>
    <!-- :style == 收起div -->
    <div class="f-menu">
        <el-menu  class="border-0" @select="handleSelect" 
        :style="{width:$store.state.asideWidth}" 
        unique-opened 
        :collapse ="isCollapse" 
        :collapse-transition="true"
        :default-active="defaultActive">
            <template v-for="(item, index) in asideMenus" :key="index">
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>

                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex' 
import {computed,ref}  from 'vue'

const router = useRouter()
const store = useStore()
const route = useRoute()

// 菜单选中和路由关联
const defaultActive = ref(route.path)

// 水平折叠收起菜单
const isCollapse = computed(()=>!(store.state.asideWidth == '250px'))


const asideMenus = computed(()=>store.state.menus)

const handleSelect =(e)=>{
    router.push(e)
}
</script>

<style scoped>
.f-menu {
    transition: all 0.2s;
    top: 64px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    @apply bg-light-50 fixed shadow-md;
}

.f-menu::-webkit-scrollbar{
    width: 0;
}
</style>