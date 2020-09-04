import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[],
    newid:5
  },
  mutations: {
    initList(state,list){
      state.list = list
    },
    addlist(state,value){
      let json = {
          "id": state.newid++,
          "info": value,
          "done": false
      }
      state.list.push(json)
    }
  },
  actions: {
    getList(context){
      axios.get('/list.json').then(({data})=>{
        console.log(data)
        context.commit('initList',data)
      })
    }
  },
  getters:{
    unDoneLeft:state => {
      return state.list.filter(v=>{ return v.done }).length
    }
  },
  modules: {
  }
})
