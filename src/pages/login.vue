<template>
    <el-row style="min-height: 100vh;" class="login-container">
        <!-- 左 -->
        <!-- :lg="16" 响应式布局，只有在屏幕大于1200才显示占16的布局-->
        <el-col :lg="16" class="left">
            <div>
                <div>欢迎光临</div>
                <div class="">vue3+vite实战商城后台开发系统</div>
            </div>
        </el-col>
        <!-- 右  flex-col-->
        <el-col :lg="8" class="right">
            <h1 class="title">欢迎回来</h1>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="formwith">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button round class="formwith" type="primary" @click="onSubmit" :loading="loading">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<!-- setup语法糖 每次组件实例被创建时候执行 -->
<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { toast } from '~/composables/util'

import { useStore } from 'vuex'

const store = useStore()

import { useRouter } from 'vue-router'

const router = useRouter()


const loading = ref(false)

// 拿到表单节点(用于处理表单验证)
const formRef = ref(null)

// 定义表单属性
const form = reactive({
    username: '',
    password: ''
})

// 定义表单验证规则
// 1.表单验证规则rules的key必须和表单form的属性一致，必须有prop
// 2.trigger: 'blur'在表单失去焦点时触发
const rules = reactive({
    username: [
        { required: true, message: '必须填写用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '必须填写密码', trigger: 'blur' }
    ],
})

// 提交
const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false;
        }
        loading.value = true


        store.dispatch("login", form).then(res => {
            toast("登录成功")
            router.push('/')
        }).finally(() => {
            loading.value = false
        })

        // login(form.username, form.password)
        //     .then(res => {
        //         // console.log(res);

        //         toast("登录成功")
        //         // 存储用户token
        //         setToken(res.token)

        //         // 获取管理员信息和权限菜单信息
        //         getinfo().then(res2 => {
        //             // 储存用户相关信息
        //             store.commit('SET_USERINFO',res2)
        //             // console.log(res2);
        //         })

        //         // 跳转到后台
        //         router.push('/')
        //     })
        //     .finally(() => {
        //         loading.value = false
        //     })

    })
}

// 键盘回车登录

function onKeyup(e) {
    if(e.key == "Enter") onSubmit()
}


// 添加键盘监听
onMounted(() => {
    document.addEventListener('keyup', onKeyup)
}),
// 移除键盘监听
onUnmounted(() => {
    document.removeEventListener('keyup', onKeyup)
})




</script>


<style scoped>
.login-container {
    @apply bg-indigo-500;
}

.login-container .left,
.right {
    @apply flex items-center justify-center;
}

.left>div>div:first-child {
    @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
    @apply text-gray-50;
}

.right {
    @apply flex-col bg-light-50;
}

.right .title {
    @apply font-bold text-3xl text-gray-800;
}

.right>div {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.line {
    @apply h-[1px] w-16 bg-gray-200;
}

.formwith {
    @apply w-[250px];
}
</style>