<template>
  <div style="display: flex; line-height: 32px;">
    <div :style="{width: labelWidth, textAlign: align}" class="label">
      <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{label}}</label>
    </div>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" clsss="i-form-item-message">{{validateMessage}}</div>
    </div>
  </div>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
import AsyncValidator from 'async-validator';
export default {
  name: 'iFormItem',
  mixins: [Emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    align: {
      type: String,
      default: 'right'
    }
  },
  data() {
    return {
      isRequired: false,
      validateState: '',
      validateMessage: ''
    }
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop];
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('iForm', 'on-form-item-add', this)
      this.initialValue = this.fieldValue;
      this.setRules()
    }
  },
  methods: {
    setRules() {
      let rules = this.getRules()
      if (rules.length) {
        rules.every((rule) => {
          this.isRequired = rule.isRequired;
        })
      }
      this.$on('on-form-blur', this.onFieldBlur);
      this.$on('on-form-change', this.onFieldChange);
    },
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    resetField() {
      this.validateState = '';
      this.validateMessage = '';
      this.form.model[this.prop] = this.initialValue;
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    validate(trigger, callback = function () { }) {
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }
      this.validateState = 'validating';
      let descriptor = {};
      descriptor[this.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      let model = {};
      model[this.prop] = this.fieldValue;
      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
      })
    },
    onFieldBlur(val) {
      this.validate('blur')
    },
    onFieldChange(val) {
      this.validate('change')
    }
  },
  beforeDestroy() {
    this.dispatch('iform', 'on-form-item-remove', this)
  }
}
</script>
<style>
.i-form-item-label-required:before {
  content: "*";
  color: red;
}
.i-form-message {
  color: red;
}
.label {
    margin-right: 12px;
}
</style>