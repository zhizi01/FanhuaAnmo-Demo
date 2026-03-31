<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import TherapistCard from '@/components/TherapistCard.vue'
import { therapists } from '@/mock/therapists'

const router = useRouter()

const banners = [
  { color: 'linear-gradient(135deg,#0d9488,#134e4a)', text: '正规按摩 · 上门到家' },
  { color: 'linear-gradient(135deg,#0369a1,#0c4a6e)', text: '专业技师 · 安心预约' },
  { color: 'linear-gradient(135deg,#7c3aed,#4c1d95)', text: '到店体验 · 环境舒适' },
]

const recommended = computed(() =>
  [...therapists].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 4),
)

function goTherapists(gender) {
  router.push({ path: '/door/therapists', query: { gender } })
}

function openTherapist(t) {
  router.push(`/door/therapist/${t.id}`)
}
</script>

<template>
  <div class="door-home">
    <van-swipe class="banner" :autoplay="4000" indicator-color="#0f766e">
      <van-swipe-item v-for="(b, i) in banners" :key="i">
        <div class="banner__slide" :style="{ background: b.color }">
          {{ b.text }}
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="pick-row">
      <div class="pick-card pick-card--male" @click="goTherapists('male')">
        <div class="pick-card__title">预约男技师</div>
        <div class="pick-card__sub">按距离排序 · 可筛选类型</div>
      </div>
      <div class="pick-card pick-card--female" @click="goTherapists('female')">
        <div class="pick-card__title">预约女技师</div>
        <div class="pick-card__sub">按距离排序 · 可筛选类型</div>
      </div>
    </div>

    <div class="warning-strip">
      平台提醒：严禁技师与客户涉及钱色交易，本平台只提供正规的按摩服务；涉嫌违规违法内容，将依法移交公安机关处理！
    </div>

    <div class="section-title">推荐技师</div>
    <TherapistCard
      v-for="t in recommended"
      :key="t.id"
      :therapist="t"
      @click="openTherapist"
    />
  </div>
</template>

<style scoped>
.door-home {
  padding-bottom: 8px;
}

.banner {
  height: 140px;
}

.banner__slide {
  height: 140px;
  margin: 0 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  padding: 16px;
  text-align: center;
}

.pick-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 12px 12px 0;
}

.pick-card {
  border-radius: 12px;
  padding: 14px 12px;
  color: #fff;
  min-height: 72px;
}

.pick-card--male {
  background: linear-gradient(135deg, #2563eb, #1e40af);
}

.pick-card--female {
  background: linear-gradient(135deg, #db2777, #9d174d);
}

.pick-card__title {
  font-weight: 700;
  font-size: 15px;
}

.pick-card__sub {
  margin-top: 6px;
  font-size: 11px;
  opacity: 0.9;
}

.section-title {
  font-weight: 600;
  font-size: 16px;
  margin: 16px 12px 8px;
  color: #323233;
}
</style>
