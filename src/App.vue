<template>
  <div id="app">
    <a-input placeholder="请输入任务" :value="inputValue" @change="handleInputChange" class="my_ipt" />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbStatusChange(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey==='all' ?'primary':'' " @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey==='undone' ?'primary':'' " @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey==='done' ?'primary':'' " @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clearAll">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    //调用action方法
    this.$store.dispatch("getList");
  },
  //通过机算属性获得vuex state里面的list值
  computed: {
    ...mapState(["list", "inputValue", "viewKey"]),
    ...mapGetters(["unDoneLength", "infoList"]),
  },
  methods: {
    handleInputChange(e) {
      //  console.log(e.target.value);
      //调用vuex中mutations中的方法
      this.$store.commit("setInputValue", e.target.value);
    },
    //添加任务的函数
    addItemToList() {
      if (this.inputValue.trim().length === 0) {
        return this.$message.warning("请输入任务");
      }
      this.$store.commit("addItem");
    },
    //通过id删除任务
    removeItemById(id) {
      this.$store.commit("removeById", id);
      console.log(id);
    },
    //改变checkbox的状态
    cbStatusChange(e, id) {
      // console.log(id);
      const params = {
        id: id,
        status: e.target.checked,
      };
      this.$store.commit("cbStatusChange", params);
    },
    //清除所有已经完成得任务
    clearAll() {
      this.$store.commit("clearAll");
    },
    // 改变列表的显示
    changeList(val) {
      console.log(val);
      this.$store.commit("changeList", val);
    },
  },
};
</script>

<style scoped>
#app {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
