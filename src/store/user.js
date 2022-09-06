import { login, logoutReq } from '@/api/user'
import { getRole } from '@/api/permission'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { asyncRoutes } from '@/router'
import { defineStore } from 'pinia'
import { usePermissionStore } from '@/store/permission'
import { useTagsViewStore } from '@/store/tagsView'

const resetRouter = () => {
  const asyncRouterNameArr = asyncRoutes.map(mItem => mItem.name)
  asyncRouterNameArr.forEach(name => {
    if (router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      username: getToken(),
      avatar: '',
      roles: [],
    }
  },

  actions: {
    M_username(username) {
      this.$patch(state => {
        state.username = username
      })
    },
    M_roles(roles) {
      this.$patch(state => {
        state.roles = roles
      })
    },

    login(data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then(res => {
            this.M_username(data.user_name)
            setToken(data.user_name)
            localStorage.setItem('role_id', res.data.role)
            resolve(null)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // get user info
    getInfo() {
      return new Promise((resolve, reject) => {
        const role_id = localStorage.getItem('role_id')
        if (!role_id || role_id === '0') {
          resolve('admin')
        } else {
          getRole({
            id: role_id,
          })
            .then(data => {
              const roles = data.data[0].per_id.split(',')
              this.M_roles(roles)
              resolve(roles)
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    },
    // user logout
    logout() {
      return new Promise((resolve, reject) => {
        logoutReq()
          .then(() => {
            this.resetState()
            resolve(null)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    resetState() {
      return new Promise(resolve => {
        this.M_username('')
        this.M_roles([])
        removeToken() // must remove  token  first
        resetRouter() // reset the router
        const permissionStore = usePermissionStore()
        permissionStore.reset()
        const tagsViewStore = useTagsViewStore()
        tagsViewStore.delAllViews()
        resolve(null)
      })
    },
  },
})
