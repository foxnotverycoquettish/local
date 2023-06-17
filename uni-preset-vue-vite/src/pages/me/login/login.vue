<template>
	<el-card style="margin: 25% 3% 0px 3%; text-align: center;">
		<h2>验证码登录</h2>
		<el-form class="login-form" ref="loginForm" :model="loginData">
			<el-form-item prop="phone">
				<el-input v-model="loginData.phone" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item prop="code">
				<el-input v-model="loginData.code" placeholder="请输入验证码"></el-input>
				<el-button class="send-code" :disabled="isCountingDown" @click="sendVerificationCode">
					{{ countDownText }}
				</el-button>
			</el-form-item>
			<el-form-item>
				<el-button style="width: 98%;" type="primary" @click="login">登录</el-button>
			</el-form-item>
		</el-form>
		<view style="display: flex;justify-content: space-between;">
			<text @click="register()">密码登陆</text>
		</view>
	</el-card>

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
	
	import axios from "axios"

	const loginData = reactive({
		phone: '',
		code: '',
	});

	const countDownText = ref('发送验证码');
	const isCountingDown = ref(false);

	const sendVerificationCode = () => {
		if (!isCountingDown.value) {
			// 发送验证码的逻辑
			axios.post("http://localhost:8089/account/api/user/code?phone="+loginData.phone)
			startCountDown();
		}
	};

	const startCountDown = () => {
		isCountingDown.value = true;
		let count = 60;
		const timer = setInterval(() => {
			count--;
			if (count > 0) {
				countDownText.value = `${count}秒后重发`;
			} else {
				clearInterval(timer);
				isCountingDown.value = false;
				countDownText.value = '发送验证码';
			}
		}, 1000);
	};

	const login = () => {
		// 登录的逻辑
		console.log('登录', loginData);
		axios.post("http://localhost:8089/account/api/user/login", loginData, {
		  headers: {
		    Authorization: "Bearer [token]" // 替换为实际的身份验证令牌
		  }
		})
		  .then(response => {
		    console.log("添加完成"+response);
		    // 处理成功的逻辑
			uni.setStorage({
				key: 'storage_key',
				data: response,
				success: function () {
					console.log('success');
					uni.switchTab({
						url:"/pages/index/index"
					})
				}
			});
		  })
		  .catch(error => {
		    console.error("请求失败:", error);
		    // 处理失败的逻辑
		  });
	};

// 账号登录
	function register(){
		uni.navigateTo({
			url:"/pages/me/login/register"
		})
	}
	
</script>

<style>
	.login-form {
		max-width: 300px;
		margin: 0 auto;
		padding: 20px;
	}

	.send-code {
		position: relative;
		top: -50%;
		left: 65%;

		/* margin-left: 14px; */
	}
</style>