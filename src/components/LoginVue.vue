<template>
  <div class="login-register-container">
    <a-card class="login-register-card">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="登录">
          <!-- 登录表单 -->
          <a-form @submit="onLoginSubmit">
            <a-form-item>
              <a-input placeholder="用户名" v-model:value="loginForm.username">
                <template #prefix>
                  <a-icon type="user" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input placeholder="密码" type="password" v-model:value="loginForm.password">
                <template #prefix>
                  <a-icon type="lock" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">登录</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册" forceRender>
          <!-- 注册表单 -->
          <a-form @submit="onRegisterSubmit">
            <a-form-item>
              <a-input placeholder="用户名" v-model:value="registerForm.username">
                <template #prefix>
                  <a-icon type="user" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input placeholder="密码" type="password" v-model:value="registerForm.password">
                <template #prefix>
                  <a-icon type="lock" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">注册</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import { Form, Input, Button, Card, Tabs, message } from 'ant-design-vue';
import api from '@/api/request.js';
export default {
  components: {
    'a-form': Form,
    'a-input': Input,
    'a-button': Button,
    'a-card': Card,
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      registerForm: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    onLoginSubmit(e) {
      e.preventDefault();
      console.log('Login:', this.loginForm);
      // 处理登录逻辑
      api.post("/login", { username: this.loginForm.username, password: this.loginForm.password }).then(() => {
        setTimeout(() => {
          message.success("登录成功", { duration: 5000 });
        }, 1000); // 延迟1秒显示成功消息
      }).catch(err => {
        setTimeout(() => {
          message.error("登录失败：", err, { duration: 5000 })
        }, 1000); // 延迟1秒显示成功消息
      })
    },
    onRegisterSubmit(e) {
      e.preventDefault();
      console.log('Register:', this.registerForm);
      // 处理注册逻辑
      api.post("/register", { username: this.registerForm.username, password: this.registerForm.password }).then(() => {
        setTimeout(() => {
        message.success("注册成功",  { duration: 5000 })
        }, 1000); // 延迟1秒显示成功消息
      }).catch(err => {
        setTimeout(() => {
        message.error("注册失败：", err, { duration: 5000 })
        }, 1000); // 延迟1秒显示成功消息
      })
    },
  },
};
</script>

<style scoped>
.login-register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/163720-1730623040d905.jpg');
  /* 替换为你的背景图片 */
  background-size: cover;
  background-position: center;
}

.login-register-card {
  width: 400px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  /* 半透明背景 */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>