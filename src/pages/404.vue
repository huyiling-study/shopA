<template>
    <div class="notfount">
        <el-col :sm="12" :lg="6">
            <el-result icon="warning" title="404 提示" sub-title="你找的页面丢失了~">
                <template #extra>
                    <!-- @click="$router.push('/')"只能在template内使用 -->
                    <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
                </template>
            </el-result>
        </el-col>
    </div>
</template>
<style>
.notfount{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>