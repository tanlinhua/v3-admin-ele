<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="键">
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
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="key" label="键" />
      <el-table-column prop="value" label="值" />
      <el-table-column prop="remarks" label="备注" />
      <el-table-column label="操作" fixed="right" width="140">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEditAccount(row)">编辑</el-button>
          <el-popconfirm title="确定删除吗?" @confirm="handleDelAccount(row.id)">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-model:page="tableData.currentPage"
      v-model:limit="tableData.pageSize"
      :total="tableData.count"
      @pagination="query"
    />
  </div>
</template>

<script setup name="ConfigureParams">
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getParams, updateParams, delParams } from '@/api/configure'
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
  getParams({
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

// 点击编辑
const handleEditAccount = row => {
  ElMessageBox.prompt('', '修改值', {
    inputValue: row.value,
  })
    .then(({ value }) => {
      updateParams({
        id: row.id,
        value,
      })
        .then(() => {
          ElMessage({ message: '修改成功', type: 'success' })
          query()
        })
        .catch(() => {
          //
        })
    })
    .catch(() => {
      //
    })
}

// 点击删除
const handleDelAccount = id => {
  tableData.loading = true
  delParams({
    id,
  })
    .then(() => {
      //
    })
    .catch(() => {
      //
    })
    .finally(() => {
      query()
    })
}

query()
</script>

<style scoped lang="scss"></style>
