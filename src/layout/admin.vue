<template>
    <el-container>
        <el-header>
            <FHeader />
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="$store.state.asideWidth">
                <FMenu />
            </el-aside>
            <!-- 主内容区域 -->
            <el-main>
                <FTagList />

                <!-- 过渡动效:在路径组件上使用转场，并对导航进行动画处理 -->
                <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <!-- keep-alive页面缓存 -->
                        <keep-alive>
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
                
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup >
import FHeader from '~/layout/components/FHeader.vue'
import FMenu from '~/layout/components/FMenu.vue'
import FTagList from '~/layout/components/FTagList.vue'
</script>

<style>
.el-aside {
    transition: all 0.2s;
}

.el-header {
    height: 64px;
}

.fade-enter-from{
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}
.fade-enter-to{
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
.fade-leave-from{
    opacity: 1;
}
.fade-leave-to{
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}
.fade-enter-active,
.fade-leave-active{
    transition: all 0.3s;
}
.fade-enter-active{
    transition-delay: 0.3s;
}
</style>