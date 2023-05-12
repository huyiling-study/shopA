
// import store from "~/store"

// // 跟ruleName比对是否有该值，有留下，没有移除
// // 1首先判断是否是数组，不是数组抛出异常
// // 2.和store里的ruleName比对（value是否包含ruleName相同的数组）
// // 3.如果节点存在，并且没有这个权限，就移除此节点
// function hasPermission(value,el=false){
//     if(!Array.isArray(value)){
//         throw new Error(`请设置权限，如v-permission="[]"`)
//     }

//     const hasauth =  value.findIndex(v=>store.state.ruleNames.includes(v)) !=-1

//     if(el&& !hasauth){
//         el.parentNode && el.parentNode.removeChild(el)
//     }
//     return hasauth
// }

// export default{
//     install(app){
//         app.directive('permission',{
//             mounted(el,binding) {
//                 hasPermission(binding.value,el)
//             },
//         })
//     }
// }