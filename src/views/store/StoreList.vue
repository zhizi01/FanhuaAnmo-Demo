<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import StoreCard from '@/components/StoreCard.vue'
import { stores } from '@/mock/stores'

const router = useRouter()

const sorted = computed(() => [...stores].sort((a, b) => a.distanceKm - b.distanceKm))

function openStore(s) {
  router.push(`/store/${s.id}`)
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">到店按摩</h1>
    <div class="head">按距离展示附近门店</div>
    <StoreCard v-for="s in sorted" :key="s.id" :store="s" @click="openStore" />
  </div>
</template>

<style scoped>
.page {
  padding: 12px 0 16px;
}

.page-title {
  margin: 0;
  padding: 2px 16px 6px;
  font-size: 20px;
  font-weight: 700;
  color: #323233;
  letter-spacing: 0.02em;
}

.head {
  padding: 0 16px 10px;
  font-size: 13px;
  color: #969799;
}
</style>
