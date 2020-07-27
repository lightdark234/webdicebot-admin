import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Clipboard from 'v-clipboard'
import VueSweetalert2 from 'vue-sweetalert2'
import { Datetime } from 'vue-datetime'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Clipboard)
Vue.use(VueSweetalert2)
Vue.use(Datetime)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-datetime/dist/vue-datetime.css'