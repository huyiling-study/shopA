import { logout, updatepassword } from '~/api/manager.js'
import { showModal } from '~/composables/util'
import { toast } from '~/composables/util'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, reactive } from 'vue'


export function useRepassword() {
    const store = useStore()
    const router = useRouter()

    // 表单部分
    const formDrawerRef = ref(null)

    const formRef = ref(null)

    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: ''
    })


    const rules = reactive({
        oldpassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        repassword: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' }
        ],
    })

    // 提交
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false;
            }
            formDrawerRef.value.showLoading()

            updatepassword(form)
                .then(res => {
                    toast("修改密码成功，请重新登录！")
                    store.dispatch('logout')
                    router.push('/login')
                }).finally(() => {
                    console.log(1111)
                    formDrawerRef.value.hideLoading()
                })
        })
    }

    return {
        formRef,
        form,
        rules,
        onSubmit,
        formDrawerRef
    }
}

export function useLogout() {
    const store = useStore()
    const router = useRouter()
    // 退出登录
    function handlelogout() {
        showModal("是否要退出登录？").then(res => {
            // console.log("退出登录");
            logout().finally(() => {
                store.dispatch("logout")
                // 跳转回登录界面
                router.push("/login")
                // 提示退出登录成功
                toast("退出登录成功")
            });
        })
    }
    return {
        handlelogout
    }
}