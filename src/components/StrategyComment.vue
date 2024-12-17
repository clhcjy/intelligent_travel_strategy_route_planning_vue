<template>
    <div>
        <button @click="fetchData">点击获取数据</button>
    </div>
</template>

<style scoped>

</style>

<script setup>
import axios from "axios"

const url = "https://api.map.baidu.com/place/v2/search"

const ak = "CmqN6RHNG91vSKhL9APJQhhrSgTSghgl"

const params = {
    "query":    "ATM机",
    "tag":    "银行",
    "region":    "北京",
    "output":    "json",
    "ak":       ak,

}

async function fetchData() {
  try {
    const response = await axios.get(url, { params })
    console.log(response.data)
  } catch (error) {
    console.error("请求失败:", error)
  }
}
</script>