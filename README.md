### RegularForm简介
npm install regular-form

Demo & API：[戳这里](http://amibug.github.io/regular-form-demo/ )

###### 使用要点
- 依赖[regularjs](https://github.com/regularjs/regular )
- name 和 r-model是每个需要验证表单元素必须配置的
- 如果表单内嵌组件需要验证，内嵌的组件也需要继承regular-form

### API

#### Options

| 参数          | 类型        | 默认值        | 描述        |
| ------------- | ----------- | ------------- | ----------- |
| rule          |  Number     |  1            | 1 - 实时验证 2 - 失去焦点时验证 |

#### Directive

| 指令          | 指令值      | 描述          |
| ------------- | ----------- | ------------- |
| r-model       |             | r-model和name是每个表单元素需要必需要设置的 |
| r-required    |  true false {variable}     | 表单元素是否必需 |
| r-type        |  url number email week month time date | 表单元素支持验证的类型 |
| r-min         |  Number {variable}     | 表单元素的最小值 |
| r-max         |  Number {variable}     | 表单元素的最大值 |
| r-step        |  Number {variable}     | 表单元素的间隔 |
| r-pattern     |  RegExp {variable} |表单元素验证的正则规则(直接填写正则字符串如/^1[3|4|5|6|7|8|9]\d{9}$/,regular在parse时{9}会被处理，建议使用{variable}的方式) |
| r-extend      |  Function {variable}     | 表单元素的自定义验证 |

#### Component Status

| 属性          | 类型        | 描述          |
| ------------- | ----------- | ------------- |
| $dirty                      |  Boolean     | 表单是否有改动的 |
| $invalid                    |  Boolean     | 表单是否验证通过 |
| $submitted                  |  Boolean     | 表单提交状态（TODO） |
| form.$$name.$dirty          |  Boolean     | 具体一个表单元素是否有改动 |
| form.$$name.$error.required | Boolean      | 具体一个表单元素的验证非法类型，true - 验证通过 false - 验证失败， name置表单元素的name属性
| form.$$name.$error.type     |  Boolean     | 
| form.$$name.$error.min      |  Boolean     |
| form.$$name.$error.max      |  Boolean     | 
| form.$$name.$error.step     |  Boolean     | 
| form.$$name.$error.pattern  |  Boolean     | 
| form.$$name.$error.required |  Boolean     | 
| form.$$name.$error.extend   |  Boolean     | 
