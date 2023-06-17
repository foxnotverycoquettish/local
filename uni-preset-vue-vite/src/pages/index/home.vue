<template>
	<view>
		<!-- 搜索-->
		<view @click="search">
			<el-button style="margin: 0;padding: 0;width: 100%;">
				<el-image src="/static/icon/search.png"
					style="width: 18px;height: 18px;position: relative;right: 30%;"></el-image>搜索</el-button>
		</view>

		<el-header style="margin: 0;padding: 0; width: 100%;">
			<el-card style="width: 100%;height: 50px;text-align: center;">
				<el-form style="display: inline-block;width: 70%;">
					<el-form-item label="总金额:">{{computedTotalMoney}}</el-form-item>
				</el-form>
				<el-form style="display: inline-block;">
					<el-form-item label="总人数:">{{computedTotalPerson}}</el-form-item>
				</el-form>
			</el-card>
		</el-header>

		<!-- 中间类容 -->
		<view v-for="(value, index) in tableData" :key="index" style="position: relative;width: 100%;">
			<el-card style="margin: 8px 7px 0px 7px;" @click="to(index)">
				<el-form>
					<div style="display: inline-block; width:70%">
						<el-form-item label="用户名:">
							<el-space>{{value.name}}</el-space>
						</el-form-item>
					</div>
					<div style="display: inline-block;width:30%">
						<el-text>{{value.Time}}</el-text>
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

				<el-form style="display: inline-block; width: 40%;">
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
		</view>

	</view>
</template>

<script setup>
	import axios from "axios";
	import {
		ref,
		computed,
		watch
	} from 'vue';

	import {
		onNavigationBarButtonTap,
		onTabItemTap,
		onInit,
	} from '@dcloudio/uni-app';

	const tableData = ref([]);
	const totalMoney = ref(0);
	const totalPerson = ref(0);

	// 获取表格数据
	async function getTableData() {
		const res = await axios.get("http://localhost:8089/show");
		if (res?.data?.data) {
			tableData.value = res.data.data;
			updateTotalMoney();
			updateTotalPerson();
		}
	}

	// 跳转到详情页
	function to(index) {
		uni.navigateTo({
			url: "/pages/index/detail?obj=" + encodeURIComponent(JSON.stringify(tableData.value[index]))
		});
	}

	// 跳转到搜索页
	function search() {
		uni.navigateTo({
			url: "/pages/index/search/search",
		});
	}

	// 更新总金额
	function updateTotalMoney() {
		totalMoney.value = tableData.value.reduce(
			(prev, curr) => prev + curr.money,
			0
		);
	}

	// 更新总人数
	function updateTotalPerson() {
		totalPerson.value = tableData.value.length;
	}

	getTableData();

	const computedTotalMoney = computed(() => totalMoney.value);
	const computedTotalPerson = computed(() => totalPerson.value);

	// 监听tableData变化，如果发生变化则重新计算总金额和总人数
	watch(tableData, () => {
		updateTotalMoney();
		updateTotalPerson();
	});

	// 导航栏处理函数
	onNavigationBarButtonTap((e) => {
		if (e.text == "添加") {
			uni.navigateTo({
				url: "/pages/index/add"
			});
		}
	})
</script>

<style scoped>
	.el-space {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>