<template>
  <div>
    <section class="content">
      <input
        type="text"
        class="input-add"
        autofocus="autofocus"
        placeholder="接下来要做什么？"
        v-model.trim="content"
        @keyup.enter="addTodoItem"
      >
      <Item :todo="todo" v-for="(todo, index) in filteredTodos" :key="todo.id" @delItem="delTodoItem(todo.id, index)"></Item>
      <!-- filter是用来动态点击切换下标(all, active, completed), @toggle监听tab组件的点击切换, 切换后数据要变换就要todoDatas, 监听清除完成的 -->
      <Tabs :filter="filter" :todoDatas="todoDatas" @toggle="toggleFilter" @clearAllCompleted="clearAllCompleted"></Tabs>
    </section>
  </div>
</template>

<script>
import Item from "./item.vue"
import Tabs from "./tabs.vue"
let id = 0
  export default {
    components: {
      Item,
      Tabs
    },
    data() {
      return {
        todoDatas: [],
        content: '',
        filter: 'all'
      }
    },
    computed: {
      // 已经被过滤过的todos
      filteredTodos() {
         //情况一：显示全部的items
         if (this.filter === 'all') {
           return this.todoDatas
         } else {
           const completed = this.filter === "completed"
           return this.todoDatas.filter(todo => completed === todo.completed)
         }
      }
    },
    methods: {
      addTodoItem() {
        // 首先,添加一条待办事项,从没有到有,需要往这个数组里添加一些信息,id content 是否完成,用到数组的一个方法unshift,从数组的最前面插入一条(todo对象)
        this.todoDatas.unshift({
          id: id++,
          content: this.content, // 用v-model绑定
          completed: false
        })
        this.content = '' //item添加完成后，清空输入框
      },
      /*
      // template里的input就不用v-model
      addTodoItem(e) {
        //e 指的是 event 对象
        this.todoDatas.unshift({
          //unshift()：在在数组的最前面插入一个item
          id: id++, //每个item都有一个id。最开始的时候，id为0，新来的item，让id加一
          content: e.target.value.trim(), //获取输入框中的内容
          completed: false //新的item，默认都是未完成的状态
        });
        e.target.value = ""; //item添加完成后，清空输入框
      },
      */
      // 子组件告诉我,删除某条todo,我是怎么监听到的,通过上面template里子组件的@delItem,等同于v-on:delItem,然后动手删除,在事件methods里执行,删除哪一条用id来识别,在函数里传参.
      delTodoItem(todoId, index) {
        // 用splice(index, 1)方法删除,
        this.todoDatas.splice(index, 1)
      },
      // delTodoItem(id) {
      //   下面的index,是用es6的findIndex找到,它是用值来找这个值的索引
      //   this.todoDatas.splice(this.todoDatas.findIndex(todo => todo.id === id),1)
      // },
      // 监听到了state就操作filter状态, state作为监听和触发函数的参数,在父子组件中使用
      toggleFilter(state) {
        this.filter = state
      },
      clearAllCompleted() {
        this.todoDatas = this.todoDatas.filter(todo => !todo.completed); //给todoDatas赋一个过滤之后的新的值
      }
    }
  }
</script>

<style scoped>
  .content {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
/* 输入框的样式 */
.input-add {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>