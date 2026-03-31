<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TherapistCard from '@/components/TherapistCard.vue'
import { therapists, MASSAGE_TYPES } from '@/mock/therapists'

const route = useRoute()
const router = useRouter()

const gender = ref(route.query.gender === 'female' ? 'female' : 'male')
const massageType = ref('全部')
/** @type {import('vue').Ref<'lt5' | '5to20' | '20to100' | 'gt100'>} */
const distanceRange = ref('lt5')

const DISTANCE_OPTIONS = [
  { text: '<5KM', value: 'lt5' },
  { text: '5~20KM', value: '5to20' },
  { text: '20~100KM', value: '20to100' },
  { text: '>100KM', value: 'gt100' },
]

watch(
  () => route.query.gender,
  (g) => {
    gender.value = g === 'female' ? 'female' : 'male'
  },
)

/** 固定引用，避免模板内每次 map 出新数组触发 van-dropdown 递归更新 */
const massageTypeOptions = [
  { text: '全部', value: '全部' },
  ...MASSAGE_TYPES.map((t) => ({ text: t, value: t })),
]

function inDistanceBucket(d, range) {
  switch (range) {
    case 'lt5':
      return d < 5
    case '5to20':
      return d >= 5 && d <= 20
    case '20to100':
      return d > 20 && d <= 100
    case 'gt100':
      return d > 100
    default:
      return true
  }
}

const filtered = computed(() => {
  let list = therapists.filter((t) => t.gender === gender.value)
  list = list.filter((t) => inDistanceBucket(t.distanceKm, distanceRange.value))
  if (massageType.value !== '全部') {
    list = list.filter((t) => t.tags.includes(massageType.value))
  }
  return [...list].sort((a, b) => a.distanceKm - b.distanceKm)
})

const distanceHint = computed(
  () => DISTANCE_OPTIONS.find((o) => o.value === distanceRange.value)?.text ?? '',
)

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
        <van-dropdown-item v-model="massageType" :options="massageTypeOptions" />
        <van-dropdown-item v-model="distanceRange" :options="DISTANCE_OPTIONS" />
      </van-dropdown-menu>
    </div>

    <div class="hint">
      已选：{{ gender === 'male' ? '男' : '女' }}技师 · 距离 {{ distanceHint }} · 按距离由近到远
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

.hint {
  font-size: 12px;
  color: #969799;
  padding: 8px 12px;
}
</style>
