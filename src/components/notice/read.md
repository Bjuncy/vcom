# notice 组件API
### notice Instance
  > 通过直接调用一下方法使用组件：
  * this.$notice.open(config)
  * this.$notice.info(config)
  * this.$notice.success(config)
  * this.$notice.warning(config)
  * this.$notice.error(config)

  > 以上方法隐式创建维护组件

  | 属性 | 说明 | 类型 | 默认值 |
  |:-----:|:-----:|:-----:|:-----:|

  | title | 通知提醒的标题 | String | - |
  |:-----:|:-----:|:-----:|:-----:|
  
  | desc | 通知提醒的内容，为空或不填时，自动应用仅标题模式下的样式 | String | - |
  |:-----:|:-----:|:-----:|:-----:|

  | name | 当前通知的唯一标识 | String | 自动 |
  |:-----:|:-----:|:-----:|:-----:|

  | duration | 自动关闭的延时，单位秒，不关闭可以写0 | Number | 4.5 |
  |:-----:|:-----:|:-----:|:-----:|

  | render | 自定义描述内容，使用 Vue 的 Render 函数，如果同时设置了 render 和 desc，则只显示 render 的内容 | Function | - |
  |:-----:|:-----:|:-----:|:-----:|

  | onClose | 关闭的回调函数 | Function | - |
  |:-----:|:-----:|:-----:|:-----:|

  > 修改源码后提供的config配置参数

  | 属性 | 说明 | 类型 | 默认值 |
  |:-----:|:-----:|:-----:|:-----:|

  | transitionName | 过渡类型名称 | String | 'move-notice-right', 可自由定义name和css |
  |:-----:|:-----:|:-----:|:-----:|

  | className | 所有通知的父级className | String | - |
  |:-----:|:-----:|:-----:|:-----:|

  | noticeName | 当前通知的className | String | - |
  |:-----:|:-----:|:-----:|:-----:|

  | wrapStyles | 最外层div样式 | Object | - |
  |:-----:|:-----:|:-----:|:-----:|

  | icon | 当前通知的自定义图标，仅info\success\warning\error类型有效 | String | - |
  |:-----:|:-----:|:-----:|:-----:|

  > 另外提供了全局配置、全局关闭某个通知和全局销毁的方法：
  * this.$notice.config(options)
  * this.$notice.close(name)
  * this.$notice.destroy()

  this.$Notice.config({
      top: 50,
      duration: 3
  })

  ##### 如果不配置wrapStyles默认通知组件距离顶端的距离24px, 如果不能直接调用，请在入口文件配置：
  例vue-cli: 
  * main.js => import notice from './notice/index.js' => Vue.prototype.$notice = notice

