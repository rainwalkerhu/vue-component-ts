<template>
    <div>
        <i class="componentName">组件名称：formDemo</i>
        <!-- <h3>具有数据校验功能的表单组件--form</h3> -->
      <i-form ref="form" :model="formValidate" :rules="ruleValidate">
        <i-form-item label="组件名称" prop="name">
          <i-input v-model="formValidate.name"></i-input>
        </i-form-item>
        <i-form-item label="组件类型" prop="mail">
          <i-select v-model="formValidate.mail" :options="options"></i-select>
        </i-form-item>
        <i-form-item label="多选组件demo" prop="multiple">
          <i-checkbox-group v-model="formValidate.multiple">
            <i-checkbox label="option1">选项 1</i-checkbox>
            <i-checkbox label="option2">选项 2</i-checkbox>
            <i-checkbox label="option3">选项 3</i-checkbox>
            <i-checkbox label="option4">选项 4</i-checkbox>
          </i-checkbox-group>
        </i-form-item>
      </i-form>
      <button @click="handleSubmit">查找</button>
      <button @click="handleReset">重置</button>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator';
import IForm from '@/components/form/form.vue'
import iFormItem from '@/components//form/form-item.vue'
import iInput from '@/components/input/input.vue'
import iSelect from '@/components/input/select.vue'
import iCheckbox from '@/components/checkbox/checkbox.vue'
import iCheckboxGroup from '@/components/checkbox/checkbox-group.vue'
import { findComponentsUpward, findComponentUpward, findComponentDownward, findComponentsDownward, findBrothersComponents } from "@/utils/assist";

declare interface Dictionary {
  [key: string]: any
}

@Component({
  name: 'formDemo',
  components: {
    IForm,
    iFormItem,
    iInput,
    iSelect,
    iCheckbox,
    iCheckboxGroup
  }
})
export default class Home extends Vue {
  @Inject()
  app!: any;
  formValidate: Dictionary = {
    name: '',
    mail: '',
    multiple: [
      'option2'
    ]
  };
  components: Dictionary = {}
  options: Array<object> = [
    {name: 'findComponentUpward', value: 'findComponentUpward'},
    {name: 'findComponentsUpward', value: 'findComponentsUpward'},
    {name: 'findComponentDownward', value: 'findComponentDownward'},
    {name: 'findComponentsDownward', value: 'findComponentsDownward'},
    {name: 'findBrothersComponents', value: 'findBrothersComponents'}
  ]
  ruleValidate: Dictionary = {
    name: [
      {
        required: true,
        message: '组件名称不能为空',
        trigger: 'blur'
      }
    ],
    mail: [
      {
        required: true,
        message: '组件类型不能为空',
        trigger: 'blur'
      }
    ]
  };
  methods: Dictionary = {
    findComponentUpward: findComponentsUpward,
    findComponentsUpward: findComponentsUpward,
    findComponentDownward: findComponentDownward,
    findComponentsDownward: findComponentsDownward,
    findBrothersComponents: findBrothersComponents
  }
  
  created() {
  }
  handleSubmit(): void {
      const method: any = this.formValidate.mail
    this.components = this.methods[method](this, this.formValidate.name)
    // (<any>this.$refs.form).validate((valid: Boolean) => {
    //   if(valid) {
    //     window.alert('提交成功')
    //   } else {
    //     window.alert('表单校验失败')
    //   }
    // })
  }
  handleReset(): void {
    (<any>this.$refs.form).resetFields()
  }
}
</script>