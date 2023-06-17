<template>
	<view>
		<el-container style="position: relative;">
			<el-card style="margin: 8px 6px 0px 6px;width: 100%;" @click="t">
				<el-form>
					<view style="display: inline-block; width:70%">
						<el-form-item label="用户名:">
							<el-space>张三</el-space>
						</el-form-item>
					</view>
					<view style="display: inline-block;width:30%">
						<el-text>2020-3-4</el-text>
					</view>
				</el-form>

				<el-form style="display: inline-block;width: 60%;">
					<el-form-item label="礼金:">
						<el-space>800</el-space>
					</el-form-item>

					<el-form-item label="礼品:">
						<el-space>34</el-space>
					</el-form-item>
				</el-form>

				<el-form style="display: inline-block; width: 40%;">
					<el-form-item label="备注:">
						<el-space>看看撒旦发生纠纷</el-space>
					</el-form-item>
				</el-form>

				<el-form>
					<el-form-item label="地址:">
						<el-space>撒旦飞洒飞洒发</el-space>
					</el-form-item>
				</el-form>
			</el-card>
		</el-container>
	</view>
</template>

<script setup>
	import {reactive} from "vue"
	import {
		onNavigationBarSearchInputChanged,onNavigationBarSearchInputConfirmed
	} from '@dcloudio/uni-app';
	
	let searchText = reactive("")
	
	// 监听搜索框类容
	onNavigationBarSearchInputChanged((e) => {
		if(e.text != ""){
			searchText = e.text
		}
	})
	
	onNavigationBarSearchInputConfirmed((e)=>{
		console.log("搜索事件"+searchText)
	})

	// 跳转界面
	function t() {
		uni.navigateTo({
			url: "/pages/index/detail"
		});
	}
	
	
</script>

<style>

</style>