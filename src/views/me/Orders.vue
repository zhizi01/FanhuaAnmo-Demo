<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const typeTab = ref(0)
const doorStatusTab = ref(0)
const storeStatusTab = ref(0)

const STATUS_TITLES = ['已预约', '进行中', '已完成', '已取消', '违规订单']

function onBack() {
  router.back()
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="订单历史" left-arrow fixed placeholder @click-left="onBack" />

    <van-tabs v-model:active="typeTab" color="#0f766e" title-active-color="#0f766e">
      <van-tab title="上门订单">
        <van-tabs
          v-model:active="doorStatusTab"
          scrollable
          color="#0f766e"
          title-active-color="#0f766e"
          class="sub-tabs"
        >
          <van-tab v-for="t in STATUS_TITLES" :key="'door-' + t" :title="t">
            <div class="tab-pane">
              <van-empty description="暂无订单" />
            </div>
          </van-tab>
        </van-tabs>
      </van-tab>

      <van-tab title="到店订单">
        <van-tabs
          v-model:active="storeStatusTab"
          scrollable
          color="#0f766e"
          title-active-color="#0f766e"
          class="sub-tabs"
        >
          <van-tab v-for="t in STATUS_TITLES" :key="'store-' + t" :title="t">
            <div class="tab-pane">
              <van-empty description="暂无订单" />
            </div>
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 24px;
}

.sub-tabs {
  margin-top: 0;
}

.tab-pane {
  min-height: 280px;
  padding: 24px 16px;
}
</style>
