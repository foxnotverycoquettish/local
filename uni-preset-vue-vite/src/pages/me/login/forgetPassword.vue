<template>
  <view class="register-page">
    <el-card class="register-card">
      <h2 style="margin-bottom: 25px;">忘记密码</h2>
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="80px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim="registerForm.phone" clearable placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <el-input v-model.trim="registerForm.verificationCode" clearable placeholder="请输入验证码"></el-input>
          <el-button type="primary" class="send-code" :disabled="countDown > 0" @click="sendVerificationCode">
            {{ countDown > 0 ? countDown + 's' : '发送验证码' }}
          </el-button>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="registerForm.password" type="password" clearable placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model.trim="registerForm.confirmPassword" type="password" clearable placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" width="90%" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
	  <view  class="login-link" @click="goToLogin">已有账号，去登录</view >
    </el-card>
  </view >
</template>


<script>
	import {
		ref
	} from 'vue';
	import {
		ElButton,
		ElCard,
		ElForm,
		ElFormItem,
		ElInput
	} from 'element-plus';

	export default {
		components: {
			ElButton,
			ElCard,
			ElForm,
			ElFormItem,
			ElInput,
		},
		setup() {
			const registerForm = ref({
				phone: '',
				verificationCode: '',
				password: '',
				confirmPassword: '',
			});

			const registerRules = ref({
				phone: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					},
					{
						pattern: /^1[3456789]\d{9}$/,
						message: '请输入正确的手机号',
						trigger: 'blur'
					},
				],
				verificationCode: [{
					required: true,
					message: '请输入验证码',
					trigger: 'blur'
				}, ],
				password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					{
						pattern: /^[a-zA-Z0-9_]{6,16}$/,
						message: '请输入6-16位字母、数字或下划线',
						trigger: 'blur'
					},
				],
				confirmPassword: [{
						required: true,
						message: '请再次输入密码',
						trigger: 'blur'
					},
					{
						validator: checkPasswordMatch,
						trigger: 'blur'
					},
				],
			});

			let countDown = 0;
			let timer = null;

			function checkPasswordMatch(rule, value, callback) {
				if (value !== registerForm.value.password) {
					return callback(new Error('两次输入的密码不一致'));
				}
				callback();
			}

			function sendVerificationCode() {
				const {
					phone
				} = registerForm.value;
				if (!phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
					});
					return;
				}
				if (!/^1[3456789]\d{9}$/.test(phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
					});
					return;
				}
				// TODO: Send verification code to the registered phone number
				// Mock implementation: Start a countdown timer for demo purposes
				countDown = 60;
				timer = setInterval(() => {
					countDown--;
					if (countDown <= 0) {
						clearInterval(timer);
					}
				}, 1000);
			}

			function register() {
				const {
					phone,
					verificationCode,
					password,
					confirmPassword
				} = registerForm.value;
				uni.showToast({
					title: '注册成功',
					icon: 'success',
				});
				// TODO: Perform registration logic here
			}

			function goToLogin() {
				uni.navigateTo({
					url: '/pages/login/login', // Replace with your login page URL
				});
			}

			return {
				registerForm,
				registerRules,
				countDown,
				sendVerificationCode,
				register,
				goToLogin,
			};
		},
	};
</script>

<style>
	.register-page {
		display: flex;
		align-items: center;
		justify-content: center;
		
		text-align: center;
	}

	.register-card {
		margin: 6% 3% 0px 3%;
	}
	
	.login-link {
		margin-left: 55%;
	}
</style>