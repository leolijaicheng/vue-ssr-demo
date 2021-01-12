import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync }  from 'vuex-router-sync'
import './assets/common.scss'
import 'element-ui/lib/theme-chalk/index.css';

import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dialog,
  Table,
  TableColumn,
  MessageBox,
  Message,
  Pagination,
  Loading,
} from 'element-ui';

Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);

Vue.use(Loading.directive);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

export function createApp(){

    const router = createRouter()
    const store = createStore()

    sync(store,router)

    const app =  new Vue({
        router,
        store,
        render:h => h(App)
    })

    
    return { app,router,store }
}