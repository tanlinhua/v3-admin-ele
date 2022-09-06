import { defineStore } from 'pinia'

export const useErrorLogStore = defineStore('errorLog', {
  state: () => {
    return {
      logs: [],
    }
  },

  actions: {
    ADD_ERROR_LOG(log) {
      this.$patch(state => {
        state.logs.push(log)
      })
    },
    CLEAR_ERROR_LOG() {
      this.$patch(state => {
        state.logs.splice(0)
      })
    },
  },
})
