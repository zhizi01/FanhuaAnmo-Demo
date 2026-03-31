<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { orders, ORDER_STATUS_LABEL } from '@/mock/orders'

const router = useRouter()

const list = computed(() => [...orders].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)))

function onBack() {
  router.back()
}

function statusType(s) {
  if (s === 'completed') return 'success'
  if (s === 'pending') return 'warning'
  return 'default'
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="订单历史" left-arrow fixed placeholder @click-left="onBack" />

    <van-cell-group v-for="o in list" :key="o.id" inset class="card">
      <van-cell :title="o.title" :label="o.createdAt">
        <template #value>
          <div class="cell-right">
            <div class="amount">¥{{ o.amount }}</div>
            <van-tag :type="statusType(o.status)" plain>{{ ORDER_STATUS_LABEL[o.status] ?? o.status }}</van-tag>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <van-empty v-if="list.length === 0" description="暂无订单" />
  </div>
</template>

<style scoped>
.page {
  padding: 8px 0 24px;
}

.card {
  margin-top: 10px;
}

.cell-right {
  text-align: right;
}

.amount {
  font-weight: 600;
  color: #323233;
  margin-bottom: 6px;
}
</style>
