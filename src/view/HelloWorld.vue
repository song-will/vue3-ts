<!--<script setup>-->
<!--import io from "socket.io-client";-->
<!--import { onMounted, ref, watch, reactive } from "vue";-->
<!--import { userLogin } from "../api";-->

<!--const URL = "http://127.0.0.1:6060";-->
<!--const WL = "http://192.168.144.26:9092";-->

<!--defineProps({-->
<!--    msg: String,-->
<!--});-->

<!--const formData = reactive({-->
<!--    username: null,-->
<!--    message: null,-->
<!--	receiver: null,-->
<!--	user: null,-->

<!--});-->

<!--const user = ref('')-->

<!--const submitUserInfo = async () => {-->
<!--    const userId = await userLogin(formData).catch((err) => {-->
<!--        throw err;-->
<!--	});-->
<!--    if (userId) {-->
<!--		formData.user = user.value = userId-->
<!--        initSocket(userId);-->
<!--    }-->
<!--};-->

<!--const count = ref(0);-->
<!--const socket = ref(null);-->

<!--const initSocket = (token) => {-->
<!--    socket.value = io(URL, {-->
<!--        transports: ["websocket", "polling"],-->
<!--        path: "/im",-->
<!--        auth: {-->
<!--            token,-->
<!--        },-->
<!--    });-->
<!--    socket.value.on("connect", (data) => {-->
<!--        console.log("connect", "已连接");-->
<!--	});-->
<!--	socket.value.on("msg", data => {-->
<!--		formData.content = data.content-->
<!--	})-->
<!--};-->

<!--const send = () => {-->
<!--    console.log("send", socket.value,formData.receiver, formData.message);-->
<!--    if (socket.value && formData.receiver && formData.message) {-->
<!--        socket.value.emit("msg", formData);-->
<!--    }-->
<!--};-->

<!--// onMounted(initSocket);-->
<!--</script>-->

<!--<template>-->
<!--    <h1>{{ msg }}</h1>-->
<!--    <div class="login">-->
<!--        <el-form ref="form" :model="formData" :label-width="120">-->
<!--			<el-form-item label="user">-->
<!--				<span>{{user}}</span>-->
<!--			</el-form-item>-->
<!--            <el-form-item label="username">-->
<!--                <el-input v-model="formData.username"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="message">-->
<!--                <el-input v-model="formData.message"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="receiver">-->
<!--                <el-input v-model="formData.receiver"></el-input>-->
<!--            </el-form-item>-->
<!--			<el-form-item label="content">-->
<!--				<el-input :value="formData.content" readonly></el-input>-->
<!--			</el-form-item>-->
<!--        </el-form>-->
<!--        <el-button type="primary" @click="submitUserInfo">login</el-button>-->
<!--        <el-button type="primary" @click="send">send</el-button>-->
<!--    </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--h1 {-->
<!--    text-align: center;-->
<!--}-->
<!--</style>-->
