<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import TherapistCard from '@/components/TherapistCard.vue'
import { PROFILE_COVER_GG } from '@/constants/assets'
import { therapists } from '@/mock/therapists'

const router = useRouter()
const bannerSrc = PROFILE_COVER_GG

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
    <h1 class="page-title">上门按摩</h1>
    <div class="banner">
      <img class="banner__img" :src="bannerSrc" alt="" />
    </div>

    <div class="pick-row">
      <div class="pick-card pick-card--male" @click="goTherapists('male')">
        <div class="pick-card__title">预约男技师</div>
        <div class="pick-card__sub">正骨推荐</div>
      </div>
      <div class="pick-card pick-card--female" @click="goTherapists('female')">
        <div class="pick-card__title">预约女技师</div>
        <div class="pick-card__sub">保养推荐</div>
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

.page-title {
  margin: 0;
  padding: 14px 16px 10px;
  font-size: 20px;
  font-weight: 700;
  color: #323233;
  letter-spacing: 0.02em;
}

.banner {
  margin: 0 12px;
  border-radius: 12px;
  overflow: hidden;
  background: #f2f3f5;
  aspect-ratio: 750 / 360;
}

.banner__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
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
