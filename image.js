import axios from "~/axios"

// 指定分类下的图库列表
export function imageClassList(id,page){
    return axios.get(`/admin/image_class/${id}/image/${page}`)
}

// 删除
export function deleteImage(ids){
    return axios.post('/admin/image/delete_all',{ids})
}

// 修改图片名称
export function updataImage(id,name){
    return axios.post('/admin/image/'+id,{name})
}

export const uploadImageAction = "/api/admin/image/upload"