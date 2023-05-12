<template>
    <div class="f-header">
        <span class="logo">
            <el-icon class="mr-2"><eleme-filled /></el-icon>
            蟹黄堡后台管理体系
        </span>
        <el-tooltip effect="dark" content="折叠" placement="bottom">
            <el-icon class="ico-btn" @click="$store.commit('handleAsideWidth')">
                <fold v-if="$store.state.asideWidth == '250px'" />
                <Expand v-else />
            </el-icon>
        </el-tooltip>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="ico-btn" @click="headleRefresh">
                <refresh />
            </el-icon>
        </el-tooltip>
        <div class="ml-auto flex items-center">
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="ico-btn" @click="toggle">
                    <!-- 全屏和非全屏状态下的图标切换 -->
                    <full-screen v-if=!isFullscreen />
                    <aim v-else />
                </el-icon>
            </el-tooltip>
            <el-dropdown class="dropdown" @command="handleCommend">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-3" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="repassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <!-- 调用子组件：通过ref属性拿到节点上暴露的子组件方法 -->
    <FormDrawer ref="formDrawerRef" @submit="onSubmit" title="修改密码" destroyOnClose="true">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input type="password" v-model="form.oldpassword" placeholder="请输入旧密码">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password>
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input type="password" v-model="form.repassword" placeholder="再次输入新密码" show-password>
                </el-input>
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>

<script setup>
import FormDrawer from '~/components/FormDrawer.vue'
import { useRepassword, useLogout } from '~/composables/useManager'
import { useFullscreen } from '@vueuse/core'

// toggle 切换全屏
const { isFullscreen, toggle } = useFullscreen()

// 组合式API简化，封装代码
const {
    formRef,
    form,
    rules,
    onSubmit,
    formDrawerRef
} = useRepassword()
const {
    handlelogout
} = useLogout() 


// 下拉菜单用@commend触发回调，用commend派发到子菜单
const handleCommend = (c) => {
    switch (c) {
        case "logout":
            handlelogout()
            break;
        case "repassword":
            formDrawerRef.value.open()
            break;
    }
}

// 刷新
const headleRefresh = () => location.reload()





</script>

<style>
.f-header {
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
    z-index: 100;
}

.logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
}

.ico-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.ico-btn:hover {
    @apply bg-indigo-600
}

.f-header .dropdown {
    height: 64px;
    cursor: 0;
    @apply flex justify-center items-center mx-5;
}

.el-tooltip__trigger:focus{
    outline: none;
}
</style>