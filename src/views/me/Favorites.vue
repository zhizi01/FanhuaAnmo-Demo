<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import TherapistCard from '@/components/TherapistCard.vue'
import StoreCard from '@/components/StoreCard.vue'
import { getTherapistById } from '@/mock/therapists'
import { getStoreById } from '@/mock/stores'
import { useFavorites } from '@/composables/useFavorites'

const router = useRouter()
const { technicianIds, storeIds } = useFavorites()

const activeTab = ref(0)

const favTherapists = computed(() =>
  technicianIds.value.map(getTherapistById).filter(Boolean),
)

const favStores = computed(() => storeIds.value.map(getStoreById).filter(Boolean))

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
        <div class="tab-body">
          <TherapistCard
            v-for="t in favTherapists"
            :key="t.id"
            :therapist="t"
            @click="openTherapist"
          />
          <van-empty
            v-if="favTherapists.length === 0"
            image="search"
            description="暂无收藏的技师"
          />
        </div>
      </van-tab>
      <van-tab title="商家">
        <div class="tab-body">
          <StoreCard
            v-for="s in favStores"
            :key="s.id"
            :store="s"
            @click="openStore"
          />
          <van-empty
            v-if="favStores.length === 0"
            image="search"
            description="暂无收藏的商家"
          />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 24px;
}

.tab-body {
  min-height: 220px;
  padding-bottom: 16px;
}
</style>
