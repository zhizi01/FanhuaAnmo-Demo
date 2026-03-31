<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import ProfileHero from '@/components/ProfileHero.vue'
import { resolveStoreImage, resolveTherapistAvatar } from '@/constants/assets'
import { getStoreById } from '@/mock/stores'
import { getTherapistsByIds } from '@/mock/therapists'

const route = useRoute()
const router = useRouter()

const store = computed(() => getStoreById(route.params.id))

const staff = computed(() => {
  if (!store.value) return []
  return getTherapistsByIds(store.value.therapistIds)
})

const avatarSrc = computed(() =>
  store.value ? resolveStoreImage(store.value) : resolveStoreImage({}),
)

function onBack() {
  router.back()
}

function openTherapist(t) {
  router.push(`/door/therapist/${t.id}`)
}

function book() {
  showToast('演示环境：请后续接入到店预约')
}
</script>

<template>
  <div v-if="store" class="page">
    <van-nav-bar title="门店详情" left-arrow fixed placeholder @click-left="onBack" />

    <ProfileHero :avatar-src="avatarSrc" />

    <div class="sheet">
      <div class="name-row">
        <h1 class="name">{{ store.name }}</h1>
      </div>
      <div class="tags">
        <van-tag
          v-for="tag in store.tags"
          :key="tag"
          type="success"
          plain
          class="tag"
        >
          {{ tag }}
        </van-tag>
      </div>
      <div class="meta">{{ store.address }}</div>
      <p class="intro">{{ store.intro }}</p>

      <div class="block-title">门店技师</div>
      <div class="staff-scroll">
        <div
          v-for="t in staff"
          :key="t.id"
          class="staff-item"
          role="button"
          @click="openTherapist(t)"
        >
          <img class="staff-av" :src="resolveTherapistAvatar(t)" alt="" />
          <div class="staff-tags">
            <span v-for="tg in t.tags.slice(0, 1)" :key="tg" class="staff-tag">{{ tg }}</span>
          </div>
          <div class="staff-name">{{ t.name }}</div>
        </div>
      </div>

      <van-button block round type="primary" class="cta" color="#0f766e" @click="book">
        预约到店
      </van-button>
    </div>
  </div>
  <van-empty v-else description="门店不存在" />
</template>

<style scoped>
.page {
  padding-bottom: 24px;
}

.sheet {
  padding: 8px 12px 24px;
  margin-top: 8px;
}

.name-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.name {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #323233;
}

.tags {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  margin: 0;
}

.meta {
  margin-top: 8px;
  font-size: 13px;
  color: #969799;
}

.intro {
  margin: 12px 0 0;
  font-size: 14px;
  color: #646566;
  line-height: 1.55;
}

.block-title {
  margin: 20px 4px 10px;
  font-weight: 600;
  font-size: 15px;
  color: #323233;
}

.staff-scroll {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding: 8px 4px 12px;
  -webkit-overflow-scrolling: touch;
}

.staff-scroll::-webkit-scrollbar {
  height: 0;
}

.staff-item {
  flex: 0 0 auto;
  width: 76px;
  text-align: center;
}

.staff-av {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  background: #f2f3f5;
}

.staff-tags {
  margin-top: 6px;
  min-height: 32px;
}

.staff-tag {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 10px;
  color: #646566;
  line-height: 1.3;
}

.staff-name {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #323233;
}

.cta {
  margin-top: 8px;
}
</style>
