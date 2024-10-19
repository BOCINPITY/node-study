<template>
	<div class="login-container">
		<el-form :model="loginForm" style="max-width: 300px" label-position="top">
			<el-form-item>
				<template #label >account</template>
				<el-input v-model="loginForm.loginId" type="text" autocomplete="off"/>
			</el-form-item>
			<el-form-item>
				<template #label >loginPwd</template>
				<el-input v-model="loginForm.loginPwd" type="password" autocomplete="off"/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="Login({...loginForm})">login</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";

import {useUserStore} from "@/stores/loginUser";
const {Login} = useUserStore()
const loginForm = reactive({
	loginId: "",
	loginPwd: ""
})


</script>

<style lang="scss" scoped>
@use "@/assets/variable";
.loading{
	font-size: 12px;
}
</style>