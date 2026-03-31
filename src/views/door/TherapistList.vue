<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TherapistCard from '@/components/TherapistCard.vue'
import { therapists, MASSAGE_TYPES } from '@/mock/therapists'

const route = useRoute()
const router = useRouter()

const gender = ref(route.query.gender === 'female' ? 'female' : 'male')
const massageType = ref('全部')
const distanceMax = ref(10)

watch(
  () => route.query.gender,
  (g) => {
    gender.value = g === 'female' ? 'female' : 'male'
  },
)

const typeOptions = computed(() => ['全部', ...MASSAGE_TYPES])

const filtered = computed(() => {
  let list = therapists.filter((t) => t.gender === gender.value)
  list = list.filter((t) => t.distanceKm <= distanceMax.value)
  if (massageType.value !== '全部') {
    list = list.filter((t) => t.tags.includes(massageType.value))
  }
  return [...list].sort((a, b) => a.distanceKm - b.distanceKm)
})

function openTherapist(t) {
  router.push(`/door/therapist/${t.id}`)
}

function onBack() {
  router.back()
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="选择技师" left-arrow fixed placeholder @click-left="onBack" />

    <div class="filters">
      <van-dropdown-menu>
        <van-dropdown-item v-model="massageType" :options="typeOptions.map((t) => ({ text: t, value: t }))" />
      </van-dropdown-menu>
      <div class="dist-field">
        <span class="dist-label">最远距离 {{ distanceMax }} km</span>
        <van-slider v-model="distanceMax" :min="1" :max="20" bar-height="4px" active-color="#0f766e" />
      </div>
    </div>

    <div class="hint">
      已选：{{ gender === 'male' ? '男' : '女' }}技师 · 按距离由近到远
    </div>

    <TherapistCard
      v-for="t in filtered"
      :key="t.id"
      :therapist="t"
      @click="openTherapist"
    />

    <van-empty v-if="filtered.length === 0" description="暂无符合条件的技师" />
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 16px;
}

.filters {
  margin-top: 8px;
}

.dist-field {
  padding: 12px 16px 8px;
  background: #fff;
}

.dist-label {
  display: block;
  font-size: 13px;
  color: #646566;
  margin-bottom: 8px;
}

.hint {
  font-size: 12px;
  color: #969799;
  padding: 8px 12px;
}
</style>
