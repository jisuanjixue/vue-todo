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
      <Item :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @delItem="delTodoItem"></Item>
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
      filteredTodos () {
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
      addTodoItem () {
        this.todoDatas.unshift({
          id: id++,
          content: this.content,
          completed: false
        })
        this.content = '' //item添加完成后，清空输入框
      },
      delTodoItem (id) {
        this.todoDatas.splice(this.todoDatas.findIndex(todo => todo.id === id),1)
      },
      toggleFilter(state) {
        this.filter = state;
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