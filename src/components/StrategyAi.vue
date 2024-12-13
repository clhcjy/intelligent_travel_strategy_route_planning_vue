<template>
  <div style="width: 100%;height: 100vh;">
    <a-typography-title>功能介绍</a-typography-title>
    <a-typography-paragraph>
      这里呢，你可以尝试放入各种文章链接，随后会提取出来文章中的地名，方便你们制作攻略
    </a-typography-paragraph>
    <a-typography-paragraph>
      初步制作，其实目前只允许小红书链接提取，后续可能会更新其他链接的提取，可以多多关注
    </a-typography-paragraph>
    <div>
      <a-textarea v-model:value="value1" placeholder="在这里放入文章链接" auto-size />
      <div style="margin: 24px 0" />
      <a-textarea v-model:value="value2" placeholder="提取后的地名会出现在这里" :auto-size="{ minRows: 2, maxRows: 5 }" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const value1 = ref('');
const value2 = ref('');
</script>