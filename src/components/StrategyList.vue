<template>
    <div v-if="projects.length > 0" class="card-wrapper">
        <a-card :loading="loading" hoverable v-for="(item, index) in projects" :key="index"
            style="width: 200px;margin: 20px;" @click="toMap(item)">
            <template #cover>
                <div style="width:200px;height: 134px;">
                    <img v-if="item.picture == null"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    <img v-else alt="example" :src="item.picture" />
                </div>
            </template>
            <template #actions>
                <a-upload v-if="isEditPicture == true && editValuePicture == item.pid" name="file"
                    class="avatar-uploader" :show-upload-list="false" :before-upload="beforeUpload" :action="uploadUrl"
                    :headers="headers" @change="handleUploadChange" v-model:file-list="fileList">
                    <div>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">
                            <a>上传封面</a>
                        </div>
                    </div>
                </a-upload>
                <a-button v-else type="link" @click="EditPicture(item)">修改封面</a-button>

                <a-input v-if="isEditName == true && editValue == item.pid" v-model:value="item.projectName"
                    placeholder="修改名称" @pressEnter="ToEditName(item)" />
                <a-button v-else type="link" @click="EditName(item)">修改名称</a-button>
            </template>
            <a-card-meta :title="item.projectName" class="ellipsis">
            </a-card-meta>
        </a-card>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/request.js'
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(true);
const isEditName = ref(false);
const isEditPicture = ref(false);
const editValuePicture = ref(null);
const projects = ref([]);
const editValue = ref(null);
const fileList = ref([]);
const uploadUrl = 'http://192.168.1.47:8081/upload/User';
const headers = {
    Authorization: 'Bearer your-token-here', // 如果需要的话
};
const imageUrl = ref(null);

const toMap = (item) => {
    router.push({ name: 'StrategyMap',query: { pid: item.pid,projectName:item.projectName,picture:item.picture }});
};

const handleUploadChange = ({ file, fileList }) => {

    const { status, response } = file;

    if (status !== 'uploading') {
        console.log(file, fileList);
    }
    if (status === 'done') {
        console.log("response", response);
        const i = response.split('+')
        let item = projects.value.find(item => item.pid === editValuePicture.value)
        item.picture = i[1];
        api.post("/project/update", item, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            message.success("修改成功", res);
            isEditPicture.value = false;
        }).catch(error => {
            message.error("修改失败:", error);
        })
        imageUrl.value = i[1]
        message.success(`${file.name} 文件上传成功.`);
    } else if (status === 'error') {
        message.error(`${file.name} 文件上传失败.`);
    }

};

const EditPicture = (item) => {
    editValuePicture.value = item.pid;
    isEditPicture.value = true;
    console.log(item);
};

const EditName = (item) => {
    console.log(item);
    editValue.value = item.pid;
    isEditName.value = true;
};

const ToEditName = (item) => {
    console.log(item);
    isEditName.value = false;
    api.post("/project/update", item, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        message.success("修改成功", res);
    }).catch(error => {
        message.error("修改失败:", error);
    })
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传 JPG 或 PNG 格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

onMounted(() => {
    api.post("/project/searchByUid", { uid: localStorage.getItem('userId') }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        projects.value = res.data.map((item) => {
            return item;
        })
        loading.value = false;
    }).catch(error => {
        message.error("获取数据失败:", error);
    })
})
</script>
<style scoped>
.card-wrapper {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>