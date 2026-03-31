<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function onBack() {
  router.back()
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="登录" left-arrow fixed placeholder @click-left="onBack" />
    <div class="body">
      <p class="lead">登录页内容稍后补充</p>
      <p class="sub">完成账号登录后即可预约服务。</p>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 24px;
}

.body {
  padding: 24px 16px;
}

.lead {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: #323233;
}

.sub {
  margin: 0;
  font-size: 14px;
  color: #969799;
  line-height: 1.5;
}
</style>
