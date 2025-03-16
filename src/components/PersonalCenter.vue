<template>
    <a-collapse v-model:activeKey="activeKey" :bordered="false" accordion expandIconPosition="end"
        style="background: rgb(255, 255, 255)">
        <template #expandIcon="{ isActive }">
            <caret-right-outlined :rotate="isActive ? 90 : 0" />
        </template>
        <a-collapse-panel v-for="(item) in panels" :key="item.key" :header="item.header" :style="customStyle"
            :collapsible="ok == 1 ? 'none' : 'disabled'">
            <div v-if="item.key == '1'">
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
                                <a-input :bordered="false" style="width: 70%" v-model:value="user.username"
                                    disabled="true" placeholder="Basic usage" />
                            </div>

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">自我介绍：</p>
                                <a-input :bordered="false" style="width: 70%" v-model:value="user.username"
                                    disabled="true" placeholder="Basic usage" />
                            </div>

                        </a-col>
                        <a-col :span="8">

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">手机号：</p>
                                <a-input :bordered="false" style="width: 70%" v-model:value="value" disabled="true"
                                    placeholder="236436436734" />
                            </div>

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">邮箱：</p>
                                <a-input :bordered="false" style="width: 70%" v-model:value="value" disabled="true"
                                    placeholder="3463474745858@qq.com" />
                            </div>

                        </a-col>
                    </a-row>
                </div>
            </div>
            <div v-if="item.key == '2'">
                <div style="margin-bottom: 24px;width: 100%;">
                    <a-row>
                        <a-col :span="8">
                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">主题：</p>
                                <a-input :bordered="false" style="width: 70%" value="默认" disabled="true"
                                    placeholder="Basic usage" />
                            </div>

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">语言：</p>
                                <a-input :bordered="false" style="width: 70%" value="中文" disabled="true"
                                    placeholder="Basic usage" />
                            </div>

                        </a-col>
                        <a-col :span="8">

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">隐私设置：</p>
                                <a-input :bordered="false" style="width: 70%" value="公开" disabled="true"
                                    placeholder="Basic usage" />
                            </div>

                            <div style="display: flex;margin-top: 20px;align-items: center;">
                                <p style="align-items: center;margin: 5px 0 5px 0 !important;">访客记录：</p>
                                <a-input :bordered="false" style="width: 70%" value="无" disabled="true"
                                    placeholder="Basic usage" />
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <div v-if="item.key == '3'">
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

    <a-modal v-model:open="open" width="80%" :title="SelectKey.header" :confirm-loading="confirmLoading" @ok="handleOk" okText="确认"
        cancelText="取消" @cancel="handleCancel">
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
                            <a-input :bordered="false" style="width: 70%" v-model:value="user.username"
                                placeholder="Basic usage" />
                        </div>

                    </a-col>
                    <a-col :span="8">

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">手机号：</p>
                            <a-input :bordered="false" style="width: 70%" v-model:value="value"
                                placeholder="236436436734" />
                        </div>

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">邮箱：</p>
                            <a-input :bordered="false" style="width: 70%" v-model:value="value"
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
                            <a-input :bordered="false" style="width: 70%" value="默认" placeholder="Basic usage" />
                        </div>

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">语言：</p>
                            <a-input :bordered="false" style="width: 70%" value="中文" placeholder="Basic usage" />
                        </div>

                    </a-col>
                    <a-col :span="8">

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">隐私设置：</p>
                            <a-input :bordered="false" style="width: 70%" value="公开" placeholder="Basic usage" />
                        </div>

                        <div style="display: flex;margin-top: 20px;align-items: center;">
                            <p style="align-items: center;margin: 5px 0 5px 0 !important;">访客记录：</p>
                            <a-input :bordered="false" style="width: 70%" value="无" placeholder="Basic usage" />
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
<script setup>
import { onMounted, ref } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import { CaretRightOutlined } from '@ant-design/icons-vue';
import api from '../api/request.js';
const activeKey = ref(['1']);
const ok = ref(1);
// const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const customStyle =
    'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';

const user = ref({});

const SelectKey = ref({});

const panels = ref([
    { key: '1', header: '个人信息' },
    { key: '2', header: '个性化设置' },
    { key: '3', header: '数据可视化' },
    { key: '4', header: '互动与反馈' }
]);

const modalText = ref('Content of the modal');
const open = ref(false);
const confirmLoading = ref(false);

const handleOk = () => {
    modalText.value = 'The modal will be closed after two seconds';
    confirmLoading.value = true;
    setTimeout(() => {
        open.value = false;
        confirmLoading.value = false;
    }, 2000);
    ok.value = 1;
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
    });
})
</script>