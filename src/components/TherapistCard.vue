<script setup>
import { resolveTherapistAvatar } from '@/constants/assets'

const props = defineProps({
  therapist: { type: Object, required: true },
  /** @type {{ showPrice?: boolean }} */
  options: {
    type: Object,
    default: () => ({ showPrice: true }),
  },
})

const emit = defineEmits(['click'])

function onClick() {
  emit('click', props.therapist)
}

function formatPrice() {
  const { min, max } = props.therapist.priceRange ?? {}
  if (min == null && max == null) return '面议'
  return `¥${min}–${max}`
}

function formatDistance() {
  const d = props.therapist.distanceKm
  if (d == null) return ''
  return `${d} km`
}
</script>

<template>
  <div class="t-card" role="button" @click="onClick">
    <div class="t-card__media">
      <img :src="resolveTherapistAvatar(therapist)" alt="" />
    </div>
    <div class="t-card__body">
      <div class="t-card__row1">
        <span class="t-card__name">{{ therapist.name }} 技师</span>
        <span class="t-card__dist">{{ formatDistance() }}</span>
      </div>
      <div class="t-card__tags">
        <van-tag
          v-for="tag in therapist.tags"
          :key="tag"
          plain
          type="primary"
          class="t-card__tag"
        >
          {{ tag }}
        </van-tag>
      </div>
      <p class="t-card__intro">{{ therapist.intro }}</p>
      <div v-if="options.showPrice !== false" class="t-card__price">
        {{ formatPrice() }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.t-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  margin: 0 12px 12px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.t-card__media {
  flex-shrink: 0;
  width: 92px;
  height: 92px;
  border-radius: 10px;
  overflow: hidden;
  background: #f2f3f5;
}

.t-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.t-card__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  padding-bottom: 22px;
}

.t-card__row1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.t-card__name {
  font-weight: 600;
  font-size: 16px;
  color: #323233;
}

.t-card__dist {
  font-size: 12px;
  color: #969799;
  flex-shrink: 0;
}

.t-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.t-card__tag {
  margin: 0;
}

.t-card__intro {
  margin: 0;
  font-size: 13px;
  color: #646566;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.t-card__price {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 14px;
  font-weight: 600;
  color: #ee0a24;
}
</style>
