<template>
    <div>
        <baidu-map class="map" :center="{ lng: location.lng, lat: location.lat }" :zoom="19" map-type="BMAP_HYBRID_MAP"
            dragging="true" scroll-wheel-zoom="true" inertial-dragging="true" continuous-zoom="true"
            :mapStyle="mapStyle" @moving="movingMap">
            <bm-control >
                <button @click="goHome()" style="display: inherit;">回家</button>
                <button @click="goHome()" style="display: inherit;">回家</button>
                <button @click="goHome()" style="display: inherit;">回家</button>
                <bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT"
                    style="width: 44px;height: 28px; margin-left: 20px"></bm-city-list>
            </bm-control>

        </baidu-map>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGeocoder } from 'vue-baidu-map-3x';

const location = ref({
    lng: 114.0596,
    lat: 22.5429
});

const goHome = () => {
    // 通过地址获取坐标信息
    useGeocoder().then((geocoder) => {
        geocoder.getPoint('广东省深圳市宝安区福海街道重庆路11号新德公寓', (res) => {
            console.log(res);
            location.value.lng = res.lng
            location.value.lat = res.lat
            console.log(location.value);

        });
        // 通过坐标获取地址信息
        // usePoint(116.404, 39.915).then(point => {
        //     geocoder.getLocation(point, (result) => {
        //         console.log(result);
        //     });
        // });
    });
};

const movingMap = (event) => {
    console.log(event);
    
    const {lng, lat} = event.target.getCenter()
      location.value.lng = lng
      location.value.lat = lat
}

const mapStyle = ref({
    styleJson: [{
        "featureType": "land",
        "elementType": "geometry",
        "stylers": {
            "color": "#fffff9ff"
        }
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": {
            "color": "#69b0acff"
        }
    }, {
        "featureType": "highway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#b5caa0ff"
        }
    }, {
        "featureType": "highway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#94ad79ff"
        }
    }, {
        "featureType": "nationalway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#b5caa0ff"
        }
    }, {
        "featureType": "arterial",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#d4e2c6ff"
        }
    }, {
        "featureType": "cityhighway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#d4e2c6ff"
        }
    }, {
        "featureType": "provincialway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#d4e2c6ff"
        }
    }, {
        "featureType": "provincialway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#b5caa0ff"
        }
    }, {
        "featureType": "tertiaryway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "tertiaryway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#b5caa0ff"
        }
    }, {
        "featureType": "fourlevelway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "fourlevelway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#b5caa0ff"
        }
    }, {
        "featureType": "subway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "railway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "highwaysign",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "highwaysign",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "nationalwaysign",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "nationalwaysign",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "provincialwaysign",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "provincialwaysign",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "tertiarywaysign",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "tertiarywaysign",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "subwaylabel",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "subwaylabel",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "nationalway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#94ad79ff"
        }
    }, {
        "featureType": "cityhighway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#b5caa0ff"
        }
    }, {
        "featureType": "arterial",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#b5caa0ff"
        }
    }, {
        "featureType": "highway",
        "stylers": {
            "level": "6",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "highway",
        "stylers": {
            "level": "7",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "highway",
        "stylers": {
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "highway",
        "stylers": {
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "highway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "6",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "highway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "7",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "highway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "highway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "highway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "6",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "highway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "7",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "highway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "highway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "stylers": {
            "level": "6",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "stylers": {
            "level": "7",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "stylers": {
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "stylers": {
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "6",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "7",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "6",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "7",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "nationalway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "provincialway",
        "stylers": {
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "8-9"
        }
    }, {
        "featureType": "provincialway",
        "stylers": {
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "8-9"
        }
    }, {
        "featureType": "provincialway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "8-9"
        }
    }, {
        "featureType": "provincialway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "8-9"
        }
    }, {
        "featureType": "provincialway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "8-9"
        }
    }, {
        "featureType": "provincialway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "8-9"
        }
    }, {
        "featureType": "cityhighway",
        "stylers": {
            "level": "6",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "cityhighway",
        "stylers": {
            "level": "7",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "cityhighway",
        "stylers": {
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "cityhighway",
        "stylers": {
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "cityhighway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "6",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "cityhighway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "7",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "cityhighway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "cityhighway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "off",
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "cityhighway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "6",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "cityhighway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "7",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "cityhighway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "8",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "cityhighway",
        "elementType": "labels",
        "stylers": {
            "visibility": "off",
            "level": "9",
            "curZoomRegionId": "0",
            "curZoomRegion": "6-9"
        }
    }, {
        "featureType": "entertainment",
        "elementType": "geometry",
        "stylers": {
            "color": "#e4f0d7ff"
        }
    }, {
        "featureType": "manmade",
        "elementType": "geometry",
        "stylers": {
            "color": "#effcf0ff"
        }
    }, {
        "featureType": "education",
        "elementType": "geometry",
        "stylers": {
            "color": "#e3f7e4ff"
        }
    }, {
        "featureType": "building",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#a1cfa4ff"
        }
    }, {
        "featureType": "poilabel",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "poilabel",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "education",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#7a7a7aff"
        }
    }, {
        "featureType": "education",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "education",
        "elementType": "labels.text",
        "stylers": {
            "fontsize": "26"
        }
    }, {
        "featureType": "manmade",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#afafafff"
        }
    }, {
        "featureType": "manmade",
        "elementType": "labels.text",
        "stylers": {
            "fontsize": "26"
        }
    }, {
        "featureType": "scenicspotslabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#376b6dff"
        }
    }, {
        "featureType": "scenicspots",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "scenicspotslabel",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "scenicspotslabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffffff",
            "weight": "4"
        }
    }, {
        "featureType": "country",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#376b6dff"
        }
    }, {
        "featureType": "country",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffffff",
            "weight": "3"
        }
    }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": {
            "fontsize": "24"
        }
    }]
});
</script>

<style>
.map {
    width: 100%;
    height: 100vh;
}

.ui_city_change.ui_city_change_top {
    height: 28px !important;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ui_city_change {
    width: 80px;
    height: 100% !important;
    margin-left: 20px;
}


.ui_city_change_inner {
    width: 100%;
    height: 40px;
    background: #fff;
    text-align: center;
    padding: 0px 0px !important;
    margin-top: 0px;
}

.ui_city_change.ui_city_change_top.ui_city_change_inner.a {
    margin-top: 0px;
    height: 80px !important;
}

.BMap_noprint.BMap_CityListCtrl.anchorTL {
    margin-top: 0px !important;
    inset: 0px auto auto 30px !important;
}
</style>