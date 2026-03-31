<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const title = computed(() => route.meta?.title ?? '页面')

const paragraphs = computed(() => {
  switch (route.name) {
    case 'Privacy':
      return [
        '《隐私协议》',
        '',
      ]
    case 'ServiceAgreement':
      return [
        '《服务协议》',
        '',
      ]
    case 'MerchantJoin':
      return ['商户入驻申请', '']
    case 'TherapistJoin':
      return ['技师入驻申请', '']
    default:
      return ['内容建设中。']
  }
})

function onBack() {
  router.back()
}
</script>

<template>
  <div class="page">
    <van-nav-bar :title="title" left-arrow fixed placeholder @click-left="onBack" />
    <div class="body">
      <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 24px;
}

.body {
  padding: 16px;
  font-size: 14px;
  color: #646566;
  line-height: 1.65;
}

.body p {
  margin: 0 0 12px;
}
</style>
