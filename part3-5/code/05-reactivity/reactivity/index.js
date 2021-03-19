const isObject = val => val !== null && typeof val === 'object'
// 转化函数：如果传入的值是对象的话继续调用reactive，变成响应式对象
const convert = target => isObject(target) ? reactive(target) : target

export function reactive (target) {
  if(!isObject(target)) return target

  const handler = {
    get (target, key, receiver) {
      // 收集依赖
      console.log('get', key)
      const result = Reflect.get(target, key, receiver)
      return convert(result)
    },
    set (target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        console.log('set', key, value)
      }
      return result
    },
    deleteProperty (target, key) {

    }
  }

  return new Proxy(target, handler)
}