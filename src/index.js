import Vue from 'vue'
import App from './app.vue'
import './assets/style/hello.css'
import './assets/images/dess.png'
import './assets/style/global.styl'

const root = document.createElement('div');
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root); //挂在到 root 节点