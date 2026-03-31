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
        '本页为《隐私协议》占位内容。',
        '正式上线前请替换为完整法律文本，并确保与后端政策一致。',
      ]
    case 'ServiceAgreement':
      return [
        '本页为《服务协议》占位内容。',
        '可描述服务范围、预约规则、退款与争议处理等条款骨架。',
      ]
    case 'Complaint':
      return [
        '违规投诉入口（演示）。',
        '可在此接入表单或客服工单系统。',
      ]
    case 'About':
      return ['芷子按摩 · 演示版', '正规按摩服务预约平台（前端 mock 数据）。']
    case 'MerchantJoin':
      return ['商户入驻申请（演示）。', '后续可对接资质审核与合同签署流程。']
    case 'TherapistJoin':
      return ['技师入驻申请（演示）。', '后续可对接认证与排班管理。']
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
