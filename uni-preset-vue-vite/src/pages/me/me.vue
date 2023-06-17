<template>
	<view class="mian">
		<!-- top -->
		<el-card class="top">
			<!-- 头像登录 -->
			<view class="header" @click="login()">
				<view class="square">{{message.icon}}</view>
				<text>{{message.nickName}}</text>
			</view>

			<!-- top文字类容 -->
			<view>这是文字类容</view>
		</el-card>

		<!-- item类容 -->
		<el-card>
			<!-- 编辑 -->
			<view>
				<view>
					<view style="display: inline-block;position: relative;top: 10px;">

						<Edit style="width: 30px;height: 30px;" />
					</view>
					<view style="display: inline-block;width: 88%; margin-left: 10px;">
						<view style="display: flex;justify-content: space-between;">
							<span>编辑</span>
							<el-icon>
								<ArrowRight />
							</el-icon>
						</view>
					</view>
				</view>
				<el-divider border-style="dotted" />
			</view>

			<!-- 设置 -->
			<view>
				<view>
					<view style="display: inline-block;position: relative;top: 10px;">
						<el-icon>
							<Tools style="width: 30px;height: 30px;" />
						</el-icon>
					</view>
					<view style="display: inline-block;width: 90%; margin-left: 13px;">
						<view style="display: flex;justify-content: space-between;">
							<span>设置</span>
							<el-icon>
								<ArrowRight />
							</el-icon>
						</view>
					</view>
				</view>
				<el-divider border-style="dotted" />
			</view>
		</el-card>
	</view>
</template>

<script setup>
import  axios  from 'axios';
import {ref} from "vue";

let message = ref({
	nickName: '未登录',
	icon: ''
})
	
	// 获取个人信息
	function login() {
		console.log("dinal")
		try {
			const value = uni.getStorageSync("storage_key");
			if (value != '') {
				console.log("本地" + value);
				axois.get("http://localhost:8089/account/api/user/me").then((res)=>{
					console.log(res)
					message.value.nickName = res.data.data
				})
			} else {
				uni.redirectTo({
					url: "/pages/me/login/login"
				})
			}
		} catch (e) {
			// error
		}

	}
</script>

<style>
	.mian {
		margin: 5px 8px 5px 8px;
	}

	.el-card {
		padding: 0px;
		margin: 0px;
		margin-top: 5px;
		border-radius: 3%;
	}

	.top {
		margin-top: 5px;
		width: 100%;
		height: 310px;

	}

	.header {
		height: 206px;
		background-color: wheat;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.square {
		width: 90px;
		height: 90px;
		background-color: cyan;
		border-radius: 50%;
		margin-bottom: 16px;
	}
</style>