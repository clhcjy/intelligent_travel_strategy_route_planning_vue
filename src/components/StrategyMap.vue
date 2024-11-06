<template>
    <div id="mapContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script>
import { loadBMapGL } from '../bmpgl';

export default {
    name: 'MapComponent',
    mounted() {
        this.initMap();
    },
    methods: {
        async initMap() {
            try {
                const BMapGL = await loadBMapGL('CmqN6RHNG91vSKhL9APJQhhrSgTSghgl');
                const map = new BMapGL.Map('mapContainer');
                const point = new BMapGL.Point(114.0596, 22.5429);
                map.centerAndZoom(point, 15);
                map.setCurrentCity("深圳");
                map.setMapStyleV2({
                    styleId: '858ac988b7e44629791444dd05828af4'
                });
                map.enableScrollWheelZoom(true);
                // 启用3D视图
                map.enableScrollWheelZoom(true);
               
                map.setHeading(64.5); // 设置地图旋转角度
                map.setTilt(73);      // 设置地图的倾斜角度
                
            } catch (error) {
                console.error('百度地图GL JS API 加载失败:', error);
            }
        },
    },
};
</script>

<style>
#mapContainer {
    width: 100%;
    height: 100vh;
}
</style>