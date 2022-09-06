<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="权限名称">
        <el-input
          v-model="tableData.search"
          placeholder="支持模糊查询"
          clearable
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="query">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="tableData.loading" :data="tableData.list" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="title" label="name" />
      <el-table-column prop="pid" label="pid" />
      <el-table-column prop="uri" label="uri" />
      <el-table-column prop="method" label="method" />
      <el-table-column prop="level" label="level" />
    </el-table>

    <Pagination
      v-model:page="tableData.currentPage"
      v-model:limit="tableData.pageSize"
      :total="tableData.count"
      @pagination="query"
    />
  </div>
</template>

<script setup name="PermissionPer">
import { Search } from '@element-plus/icons-vue'
import { getPer } from '@/api/permission'
import Pagination from '@/components/Pagination/index.vue'

// 列表
const tableData = reactive({
  loading: true,
  search: '',
  count: 0,
  list: [],
  currentPage: 1,
  pageSize: 15,
})

const query = () => {
  tableData.loading = true
  getPer({
    page: tableData.currentPage,
    limit: tableData.pageSize,
    search: tableData.search,
  })
    .then(data => {
      tableData.count = data.count
      tableData.list = data.data
      tableData.loading = false
    })
    .catch(() => {
      tableData.loading = false
    })
}

query()
</script>

<style scoped lang="scss"></style>
