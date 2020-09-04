<template>
  <div id="app">
    <a-input placeholder="请输入任务" v-model="inputValue" class="my_ipt" />
    <a-button type="primary" @click="addItems()">添加事项</a-button>

    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :check="item.done" @click="checkItem(item)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLeft}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button type="primary">全部</a-button>
          <a-button>未完成</a-button>
          <a-button>已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import{mapState, mapGetters,mapActions} from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      // list: []
      inputValue:''
    }
  },
  created(){
    this.$store.dispatch('getList')
    
  },
  mounted(){
    // ...mapActions(['getList'])
  },
  computed:{
    ...mapState(['list']),
    ...mapGetters(['unDoneLeft'])
  },
  methods:{
    addItems(){
      console.log(this.inputValue)
      if(this.inputValue.trim().length >0){
        this.$store.commit('addlist',this.inputValue)
        this.inputValue = ''
      }else{
        alert('输入不能为空！')
      }
    },
    checkItem( item ){
      item.done = !item.done
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
