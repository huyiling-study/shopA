<template>
    <div>
        {{ d.num.toFixed(0) }}
    </div>
</template>

<script setup>
// 引入数字滚动效果动画库
import gsap from 'gsap';
import {reactive,watch} from 'vue'

const props = defineProps({
    value:{
        type: Number,
        default:0
    }
})

const d = reactive({
    num:0
})

function AnimatedToValue(){
    gsap.to(d,{
        durations:0.5,
        num:props.value
    })
}
AnimatedToValue()

// value值改变，重新加载动画
watch(()=>props.value,()=>{
    AnimatedToValue()   
})
</script>