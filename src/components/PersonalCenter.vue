<template>
    <a-collapse :style="antLayoutStyle" v-model:activeKey="activeKey" :bordered="false" accordion expandIconPosition="end" :ghost="true"
        >
        <template #expandIcon="{ isActive }">
            <caret-right-outlined :rotate="isActive ? 90 : 0" />
        </template>
        <a-collapse-panel v-for="(item) in panels" :key="item.key" :header="item.header" :style="customStyle"
            :collapsible="ok == 1 ? 'none' : 'disabled'" style="border-bottom: 2px solid rgb(0, 0, 0, 0.2);">
            <div class="card-content" v-if="item.key == '1'">
                <div style="margin-bottom: 24px;width: 100%;">
                    <a-row>
                        <a-col :span="8">

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">头像：</p>
                                <a-avatar shape="square" size="large" :src="user.avatarUrl"
                                    @click="avatarProps(user.avatarUrl)" />
                            </div>

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">姓名：</p>
                                <a-input :bordered="false" style="width: 70%" v-model:value="user.username" disabled="true"
                                    placeholder="Basic usage" />
                            </div>

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">自我介绍：</p>
                                <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.self_introduction"
                                    disabled="true" placeholder="自我介绍" />
                            </div>

                        </a-col>
                        <a-col :span="8">

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">手机号：</p>
                                <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.cell_phone_number"
                                    disabled="true" placeholder="手机号" />
                            </div>

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">邮箱：</p>
                                <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.email" disabled="true"
                                    placeholder="邮箱" />
                            </div>

                        </a-col>
                    </a-row>
                </div>
            </div>
            <div class="card-content" v-if="item.key == '2'">
                <div style="margin-bottom: 24px;width: 100%;">
                    <a-row>
                        <a-col :span="8">
                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">主题：</p>
                                <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.theme" disabled="true"
                                    placeholder="主题" />
                            </div>

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">语言：</p>
                                <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.language"
                                    disabled="true" placeholder="语言" />
                            </div>

                        </a-col>
                        <a-col :span="8">

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">隐私设置：</p>
                                <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.privacy_settings"
                                    disabled="true" placeholder="隐私设置" />
                            </div>

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">访客记录：</p>
                                <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.visitor_record"
                                    disabled="true" placeholder="访客记录" />
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <div class="card-content" v-if="item.key == '3'">
                <div style="margin-bottom: 24px;width: 100%;">
                    <a-row>
                        <a-col :span="8">
                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">活动数据展示：</p>
                                <a-input :bordered="false" style="width: 70%" value="无" disabled="true"
                                    placeholder="Basic usage" />
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">社交数据展示：</p>
                                <a-input :bordered="false" style="width: 70%" value="无" disabled="true"
                                    placeholder="Basic usage" />
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">成就系统：</p>
                                <a-input :bordered="false" style="width: 70%" value="无" disabled="true"
                                    placeholder="Basic usage" />
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <template #extra><setting-outlined @click="handleClick(item)" /></template>
        </a-collapse-panel>
    </a-collapse>

    <a-modal v-model:open="open" width="80%" :title="SelectKey.header" :confirm-loading="confirmLoading" @ok="handleOk()"
        okText="确认" cancelText="取消" @cancel="handleCancel">
        <div v-if="SelectKey.key == '1'">
            <div style="margin-bottom: 24px;width: 100%;padding: 0 10% 0 10%;">
                <a-row>
                    <a-col :span="8">

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">头像：</p>
                            <a-avatar shape="square" size="large" :src="user.avatarUrl"
                                @click="avatarProps(user.avatarUrl)" />
                        </div>

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">姓名：</p>
                            <a-input :bordered="false" style="width: 70%" v-model:value="user.username"
                                placeholder="Basic usage" />
                        </div>

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">自我介绍：</p>
                            <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.self_introduction"
                                placeholder="Basic usage" />
                        </div>

                    </a-col>
                    <a-col :span="8">

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">手机号：</p>
                            <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.cell_phone_number"
                                placeholder="236436436734" />
                        </div>

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">邮箱：</p>
                            <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.email"
                                placeholder="3463474745858@qq.com" />
                        </div>

                    </a-col>
                </a-row>
            </div>
        </div>
        <div v-if="SelectKey.key == '2'">
            <div style="margin-bottom: 24px;width: 100%;">
                <a-row>
                    <a-col :span="8">
                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">主题：</p>
                            <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.theme"
                                placeholder="Basic usage" />
                        </div>

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">语言：</p>
                            <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.privacy_settings"
                                placeholder="Basic usage" />
                        </div>

                    </a-col>
                    <a-col :span="8">

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">隐私设置：</p>
                            <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.privacy_settings"
                                placeholder="Basic usage" />
                        </div>

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">访客记录：</p>
                            <a-input :bordered="false" style="width: 70%" v-model:value="userInfo.visitor_record"
                                placeholder="Basic usage" />
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div v-if="SelectKey.key == '3'">
            <div style="margin-bottom: 24px;width: 100%;">
                <a-row>
                    <a-col :span="8">
                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">活动数据展示：</p>
                            <a-input :bordered="false" style="width: 70%" value="无" placeholder="Basic usage" />
                        </div>
                    </a-col>
                    <a-col :span="8">
                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">社交数据展示：</p>
                            <a-input :bordered="false" style="width: 70%" value="无" placeholder="Basic usage" />
                        </div>
                    </a-col>
                    <a-col :span="8">
                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">成就系统：</p>
                            <a-input :bordered="false" style="width: 70%" value="无" placeholder="Basic usage" />
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>
    </a-modal>
