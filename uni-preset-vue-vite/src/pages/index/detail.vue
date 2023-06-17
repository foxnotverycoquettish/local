<template>
	<view>
		<el-header>
			<!-- <el-button style="margin-left: 80%;width: 5rem;">删除</el-button> -->
			<el-popover :visible="visible" placement="top" :width="160">
			    <p>你确定删除这个数据吗</p>
			    <view style="text-align: right; margin: 0">
			      <el-button size="small" text @click="visible = false">取消</el-button>
			      <el-button size="small" type="primary" @click="visible = false"
			        >确认</el-button
			      >
			    </view>
			    <template #reference>
			      <el-button @click="visible = true">删除</el-button>
			    </template>
			  </el-popover>
		</el-header>

		<el-container style="position: relative;top: 30px;width: 100%;">
			<el-card style="margin: 8px 6px 0px 6px;width: 100%;" @click="t">
				<el-form>
					<div style="display: inline-block; width:70%">
						<el-form-item label="用户名:">
							<el-space>{{value.name}}</el-space>
						</el-form-item>
					</div>
					<div style="display: inline-block;width:30%">
						<el-text>{{value.time}}</el-text>
					</div>
				</el-form>

				<el-form style="display: inline-block;width: 60%;">
					<el-form-item label="礼金:">
						<el-space>{{value.money}}</el-space>
					</el-form-item>

					<el-form-item label="礼品:">
						<el-space>{{value.gift}}</el-space>
					</el-form-item>
				</el-form>

				<el-form>
					<el-form-item label="电话:">
						<el-space>{{value.phone}}</el-space>
					</el-form-item>
					<el-form-item label="备注:">
						<el-space>{{value.remark}}</el-space>
					</el-form-item>
				</el-form>

				<el-form>
					<el-form-item label="地址:">
						<el-space>{{value.address}}</el-space>
					</el-form-item>
				</el-form>
			</el-card>
		</el-container>
		<el-footer style="margin: 0;padding: 0;position: fixed; z-index: 9999;width: 100%;top: 90%;width: 100%; ">
			<el-card style="margin: 0;padding:;text-align: center;">
				<el-button style="width: 86%;height: 2.4rem;background-color: aqua;">修改</el-button>
			</el-card>
		</el-footer>
	</view>
</template>

<script setup>
	import {
		reactive,ref
	} from 'vue'
	import {
		onInit,
		onLoad
	} from '@dcloudio/uni-app';
	


	let value = reactive({
		name: '',
		time: '',
		money: '',
		gift: '',
		remark: '',
		address: '',
	})
	
	// 监听主页传过来的参数
	onLoad((option) => {
		var item = JSON.parse(decodeURIComponent(option.obj));
		console.log("详情页"+item)
		value = item
		console.log("value"+value.name)
	})
	const visible = ref(false)
</script>

<style>

</style>