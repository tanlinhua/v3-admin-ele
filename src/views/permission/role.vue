<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="角色名称">
        <el-input
          v-model="tableData.search"
          placeholder="支持模糊查询"
          clearable
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="query">查询</el-button>
        <el-button type="success" :icon="Plus" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="tableData.loading" :data="tableData.list" border style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="role_name" label="角色名称" />
      <el-table-column prop="role_desc" label="描述" />
      <el-table-column label="操作" fixed="right" width="140">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm title="确定删除吗?" @confirm="handleDel(row.id)">
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

    <el-dialog
      v-model="perData.visible"
      :title="perData.form.id ? '编辑权限' : '新增角色'"
      :close-on-click-modal="false"
      width="340px"
    >
      <el-form ref="formtRef" :model="perData.form" :rules="perData.rules" label-width="80px">
        <el-form-item label="角色名称" prop="role_name">
          <el-input
            v-model="perData.form.role_name"
            placeholder="小于40字符"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="role_desc">
          <el-input
            v-model="perData.form.role_desc"
            placeholder="小于40字符"
            style="width: 200px"
          />
        </el-form-item>
      </el-form>
      <el-tree
        ref="treeRef"
        :data="perData.list"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="{
          label: 'title',
          children: 'children',
        }"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="perData.visible = false">取消</el-button>
          <el-button type="primary" :loading="perData.loading" @click="submitForm">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="PermissionRole">
import { Search, Plus } from '@element-plus/icons-vue'
import { getRole, getPer, addRole, updateRole, delRole } from '@/api/permission'
import Pagination from '@/components/Pagination/index.vue'

// 列表
const tableData = reactive({
  loading: true,
  search: '',
  list: [],
  currentPage: 1,
  pageSize: 15,
})

const query = () => {
  tableData.loading = true
  getRole({
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

// 新增、编辑、删除
const formtRef = ref(null)
const treeRef = ref(null)
const perData = reactive({
  visible: false,
  loading: false,
  form: {
    id: '',
    role_name: '',
    role_desc: '',
  },
  rules: {
    role_name: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('角色名称为必填字段'))
          } else if (!/^.{1,40}$/.test(value)) {
            callback(new Error('角色名称长度必须小于40个字符'))
          } else {
            callback()
          }
        },
        trigger: 'change',
      },
    ],
    role_desc: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('角色描述为必填字段'))
          } else if (!/^.{1,40}$/.test(value)) {
            callback(new Error('角色描述长度必须小于40个字符'))
          } else {
            callback()
          }
        },
        trigger: 'change',
      },
    ],
  },
  list: [],
})
getPer({
  roleid: 0,
})
  .then(data => {
    perData.list = data.data
  })
  .catch(() => {
    //
  })

// 点击新增
const handleAdd = () => {
  perData.form = {
    id: '',
    role_name: '',
    role_desc: '',
  }
  perData.visible = true
  perData.loading = false
  nextTick(() => {
    formtRef.value.clearValidate()
    treeRef.value.setCheckedKeys([], false)
  })
}

// 点击编辑
const handleEdit = row => {
  perData.form = {
    id: row.id,
    role_name: row.role_name,
    role_desc: row.role_desc,
  }
  perData.visible = true
  perData.loading = false
  nextTick(() => {
    formtRef.value.clearValidate()
    treeRef.value.setCheckedKeys([], false)
    row.per_id.split(',').forEach(item => {
      if (item && !treeRef.value.getNode(item).childNodes.length) {
        treeRef.value.setChecked(item, true)
      }
    })
  })
}

const submitForm = () => {
  const per_id = treeRef.value
    .getHalfCheckedKeys()
    .concat(treeRef.value.getCheckedKeys(false))
    .join(',')
  formtRef.value.validate(valid => {
    if (valid) {
      perData.loading = true
      if (!perData.form.id) {
        addRole({
          role_name: perData.form.role_name,
          role_desc: perData.form.role_desc,
          per_id,
        })
          .then(() => {
            perData.visible = false
            query()
          })
          .catch(() => {
            perData.loading = false
          })
      } else {
        updateRole({
          id: perData.form.id,
          role_name: perData.form.role_name,
          role_desc: perData.form.role_desc,
          per_id,
        })
          .then(() => {
            perData.visible = false
            query()
          })
          .catch(() => {
            perData.loading = false
          })
      }
    } else {
      return false
    }
  })
}

// 点击删除
const handleDel = id => {
  tableData.loading = true
  delRole({
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
