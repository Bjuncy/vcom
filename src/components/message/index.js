import Notification from '../base/notification'
const prefixCls = 'ivu-message'
const iconPrefixCls = 'ivu-icon'
const prefixKey = 'ivu_message_key_'

const defaults = {
  top: 24,
  duration: 1.5
}
let messageInstance
let name = 1
const iconTypes = {
  'info': 'ios-information-circle',
  'success': 'ios-checkmark-circle',
  'warning': 'ios-alert',
  'error': 'ios-close-circle',
  'loading': 'ios-loading'
}
function getMessageInstance (className, wrapStyles) {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls: prefixCls,
    className: className,
    styles: wrapStyles || {top: `${defaults.top}px`}
  })
  return messageInstance
}
function notice (
  content = '',
  duration = defaults.duration,
  type,
  onClose = function () {},
  closable = false,
  render = function () {},
  transitionName = 'move-up',
  icon = '',
  messageKey = `${prefixKey}${name}`,
  className = '',
  wrapStyles = {}
) {
  const iconType = icon || iconTypes[type]
  let instance = getMessageInstance(className, wrapStyles)
  const loadCls = type === 'loading' ? 'ivu-load-loop' : ''

  instance.notice({
    name: messageKey.toString(),
    duration: duration,
    styles: {},
    transitionName: transitionName,
    content: `
      <div class="${prefixCls}-custom-content ${prefixCls}-${type}">
        <i class="${iconPrefixCls} ${iconPrefixCls}-${iconType} ${loadCls}"></i>
        <span>${content}</span>
      </div>
    `,
    render: render,
    closable: closable,
    type: 'message',
    onClose: onClose
  })
  return (function () {
    let target = name++
    return function () {
      instance.remove(`${prefixKey}${target}`)
    }
  })()
}
export default {
  info (options) {
    return this.message('info', options)
  },
  success (options) {
    return this.message('success', options)
  },
  warning (options) {
    return this.message('warning', options)
  },
  error (options) {
    return this.message('error', options)
  },
  loading (options) {
    return this.message('loading', options)
  },
  message (type, options) {
    if (typeof options === 'string') {
      options = {
        content: options
      }
    }
    return notice(options.content, options.duration, type, options.onClose, options.closable, options.render, options.transitionName, options.icon, options.name, options.className, options.wrapStyles)
  },
  config (options) {
    if (options.top) {
      defaults.top = options.top
    }
    if (options.duration || options.duration === 0) {
      defaults.defaultDuration = options.duration
    }
  },
  close (name) {
    if (name) {
      name = name.toString()
      if (messageInstance) {
        messageInstance.remove(name)
      } else {
        return false
      }
    }
  },
  destroy () {
    let instance = getMessageInstance()
    messageInstance = null
    instance.destroy('ivu-message')
  }
}
