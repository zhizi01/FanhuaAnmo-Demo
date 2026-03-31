<script setup>
import { resolveStoreImage } from '@/constants/assets'

const props = defineProps({
  store: { type: Object, required: true },
})

const emit = defineEmits(['click'])

function onClick() {
  emit('click', props.store)
}

function formatDistance() {
  const d = props.store.distanceKm
  if (d == null) return ''
  return `${d} km`
}
</script>

<template>
  <div class="s-card" role="button" @click="onClick">
    <div class="s-card__media">
      <img :src="resolveStoreImage(store)" alt="" />
    </div>
    <div class="s-card__body">
      <div class="s-card__row1">
        <span class="s-card__name">{{ store.name }}</span>
        <span class="s-card__dist">{{ formatDistance() }}</span>
      </div>
      <div class="s-card__tags">
        <van-tag
          v-for="tag in store.tags"
          :key="tag"
          plain
          type="success"
          class="s-card__tag"
        >
          {{ tag }}
        </van-tag>
      </div>
      <p class="s-card__intro">{{ store.intro }}</p>
      <p class="s-card__addr">{{ store.address }}</p>
    </div>
  </div>
</template>

<style scoped>
.s-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  margin: 0 12px 12px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.s-card__media {
  flex-shrink: 0;
  width: 92px;
  height: 92px;
  border-radius: 10px;
  overflow: hidden;
  background: #f2f3f5;
}

.s-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.s-card__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.s-card__row1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.s-card__name {
  font-weight: 600;
  font-size: 16px;
  color: #323233;
}

.s-card__dist {
  font-size: 12px;
  color: #969799;
  flex-shrink: 0;
}

.s-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.s-card__tag {
  margin: 0;
}

.s-card__intro {
  margin: 0;
  font-size: 13px;
  color: #646566;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.s-card__addr {
  margin: 0;
  font-size: 12px;
  color: #969799;
}
</style>
