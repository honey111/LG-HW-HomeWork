// 主要用于ts识别 .vue 文件模块
// ts 默认不支持导入 .vue 模块，这个文件告诉ts 导入 .vue 文件模块都按照VueConstructor<vue>类型识别处理
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
