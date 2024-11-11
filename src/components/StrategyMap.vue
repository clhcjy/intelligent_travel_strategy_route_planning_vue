<template>
    <div id="mapContainer" style="width: 100%; height: 100vh;" />
</template>

<script>
import { loadBMapGL } from '../bmpgl';

function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
}


export default {
    name: 'MapComponent',
    mounted() {
        this.initMap();
    },
    data() {
        return {
            map: null
        };
    },
    methods: {
        async initMap() {
            try {
                const BMapGL = await loadBMapGL('CmqN6RHNG91vSKhL9APJQhhrSgTSghgl');
                const map = new BMapGL.Map('mapContainer');
                const point = new BMapGL.Point(114.0596, 22.5429);
                map.centerAndZoom(point, 15);
                // map.setCurrentCity("深圳");
                map.setMapStyleV2({
                    styleId: '858ac988b7e44629791444dd05828af4'
                });
                // 启用3D视图
                map.enableScrollWheelZoom(true);

                map.setHeading(64.5); // 设置地图旋转角度
                map.setTilt(73);      // 设置地图的倾斜角度

                // 创建自定义按钮覆盖物

                // 首页按钮
                const customButton = document.createElement('a');
                customButton.href = '#';
                customButton.textContent = '首页';
                customButton.style.position = 'absolute';
                customButton.style.top = '10px';
                customButton.style.left = '15px';
                customButton.style.zIndex = 1000;
                // customButton.style.padding = '10px 20px';
                // customButton.style.backgroundColor = '#0f1ff0';
                customButton.style.color = '#0f1ff0';
                customButton.style.border = 'none';
                customButton.style.borderRadius = '5px';
                customButton.style.cursor = 'pointer';
                // 添加点击事件
                customButton.onclick = this.handleButtonClick.bind(this);

                // 回家按钮
                const gohomeButton = document.createElement('a');
                gohomeButton.href = '#';
                gohomeButton.textContent = '回家';
                gohomeButton.style.position = 'absolute';
                gohomeButton.style.top = '10px';
                gohomeButton.style.left = '60px';
                gohomeButton.style.zIndex = 1000;
                gohomeButton.style.color = '#0f1ff0';
                gohomeButton.style.border = 'none';
                gohomeButton.style.borderRadius = '5px';
                gohomeButton.style.cursor = 'pointer';
                gohomeButton.onclick = this.gohomeClick.bind(this);

                // 添加按钮到地图容器
                map.getContainer().appendChild(customButton);
                map.getContainer().appendChild(gohomeButton);


            } catch (error) {
                console.error('百度地图GL JS API 加载失败:', error);
            }
        },
        gohomeClick() {
            let home = "深圳市宝安区福海街道重庆路11号新德公寓"
            loadScript(`https://api.map.baidu.com/geocoder/v2/?address=${home}&output=json&ak=YOUR_API_KEY&callback=handleResponse`);

        },
        handleButtonClick() {
            let userId = localStorage.getItem('userId')
            this.$router.push({ path: `/HomeMap/${userId}` });
        },


    },
};
</script>

<style>
#mapContainer {
    width: 100%;
    height: 100vh;
    position: relative;
    /* 确保按钮可以绝对定位 */
}

#customButton {
    padding: 10px 20px;
    /* 按钮内边距 */
    background-color: #080808;
    /* 按钮背景颜色 */
    color: white;
    /* 按钮文字颜色 */
    border: none;
    /* 无边框 */
    border-radius: 5px;
    /* 圆角边框 */
    cursor: pointer;
    /* 鼠标悬停时显示指针 */
}
</style>