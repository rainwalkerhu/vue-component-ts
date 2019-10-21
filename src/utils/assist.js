/**
 *
 * @param {*} context 当前上下文比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是传入 this
 * @param {*} componentName 要找到的组件名称
 * @returns 组件实例
 */
function findComponentUpward(context, componentName) {
    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || [componentName].indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}
/**
 *
 * @param {*} context 当前上下文比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是传入 this
 * @param {*} componentName 要找到的组件名称
 * @returns 所有组件实例的list
 */
function findComponentsUpward(context, componentName) {
    let parents = [];
    const parent = context.$parent;
    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent);
        return parents.concat(findComponentsUpward(parent, componentName));
    } else {
        return [];
    }
}
/**
 *
 *
 * @param {*} context 当前上下文比如你要基于哪个组件来向下寻找，一般都是基于当前的组件，也就是传入 this
 * @param {*} componentName 要找到的组件名称
 * @returns
 */
function findComponentDownward(context, componentName) {
    const childrens = context.$children;
    let children = null;
    if (childrens.length) {
        for (const child of childrens) {
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children;
}
/**
 *
 *
 * @param {*} context 当前上下文比如你要基于哪个组件来向下寻找，一般都是基于当前的组件，也就是传入 this
 * @param {*} componentName 要找到的组件名称
 * @returns 所有组件实例的list
 */
function findComponentsDownward(context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}
/**
 *
 *
 * @param {*} context 当前横向查找的上下文 一般是this
 * @param {*} componentName 要找到的组件名称
 * @param {boolean} [exceptMe=true] 是否过滤自身
 * @returns 
 */
function findBrothersComponents(context, componentName, exceptMe = true) {
    let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName;
    });
    let index = res.findIndex(item => item._uid === context._uid);
    if (exceptMe && index > -1) res.splice(index, 1);
    return res;
}

function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    };
    return map[toString.call(obj)];
}
// deepCopy
function deepCopy(data) {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if ( t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
        o.push(deepCopy(data[i]));
        }
    } else if ( t === 'object') {
        for (let i in data) {
        o[i] = deepCopy(data[i]);
        }
    }
    return o;
}

export { findComponentsUpward, findComponentUpward, findComponentDownward, findComponentsDownward, findBrothersComponents, deepCopy };