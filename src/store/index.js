import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //所有的任务列表
    list: [],
    id: null,
    inputValue: 'aaa',
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      //  console.log(state);
      state.list = list
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    addItem(state) {
      state.list.unshift({
        id: state.list.length,
        info: state.inputValue,
        done: false,
      });
      state.inputValue = ''
    },
    removeById(state, id) {
      const index = state.list.findIndex(val => {

        return val.id === id
      })
      console.log(index);
      if (index !== -1) {
        state.list.splice(index, 1)
      } else {
        return
      }
    },
    //改变复选框状态
    cbStatusChange(state, params) {
      const index = state.list.findIndex(val => {
        return val.id === params.id
      })
      //console.log(index);
      if (index !== -1) {
        state.list[index].done = params.status
      } else {
        return
      }
    },
    //清除所有已经完成了的任务
    clearAll(state) {
      state.list = state.list.filter(val => {
        //console.log(val);

        return val.done === false
      })
      // console.log(newList);
    },
    //改变列表显示
    changeList(state, val) {
      state.viewKey = val
    }
  },
  actions: {
    getList(context) {
      //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation
      // console.log(context);
      axios.get('./list.json').then(res => {
        //  console.log(res);
        context.commit('initList', res.data)
      })
    }
  },
  getters: {
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(item => {
          return item.done === true
        })
      }
    }
  },
  modules: {}
})
