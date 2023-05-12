<template>
    <el-card shadow="hover" class="mt-5">
        <template #header>
            <div class="flex justify-between items-center">
                <span class="text-xs">统计数据</span>
                <div>
                    <el-check-tag v-for="(item, index) in options" :key="index" style="margin-right: 8px" class="text-xs"
                        :checked="current == item.value" @click="changeValue(item.value)">
                        {{ item.text }}
                    </el-check-tag>
                </div>
            </div>
        </template>
        <!-- 图表 -->
        <div ref="el" id="chart" style="width: 100%;height:300px;"></div>
    </el-card>
</template>

<script setup>
import { ref, onMounted,onBeforeUnmount} from 'vue'
import * as echarts from 'echarts';
import { getStatistics3 } from '~/api/index'
import { useResizeObserver } from '@vueuse/core'

const current = ref('week')

const options = [
    {
        text: '近24小时',
        value: 'hour'
    },
    {
        text: '近一周',
        value: 'week'
    },
    {
        text: '近一个月',
        value: 'month'
    }
]

// 切换选中标签
const changeValue = (type) => {
    // console.log(type);
    current.value = type

    getData()
}

var myChart = null
onMounted(() => {
    var chartDom = document.getElementById('chart');
    // echarts图标实例对象
    myChart = echarts.init(chartDom);

    getData()
})

onBeforeUnmount(()=>{
    if(myChart) echarts.dispose(myChart)
})

function getData() {

    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };

    myChart.showLoading();
    getStatistics3(current.value)
        .then(res => {
            // console.log(res)
            option.xAxis.data = res.x
            option.series[0].data = res.y

            myChart.setOption(option)
        })
        .finally(() => { myChart.hideLoading(); })
}

// 响应式图标
const el = ref(null)
useResizeObserver(el, (entries) =>myChart.resize())



</script>

<style scoped>
#chart {
    width: 100%;
    height: 300px;
}
</style>