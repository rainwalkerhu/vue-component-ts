<template>
    <select :value="currentValue"
        @change="handleInput"
        @blur="handleBlur">
        <option :value="option.value" v-for="(option, i) in options" :key="i">{{option.name}}</option>
    </select>
</template>
<script>
import Emitter from '../../mixins/emitter.js'
    export default {
        name: 'iInput',
        mixins: [Emitter],
        props: {
            value: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {
                currentValue: this.value
            }
        },
        watch: {
            value (val) {
                this.currentValue = val;
            }
        },
        methods: {
            handleInput (event) {
                const value = event.target.value;
                this.currentValue = value
                this.$emit('input', value)
                this.dispatch('iFormItem', 'on-form-change', value)
            },
            handleBlur () {
                this.dispatch('iFormItem', 'on-form-blur', this.currentValue)
            }
        }
    }
</script>