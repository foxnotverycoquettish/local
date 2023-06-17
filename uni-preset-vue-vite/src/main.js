import {
	createSSRApp
} from "vue";
import App from "./App.vue";

import ElementPlus from 'element-plus' //添加
import 'element-plus/dist/index.css' //添加
// import locale from 'element-plus/lib/locale/lang/zh-cn' //切换为中文版本
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function createApp() {
	const app = createSSRApp(App);
	// app.use(ElementPlus, {
	// 		locale
	// 	})
	app.use(ElementPlus)
	for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		app.component(key, component)
	}
	return {
		app,
	};
}