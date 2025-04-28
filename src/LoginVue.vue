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
            <!-- 头像 -->
            <a-form-item>
              <div style="text-align: center;">
                <a-upload name="file" class="avatar-uploader" :show-upload-list="false" :before-upload="beforeUpload"
                  :action="uploadUrl" :headers="headers" @change="handleUploadChange">
                  <div v-if="imageUrl" class="avatar">
                    <img :src="imageUrl" alt="头像">
                  </div>
                  <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">
                      <a>上传头像</a>
                    </div>
                  </div>
                </a-upload>
              </div>
            </a-form-item>

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
              <a-input placeholder="确认密码" type="password" v-model:value="registerForm.confirmPassword">
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
      headers: {
        Authorization: 'Bearer your-token-here', // 如果需要的话
      },
      uploadUrl: 'http://localhost:8081/upload/User',
      loginForm: {
        username: '',
        password: '',
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        avatarUrl: ''
      },
      loading: false,
      imageUrl: '',
    };
  },
  methods: {
    onLoginSubmit(e) {
      e.preventDefault();
      console.log('Login:', this.loginForm);
      // 处理登录逻辑
      api.post("/login", { username: this.loginForm.username, password: this.loginForm.password }).then(res => {
        if (res.data === '') {
          message.error("登录失败：用户名或者密码错误")
        }
        else {
          message.success("登录成功");
          console.log(res.data.id);
          localStorage.setItem('userId', JSON.stringify(res.data.id)); // 保存变量到localStorage
          this.$router.push({ path: `/HomeMap/${res.data.id}` });
          api.post("/record/insert", { uid: res.data.id },{headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          }}).then(res => {
            console.log("保存成功",res.data);
            
          })
        }
      }).catch(err => {
        message.error("登录失败：", err)
      })
    },
    onRegisterSubmit(e) {
      e.preventDefault();
      // 表单验证逻辑
      if (this.registerForm.username === '') {
        alert('请输入用户名');
        return;
      }
      if (this.registerForm.password === '') {
        alert('请输入密码');
        return;
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert('两次输入的密码不一致');
        return;
      }

      // 提交表单数据
      console.log('注册表单数据:', this.registerForm);

      // 处理注册逻辑
      api.post("/register", { username: this.registerForm.username, password: this.registerForm.password, avatarUrl: this.registerForm.avatarUrl,createTime : new Date().getFullYear() + "-" + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + "-" + (new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate()) + ' ' + (new Date().getHours() > 9 ? new Date().getHours() : '0' + new Date().getHours()) + ':' + (new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes()) + ':' + (new Date().getSeconds() > 9 ? new Date().getSeconds() : '0' + new Date().getSeconds()) }).then(() => {
        message.success("注册成功")
        api.post("/login", { username: this.registerForm.username, password: this.registerForm.password }).then(res => {
          if (res.data === '') {
            message.error("登录失败：用户名或者密码错误")
          }
          else {
            message.success("登录成功");
            console.log(res.data.id);
            localStorage.setItem('userId', JSON.stringify(res.data.id)); // 保存变量到localStorage
            this.$router.push({ path: `/HomeMap/${res.data.id}` });
          }
        }).catch(err => {
          message.error("登录失败：", err)
        })
      }).catch(err => {
        message.error("注册失败：", err)
      })
    },
    // 上传头像
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('只能上传 JPG 或 PNG 格式的图片!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    handleUploadChange(info) {
      const { status, response } = info.file;
      console.log("response", response);

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log("response", response);
        const i = response.split(':')
        i.shift();
        this.registerForm.avatarUrl = i.join(':');
        this.imageUrl = i.join(':');
        this.$message.success(`${info.file.name} 文件上传成功.`);
        console.log("imageUrl", i);

      } else if (status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败.`);
      }

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
  background-image: url('./assets/163720-1730623040d905.jpg');
  /* 替换为你的背景图片 */
  background-size: cover;
  background-position: center;
}

.avatar-uploader {
  width: 128px;
  height: 128px;
  border-radius: 50% !important;
}

.login-register-card {
  width: 400px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  /* 半透明背景 */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 移除头像上传框的背景 */
.ant-upload-select-picture-card {
  background-color: transparent !important;
  /* 去除背景颜色 */
  border: none !important;
  /* 去除边框 */
  border-radius: 50% !important;
  /* 去除圆角 */
}

/* 移除图标和文字的背景 */
.ant-upload-select-picture-card i,
.ant-upload-text {
  /* color: rgba(255, 255, 255, 0.8) !important; 根据需要调整颜色 */
  background-color: transparent !important;
  /*去除背景颜色*/
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
  border-radius: 50% !important;
}

.avatar {
  width: 100px;
  /* 头像宽度 */
  height: 100px;
  /* 头像高度 */
  border-radius: 50%;
  /* 圆形头像 */
  overflow: hidden;
  /* 隐藏溢出部分 */
  position: relative;
  /* 相对定位 */
  margin: auto;
  /* 水平居中 */
  display: flex;
  /* 使用flex布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
}

.avatar img {
  width: 100%;
  /* 图片宽度填满容器 */
  height: 100%;
  /* 图片高度填满容器 */
  object-fit: cover;
  /* 裁剪图片以填充容器 */
  border-radius: 50%;
  /* 圆形图片 */
}
</style>