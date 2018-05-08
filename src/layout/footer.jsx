//引入 footer的 样式
import '../assets/style/footer.styl'

//底部的区域
export default {
  data() {
    return {
      author: 'xiaobo'
    }
  },
  render() {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}