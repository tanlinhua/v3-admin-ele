<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="用户名">
        <el-input
          v-model="adminData.search"
          placeholder="支持模糊查询"
          clearable
          style="width: 120px"
        />
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          v-model="roleData.value"
          placeholder="请选择"
          style="width: 120px"
          filterable
          clearable
        >
          <el-option label="全部" value="all" />
          <el-option
            v-for="item in roleData.list"
            :key="item.id"
            :label="item.role_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="登录时间">
        <el-date-picker
          v-model="adminData.datetime"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          clearable
          style="width: 380px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="query">查询</el-button>
        <el-button type="success" :icon="Plus" @click="handleAddAccount">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="adminData.loading" :data="adminData.showList" border style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column prop="role_name" label="角色" />
      <el-table-column prop="pid" label="上级ID" />
      <el-table-column prop="last_login_ip" label="最后登陆IP" min-width="135" />
      <el-table-column prop="created_at" label="创建时间" min-width="165" />
      <el-table-column prop="updated_at" label="更新时间" min-width="165" />
      <el-table-column prop="last_login_time" label="最后登陆时间" min-width="165" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            inline-prompt
            active-text="正常"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="0"
            @change="changeStatus(row)"
          />
        </template>
      </el-table-column>
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
      v-model:page="adminData.currentPage"
      v-model:limit="adminData.pageSize"
      :total="adminData.list.length"
      @pagination="filterHandler()"
    />

    <el-dialog
      v-model="accountDialog.visible"
      :title="accountDialog.form.id ? '编辑用户' : '新增用户'"
      :close-on-click-modal="false"
      width="340px"
    >
      <el-form
        ref="refAccountForm"
        :model="accountDialog.form"
        :rules="accountDialog.rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="user_name">
          <el-input
            v-model="accountDialog.form.user_name"
            placeholder="5~30位字符"
            :disabled="accountDialog.form.id"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="accountDialog.form.password"
            type="password"
            placeholder="不小于6位数"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="accountDialog.form.role" placeholder="请选择" filterable clearable>
            <el-option
              v-for="item in roleData.list"
              :key="item.id"
              :label="item.role_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上级">
          <el-select v-model="accountDialog.form.pid" placeholder="请选择" filterable clearable>
            <el-option
              v-for="item in adminData.list"
              :key="item.id"
              :label="item.user_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="accountDialog.form.status" placeholder="请选择" filterable clearable>
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="accountDialog.visible = false">取消</el-button>
          <el-button type="primary" :loading="accountDialog.loading" @click="submitAccountForm"
            >提交</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="PermissionAdm">
import { Search, Plus } from '@element-plus/icons-vue'
import { getRole, getAdm, addAdm, updateAdm, delAdm } from '@/api/permission'
import { parseTime } from '@/utils/commonUtil'
import Pagination from '@/components/Pagination/index.vue'

// 用户列表
const adminData = reactive({
  loading: true,
  search: '',
  datetime: null,
  list: [],
  showList: [],
  currentPage: 1,
  pageSize: 15,
})

const query = () => {
  adminData.loading = true
  getAdm({
    search: adminData.search,
    role: roleData.value === 'all' ? '' : roleData.value,
    t1: adminData.datetime ? parseTime(adminData.datetime[0]) : '',
    t2: adminData.datetime ? parseTime(adminData.datetime[1]) : '',
  })
    .then(data => {
      adminData.list = data.data ? data.data : []
      filterHandler(true)
      adminData.loading = false
    })
    .catch(() => {
      adminData.loading = false
    })
}

// 数据筛选
let filterHandler = (isReset = false) => {
  if (isReset) {
    adminData.currentPage = 1
  }
  adminData.showList = adminData.list.slice(
    (adminData.currentPage - 1) * adminData.pageSize,
    adminData.currentPage * adminData.pageSize
  )
}

// 权限列表
let roleData = reactive({
  value: 'all',
  list: [],
})
getRole()
  .then(data => {
    roleData.list = data.data
  })
  .catch(() => {
    //
  })

// 修改账号状态
const changeStatus = row => {
  updateAdm({
    id: row.id,
    status: row.status,
  })
    .then(() => {
      //
    })
    .catch(() => {
      row.status = row.status === 1 ? 0 : 1
    })
}

// 新增、编辑、删除账号
const refAccountForm = ref(null)
const accountDialog = reactive({
  visible: false,
  loading: false,
  form: {
    id: '',
  },
  rules: {
    user_name: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('用户名为必填字段'))
          } else if (!/^.{5,30}$/.test(value)) {
            callback(new Error('用户名长度必须至少为5个字符'))
          } else {
            callback()
          }
        },
        trigger: 'blue',
      },
    ],
    password: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!accountDialog.form.id && value === '') {
            callback(new Error('密码为必填字段'))
          } else if (!accountDialog.form.id && !/^.{6,}$/.test(value)) {
            callback(new Error('密码长度必须至少为6个字符'))
          } else {
            callback()
          }
        },
        trigger: 'blue',
      },
    ],
    role: [
      {
        required: true,
        message: '请选择',
        trigger: 'change',
      },
    ],
    status: [
      {
        required: true,
        message: '请选择',
        trigger: 'change',
      },
    ],
  },
})

// 点击新增
const handleAddAccount = () => {
  accountDialog.form = {
    user_name: '',
    password: '',
    role: '',
    pid: '',
    status: 1,
  }
  accountDialog.visible = true
  accountDialog.loading = false
  nextTick(() => {
    refAccountForm.value.clearValidate()
  })
}

// 点击编辑
const handleEditAccount = row => {
  accountDialog.form = {
    id: row.id,
    user_name: row.user_name,
    password: '',
    role: row.role,
    pid: row.pid === 0 ? '' : row.pid,
    status: row.status,
  }
  accountDialog.visible = true
  accountDialog.loading = false
  nextTick(() => {
    refAccountForm.value.clearValidate()
  })
}

// 点击提交
const submitAccountForm = () => {
  refAccountForm.value.validate(valid => {
    if (valid) {
      accountDialog.loading = true
      if (!accountDialog.form.id) {
        addAdm({
          user_name: accountDialog.form.user_name,
          password: accountDialog.form.password,
          role: accountDialog.form.role,
          pid: accountDialog.form.pid,
          status: accountDialog.form.status,
        })
          .then(() => {
            accountDialog.visible = false
            query()
          })
          .catch(() => {
            accountDialog.loading = false
          })
      } else {
        updateAdm({
          id: accountDialog.form.id,
          password: accountDialog.form.password,
          role: accountDialog.form.role,
          pid: accountDialog.form.pid,
          status: accountDialog.form.status,
        })
          .then(() => {
            accountDialog.visible = false
            query()
          })
          .catch(() => {
            accountDialog.loading = false
          })
      }
    } else {
      return false
    }
  })
}

// 点击删除
const handleDelAccount = id => {
  adminData.loading = true
  delAdm({
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
