<template>
	<view>
		<!-- 搜索 -->
		<view @click="gotoSearch">
			<el-button style="margin: 0;padding: 0;width: 100%;">
				<el-image src="static/icon/search.png"
					style="width: 18px;height: 18px;position: relative;right: 30%;"></el-image>
				搜索
			</el-button>
		</view>

		<!-- 中间内容 -->
		<view class="main">
			<!-- 记账本个数 -->
			<el-card v-for="(value, index) in book" :key="index" class="book" @click="gotoHome">
				<h3>{{ value.className }}</h3>
				<el-form-item label="金额:" style="margin: 0px;">
					<el-space>{{ value.totalMoney }}</el-space>
				</el-form-item>
				<el-form-item label="人数:">
					<el-space>{{ value.totalPerson }}</el-space>
				</el-form-item>
				<el-text class="time">{{ value.createTime }}</el-text>
			</el-card>

			<!-- 添加账本 -->
			<el-card class="add-book" @click="toggleAddMode">
				添加
				<image src="../../static/add.png" style="width: 100px;height: 100px;"></image>
			</el-card>

			<!-- 显示添加模式 -->
			<view class="add-mode" v-show="isAddMode">
				<el-card>
					<el-form-item label="备注">
						<el-input v-model="note" type="text" />
					</el-form-item>
					<el-button style="width: 40%;" @click="onSubmit">保存</el-button>
				</el-card>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from "vue";
	import axios from "axios";

	const book = ref([]);
	const isAddMode = ref(false);
	const note = ref("");

	onMounted(async () => {
		try {
			const response = await axios.get("http://localhost:8089/select");
			book.value = response.data.data;
			console.log(response.data.data)
		} catch (error) {
			console.error(error);
		}
	});

	// 切换添加模式
	function toggleAddMode() {
		try {
			const value = uni.getStorageSync("storage_key");
			if (value != '') {
				console.log("本地"+value);
				isAddMode.value = !isAddMode.value;
			}else {
				uni.redirectTo({
					url:"/pages/me/login/login"
				})
			}
		} catch (e) {
			// error
		}
		
	}

	// 保存
	function onSubmit() {
		if (isAddMode.value) {
			isAddMode.value = false;
		}
	}

	// 跳转到主页
	function gotoHome() {
		console.log("点击率");
		uni.navigateTo({
			url: "/pages/index/home",
		});
	}

	// 跳转到搜索页
	function gotoSearch() {
		uni.navigateTo({
			url: "/pages/index/search/search",
		});
	}
</script>

<style>
	.main {
		display: flex;
		width: 90%;
		justify-content: space-around;
		margin-top: 10%;
		margin-left: 10px;
		margin-right: 10px;
		text-align: center;
		flex-flow: row wrap;
	}

	.book {
		height: 186px;
		width: 156px;
		margin-top: 15px;
	}

	.add-book {
		height: 186px;
		width: 156px;
		margin-top: 15px;
	}

	.add-mode {
		position: fixed;
		width: 90%;
		top: 30%;
	}
</style>