</template>
<style>
    .card-content{
        background-color: transparent !important;
    }
</style>
<script setup>
import { onMounted, ref } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import { CaretRightOutlined } from '@ant-design/icons-vue';
import api from '../api/request.js';
import { message } from 'ant-design-vue';
import { computed } from 'vue';

const backgroundUrl = 'https://file.moyublog.com/d/file/2020-11-17/1686e69048d6f3a51d8fc85fdac16074.jpg'; // 替换为你的图片 URL

const antLayoutStyle = computed(() => ({
  minHeight: '100vh',
  background: `url(${backgroundUrl}) no-repeat center center fixed`,
  backgroundSize: 'cover',
}));

const activeKey = ref(['1']);
const ok = ref(1);
// const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const customStyle =
    'border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
    // background: #f7f7f7;
const user = ref({});

const SelectKey = ref({});

const userInfo = ref({});

const panels = ref([
    { key: '1', header: '个人信息' },
    { key: '2', header: '个性化设置' },
    { key: '3', header: '数据可视化' },
    { key: '4', header: '互动与反馈' }
]);

const open = ref(false);
const confirmLoading = ref(false);

const handleOk = () => {
    api.post("/userInfo/updateUserInfo", {
        user_id: user.value.id,
        cell_phone_number: userInfo.value.cell_phone_number,
        email: userInfo.value.email,
        language: userInfo.value.language,
        theme: userInfo.value.theme,
        self_introduction: userInfo.value.self_introduction,
        privacy_settings: userInfo.value.privacy_settings,
        visitor_record: userInfo.value.visitor_record,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.data == 'success') {
            confirmLoading.value = true;
            message.success("修改个人信息成功", 3);
            setTimeout(() => {
                open.value = false;
                confirmLoading.value = false;
            }, 2000);
            ok.value = 1;
        }
    });
};

const handleCancel = () => {
    open.value = false;
    ok.value = 1;
}

const handleClick = (event) => {
    ok.value = 0;
    SelectKey.value = event;
    open.value = true;
}

const avatarProps = (url) => {
    const iframe = document.createElement("iframe");
    iframe.src = `data:text/html;charset=utf-8,encodeURI("<html><body style='margin:0;'><img src='${url}' style='max-width:100%; height:auto;'></body></html>")`;
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.style.border = "none";

    const newWindow = window.open("", "_blank");
    newWindow.document.body.appendChild(iframe);
}

onMounted(() => {
    api.get(`/findByIdRest/${localStorage.getItem('userId')}`).then((res) => {
        user.value = res.data;
        api.post("/userInfo/getUserInfoByUserId", {
            userId: user.value.id
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res) => {
            userInfo.value = res.data;
        });
    });
})
</script>