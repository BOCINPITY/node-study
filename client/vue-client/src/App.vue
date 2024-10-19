<template>
	<el-menu
			mode="horizontal"
			class="el-menu"
			default-active="1"
	>
		<RouterLink to="/">
			<el-menu-item index="1">首页</el-menu-item>
		</RouterLink>

		<RouterLink to="/about">
			<el-menu-item index="2">
				受保护的页面
			</el-menu-item>
		</RouterLink>

		<RouterLink to="/login">
			<el-menu-item index="3" class="login-menu-item">登录</el-menu-item>
		</RouterLink>

	</el-menu>


	<RouterView/>
</template>

<script setup lang="ts">


</script>

<style lang="scss" scoped>
.el-menu {
	a {
		text-decoration: none;
	}

	.el-menu-item {
		font-size: 18px;
	}

}

</style>
