<template>
	<view style="text-align: center;">
		<el-card style="margin: 25% 3% 0px 3%;">
			<h2>账号登录</h2>
			<el-form class="login-form" ref="loginForm" :model="loginData" :rules="loginRules">
				<el-form-item prop="phone" :rules="phoneRules">
					<el-input v-model="loginData.phone" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item prop="password" :rules="passwordRules">
					<el-input v-model="loginData.password" placeholder="请输入密码" :show-password="true"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button style="width: 100%;" type="primary" @click="login">登录</el-button>
				</el-form-item>
			</el-form>
			
			<view style="display: flex;justify-content: space-between;">
				<text @click="forgetPassword()">忘记密码</text>
				
			</view>
		</el-card>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		ElForm,
		ElFormItem,
		ElInput,
		ElButton
	} from 'element-plus';

	const loginData = reactive({
		phone: '',
		password: '',
	});

	const phoneRules = [{
			required: true,
			message: '请输入手机号',
			trigger: 'blur'
		},
		{
			pattern: /^1[3456789]\d{9}$/,
			message: '手机号格式不正确',
			trigger: 'blur',
		},
	];

	const passwordRules = [{
			required: true,
			message: '请输入密码',
			trigger: 'blur'
		},
		{
			min: 6,
			max: 20,
			message: '密码长度应为6-20位',
			trigger: 'blur'
		},
	];

	const login = () => {
		const valid = ref(null);
		valid.value = true;
		if (!valid.value) {
			return;
		}
		// 登录的逻辑
		console.log('登录', loginData);
	};
	
	
	// 忘记密码
	function forgetPassword(){
		uni.navigateTo({
			url: "/pages/me/login/forgetPassword"
		})
	}
	
</script>

<style>
	.login-form {
		max-width: 300px;
		margin: 0 auto;
		padding: 20px;
	}
</style>