<template>
    <div>
        <baidu-map class="map" :center="{ lng:location.lng, lat:location.lat }" :zoom="19" map-type="BMAP_HYBRID_MAP" dragging="true" scroll-wheel-zoom="true" inertial-dragging="true" continuous-zoom="true">
            <bm-overlay pane="labelPane" :class="{ sample: true, active }" @draw="draw" @mouseover="active = true"
                @mouseleave="active = false">
                <div @click="goHome()">回家</div>
            </bm-overlay>
        </baidu-map>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGeocoder } from 'vue-baidu-map-3x';


const active = ref(false);
const location = ref({
    lng: 114.0596,
    lat: 22.5429
});
const draw = ({ el, BMap, map }) => {
    const pixel = map.pointToOverlayPixel(new BMap.Point(114.0596, 22.5429)) // 返回的坐标为覆盖物的左上角坐标。
    el.style.left = pixel.x - 80 + 'px' // 最终坐标 = 覆盖物坐标 - 覆盖物宽度/2。 // 居中显示
    el.style.top = pixel.y - 0 + 'px'
};



const goHome = () => {
    // 通过地址获取坐标信息
    useGeocoder().then((geocoder) => {
        geocoder.getPoint('广东省深圳市宝安区福海街道重庆路11号新德公寓', (res) => {
            console.log(res);
            location.value.lng=res.lng
            location.value.lat=res.lat  
            console.log(location.value);
            
        });
        // 通过坐标获取地址信息
        // usePoint(116.404, 39.915).then(point => {
        //     geocoder.getLocation(point, (result) => {
        //         console.log(result);
        //     });
        // });
    });
}
</script>

<style>
.map {
    width: 100%;
    height: 100vh;
}

.sample {
    position: absolute;
    width: 80px;
    height: 30px;
    line-height: 40px;
    background: rgba(0, 0, 0, 0.8);
    overflow: hidden;
    box-shadow: 0 0 5px #000;
    color: #fff;
    text-align: center;
    /* text-justify: center; */
    padding: 10px;
}

.sample.active {
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
}
</style>