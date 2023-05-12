import { ElNotification, ElMessageBox } from 'element-plus'
import NProgress from 'nprogress'

export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        during: 3000,
        dangerouslyUseHTMLString
    })
}

export function showModal(content = "提示内容", title = "", type = "warning") {
    // 这里必须要return返回了一个 Promise 来处理后续响应
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type,
        }
    )
}

export function showLoading() {
    NProgress.start();
}

export function hideLoading() {
    NProgress.done();
}