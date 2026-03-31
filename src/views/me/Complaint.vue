<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref(0)

function onBack() {
  router.back()
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="投诉违规" left-arrow fixed placeholder @click-left="onBack" />

    <van-tabs v-model:active="activeTab" sticky color="#0f766e" title-active-color="#0f766e">
      <van-tab title="正在进行">
        <div class="tab-pane">
          <van-empty image="search" description="暂无进行中的投诉" />
        </div>
      </van-tab>
      <van-tab title="已经结单">
        <div class="tab-pane">
          <van-empty image="search" description="暂无已结单记录" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 24px;
}

.tab-pane {
  min-height: 280px;
  padding: 24px 16px;
}
</style>
