/**
 *
 *
 * @param {String} componentName 要查找的组件name
 * @param {string} eventName 事件name
 * @param {*} params 参数
 */
function broadcast (componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name
        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params))
        } else {
            broadcast.apply(child, [componentName, eventName].concat(params))
        }
    });
}
export default {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;
            // “不断向上遍历更新当前组件（即上下文为当前调用该方法的组件）
            // 的父组件实例（变量 parent 即为父组件实例），直到匹配到定义的 
            // componentName 与某个上级组件的 name 选项一致时，结束循环，
            // 并在找到的组件实例上，调用 $emit 方法来触发自定义事件 eventName”
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent
                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {

                // 组件使用 $emit 在自己实例上触发事件，并用 $on 监听它

                parent.$emit.apply(parent, [eventName].concat(params))
            }
        },
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params)
        }
    }
}