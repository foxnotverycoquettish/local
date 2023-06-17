<template>
	<view class="container">
		<el-card class="form-card">
			<el-form ref="form" :model="formData">
				<el-form-item label="用户" prop="name">
					<el-input v-model.lazy.trim="formData.name" placeholder="请输入用户"></el-input>
				</el-form-item>
				<el-form-item label="礼金" prop="money">
					<el-input v-model.lazy.trim="formData.money" type="number" placeholder="请输入礼金"></el-input>
				</el-form-item>
				<el-form-item label="礼品" prop="gift">
					<el-input v-model.lazy.trim="formData.gift" placeholder="请输入礼品名称"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model.lazy.trim="formData.phone" type="tel" placeholder="请输入电话"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model.lazy.trim="formData.remark" placeholder="请输入备注"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model.lazy.trim="formData.address" placeholder="请输入地址"></el-input>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card class="button-card">
			<el-button class="button" type="success" @click="onSubmit">保存</el-button>
		</el-card>
	</view>
</template>

<script setup>
	import {
		reactive
	} from 'vue';

	import axios from "axios"

	const formData = reactive({
		name: '',
		money: '',
		gift: '',
		phone: '',
		remark: '',
		address: ''
	});

	function onSubmit() {
		console.log(formData);
		// 提交表单数据的逻辑
		axios.post("http://localhost:8089/accept", formData)
		  .then(response => {
		    console.log("添加完成");
		    // 处理成功的逻辑
		  })
		  .catch(error => {
		    console.error("请求失败:", error);
		    // 处理失败的逻辑
		  });
	}
</script>

<style scoped>
	.container {
		position: absolute;
		top: 20%;
		width: 100%;
	}

	.form-card {
		margin: 0 auto;
		width: 90%;
	}

	.button-card {
		position: absolute;
		top: 140%;
		width: 100%;
	}

	.button {
		width: 95%;
		height: 43px;
	}
</style>