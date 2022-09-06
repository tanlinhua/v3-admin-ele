<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="用户名">
        <el-input
          v-model="tableData.name"
          placeholder="支持模糊查询"
          clearable
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item label="操作">
        <el-input
          v-model="tableData.title"
          placeholder="支持模糊查询"
          clearable
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item label="IP">
        <el-input
          v-model="tableData.ip"
          placeholder="支持模糊查询"
          clearable
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="tableData.datetime"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          clearable
          style="width: 380px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="query">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="tableData.loading" :data="tableData.list" border style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column prop="title" label="操作" show-overflow-tooltip />
      <el-table-column prop="body" label="参数" show-overflow-tooltip />
      <el-table-column prop="uri" label="接口" />
      <el-table-column prop="ip" label="IP" />
      <el-table-column prop="created_at" label="时间" />
    </el-table>

    <Pagination
      v-model:page="tableData.currentPage"
      v-model:limit="tableData.pageSize"
      :total="tableData.count"
      @pagination="query"
    />
  </div>
</template>

<script setup name="ConfigureLog">
import { Search } from '@element-plus/icons-vue'
import { getLog } from '@/api/configure'
import { parseTime } from '@/utils/commonUtil'
import Pagination from '@/components/Pagination/index.vue'

// 列表
const tableData = reactive({
  loading: true,
  name: '',
  title: '',
  ip: '',
  datetime: null,
  count: 0,
  list: [],
  currentPage: 1,
  pageSize: 15,
})

const query = () => {
  tableData.loading = true
  getLog({
    page: tableData.currentPage,
    limit: tableData.pageSize,
    name: tableData.name,
    title: tableData.title,
    ip: tableData.ip,
    t1: tableData.datetime ? parseTime(tableData.datetime[0]) : '',
    t2: tableData.datetime ? parseTime(tableData.datetime[1]) : '',
  })
    .then(data => {
      tableData.count = data.count
      tableData.list = data.data ? data.data : []
      tableData.loading = false
    })
    .catch(() => {
      tableData.loading = false
    })
}

query()
</script>

<style scoped lang="scss"></style>
