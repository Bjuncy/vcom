<template>
  <transition :name="transitionName" @enter="handleEnter" @leave="handleLeave">
    <div :class="classes" :style="styles">
      <template v-if="type === 'notice'">
        <div :class="contentClasses" ref="content" v-html="content"></div>
        <div :class="contentWithIcon">
          <render-cell
            :render="renderFunc"
          >
          </render-cell>
        </div>
        <a :class="[baseClass + '-close']" @click="close" v-if="closable">
          <i class="ivu-icon ivu-icon-ios-close"></i>
        </a>
      </template>
      <template v-if="type === 'message'">
        <div :class="[baseClass + '-content']" ref="content">
          <div :class="[baseClass + '-content-text']" v-html="content"></div>
          <div :class="[baseClass + '-content-text']">
            <render-cell
              :render="renderFunc"
            >
            </render-cell>
          </div>
          <a :class="[baseClass + '-close']" @click="close" v-if="closable">
            <i class="ivu-icon ivu-icon-ios-close"></i>
          </a>
        </div>
      </template>
    </div>
  </transition>
</template>
<script>
import RenderCell from '../render'
export default {
  name: 'notice',
  components: {
    RenderCell
  },
  props: {
    prefixCls: {// class前缀
      type: String,
      default: ''
    },
    transitionName: {// 过渡方式
      type: String
    },
    type: {// 页面类型
      type: String
    },
    duration: {// 过渡时间
      type: Number,
      default: 1.5
    },
    content: {// 主要内容
      type: String,
      default: ''
    },
    withIcon: Boolean, // 是否需要图标
    render: {// 模板函数
      type: Function
    },
    hasTitle: Boolean, // 是否需要显示title
    styles: {// 组件显示的位置，定位样式
      type: Object,
      default: function () {
        return {
          right: '50%'
        }
      }
    },
    closable: {// 是否可关闭
      type: Boolean,
      default: false
    },
    className: {
      type: String
    },
    noticeName: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    onClose: {// 关闭的方法
      type: Function
    }
  },
  data () {
    return {
      withDesc: false // 是否需要细节描述
    }
  },
  computed: {
    baseClass () {
      return `${this.prefixCls}-notice`
    },
    renderFunc () {
      return this.render || function () {}
    },
    classes () {
      return [
        this.baseClass,
        {
          [`${this.className}`]: !!this.className,
          [`${this.noticeName}`]: !!this.noticeName,
          [`${this.baseClass}-closable`]: this.closable,
          [`${this.baseClass}-with-desc`]: this.withDesc
        }
      ]
    },
    contentClasses () {
      return [
        `${this.baseClass}-content`,
        this.render !== undefined ? `${this.baseClass}-content-with-render` : ''
      ]
    },
    contentWithIcon () {
      return [
        this.withIcon ? `${this.prefixCls}-content-with-icon` : '',
        !this.hasTitle && this.withIcon ? `${this.prefixCls}-content-with-render-notitle` : ''
      ]
    },
    messageClasses () {
      return [
        `${this.baseClass}-content`,
        this.render !== undefined ? `${this.baseClass}-content-with-render` : ''
      ]
    }
  },
  methods: {
    clearCloseTimer () {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
    },
    close () {
      this.clearCloseTimer()
      this.onClose()
      this.$parent.close(this.name)
    },
    handleEnter (el) {
      if (this.type === 'message') {
        el.style.height = el.scrollHeight + 'px'
      }
    },
    handleLeave (el) {
      if (this.type === 'message') {
        if (document.getElementsByClassName('ivu-message-notice').length !== 1) {
          el.style.height = 0
          el.style.paddingTop = 0
          el.style.paddingBottom = 0
        }
      }
    }
  },
  mounted () {
    this.clearCloseTimer()
    if (this.duration !== 0) {
      this.closeTimer = setTimeout(() => {
        this.close()
      }, this.duration * 1000)
    }
    if (this.prefixCls === 'ivu-notice') {
      let desc = this.$refs.content.querySelectorAll(`.${this.prefixCls}-desc`)[0]
      this.withDesc = this.render ? true : (desc ? desc.innerHtml !== '' : false)
    }
  },
  beforeDestroy () {
    this.clearCloseTimer()
  }
}
</script>
