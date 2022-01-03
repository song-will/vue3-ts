<template>
    <div class="login-wrapper">
        <div class="login-content">
            <h2>CHAT LOGIN</h2>
            <el-form :model="formData">
                <el-form-item label="username:">
                    <el-input v-model="formData.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item label="password:">
                    <el-input v-model="formData.password" placeholder="password"></el-input>
                </el-form-item>
                <div class="btn login">
                    <el-button type="primary" size="medium" @click="submit">LOGIN</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { userLogin } from "../api/index";
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex'
import { key } from '../store'

interface FormData {
  username:string
  password:string
}

const formData = reactive<FormData>({
    username: "",
    password: ""
});
const store = useStore(key)
console.log('store', store.state.count)
const submit = async () => {
    const data = await userLogin(formData).catch(err => {
        console.error('err', err)
    })
    console.log('data', data)
    // store.commit('increment')
    // console.log('store', store.state.count)
    store.commit('initSocket', {
        token: data,
        connectedCallback () {
        }
    })
    linkToHome();
};
const router = useRouter();
const linkToHome = () => {
    console.log("router", router);
    router.push({
        path: "/container",
    });
};
</script>

<style lang="less" scoped>
.login-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("@/assets/image/login.jpeg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    h2 {
        text-align: center;
    }
    .login-content {
        width: 400px;
        height: 260px;
        background: rgb(255, 255, 255);
        border-radius: 10px;
        padding: 20px;
    }
    .btn {
        display: flex;
        justify-content: center;
    }
}
</style>
