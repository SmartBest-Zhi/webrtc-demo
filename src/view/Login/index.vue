<script setup lang="ts">
  import {ref, inject} from "vue";
  import {loginByUsername} from "./api/";
  import {useRouter} from "vue-router";

  const loginData = ref({
    username: "yczbest",
    password: "admin"
  })
  const router = useRouter()
  localStorage.removeItem("Galaxy_Token")
  const Login = async () => {
    const res= await loginByUsername(loginData.value)
    if (res.code === 200){
      window.message.success("登录成功")
      localStorage.setItem("Galaxy_Token", "Galaxy " + r.data)
      await router.push("/admin/userMgt")
    }
  }

  // 添加表单提交事件监听器
</script>

<template>
  <div class="body">
    <div class="login-container">
      <h2>Login</h2>
      <div class="login-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required v-model="loginData.username">
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required v-model="loginData.password">
        </div>
        <button id="login-submit" @click="Login">Login</button>
      </div>
    </div>

    <!--  出错/成功提示  -->

  </div>

</template>

<style scoped>

.body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background: url('@/assets/BG_Login.jpg') no-repeat center center fixed;
  background: black;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 400px;
  text-align: center;
}

.login-container h2 {
  color: #333;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  text-align: left;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

</style>
