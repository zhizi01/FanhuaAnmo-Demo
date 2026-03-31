<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import TherapistCard from '@/components/TherapistCard.vue'
import StoreCard from '@/components/StoreCard.vue'
import { getTherapistById } from '@/mock/therapists'
import { getStoreById } from '@/mock/stores'
import { loadFavoriteIds } from '@/mock/favorites'

const router = useRouter()
const activeTab = ref(0)

const favTechIds = ref([])
const favStoreIds = ref([])

onMounted(() => {
  const f = loadFavoriteIds()
  favTechIds.value = f.technicianIds
  favStoreIds.value = f.storeIds
})

const favTherapists = computed(() =>
  favTechIds.value.map(getTherapistById).filter(Boolean),
)

const favStores = computed(() => favStoreIds.value.map(getStoreById).filter(Boolean))

function onBack() {
  router.back()
}

function openTherapist(t) {
  router.push(`/door/therapist/${t.id}`)
}

function openStore(s) {
  router.push(`/store/${s.id}`)
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="收藏中心" left-arrow fixed placeholder @click-left="onBack" />

    <van-tabs v-model:active="activeTab" color="#0f766e" title-active-color="#0f766e">
      <van-tab title="技师">
        <TherapistCard
          v-for="t in favTherapists"
          :key="t.id"
          :therapist="t"
          @click="openTherapist"
        />
        <van-empty v-if="favTherapists.length === 0" description="暂无收藏的技师" />
      </van-tab>
      <van-tab title="商家">
        <StoreCard v-for="s in favStores" :key="s.id" :store="s" @click="openStore" />
        <van-empty v-if="favStores.length === 0" description="暂无收藏的商家" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 24px;
}
</style>
