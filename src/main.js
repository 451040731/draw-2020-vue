/* * @Author: LCJ * */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import { MessageBox, Message, Dialog, Button, Form, FormItem, Input  } from 'element-ui';
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
