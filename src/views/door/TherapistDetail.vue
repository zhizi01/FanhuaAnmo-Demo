<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import ProfileHero from '@/components/ProfileHero.vue'
import { resolveTherapistAvatar, USER_DEFAULT_AVATAR } from '@/constants/assets'
import { getTherapistById } from '@/mock/therapists'

const route = useRoute()
const router = useRouter()

const therapist = computed(() => getTherapistById(route.params.id))

const avatarSrc = computed(() =>
  therapist.value ? resolveTherapistAvatar(therapist.value) : USER_DEFAULT_AVATAR,
)

const orgLine = computed(() => {
  if (!therapist.value) return ''
  if (therapist.value.isPersonal) return '个人技师'
  return therapist.value.orgName || '合作机构'
})

function formatPrice() {
  const t = therapist.value
  if (!t?.priceRange) return '面议'
  const { min, max } = t.priceRange
  return `¥${min}–${max}`
}

function onBack() {
  router.back()
}

function bookPackage() {
  showToast('演示环境：请后续接入下单流程')
}
</script>

<template>
  <div v-if="therapist" class="page">
    <van-nav-bar title="技师主页" left-arrow fixed placeholder @click-left="onBack" />

    <ProfileHero :avatar-src="avatarSrc" />

    <div class="sheet">
      <div class="name-row">
        <h1 class="name">{{ therapist.name }}</h1>
        <span class="price">{{ formatPrice() }}</span>
      </div>
      <div class="tags">
        <van-tag
          v-for="tag in therapist.tags"
          :key="tag"
          type="primary"
          plain
          class="tag"
        >
          {{ tag }}
        </van-tag>
      </div>
      <div class="meta">{{ orgLine }}</div>
      <p class="intro">{{ therapist.intro }}</p>

      <div class="block-title">按摩套餐</div>
      <van-cell-group inset>
        <van-cell
          v-for="pkg in therapist.packages"
          :key="pkg.id"
          :title="pkg.name"
          :value="`¥${pkg.price}`"
          is-link
          @click="bookPackage"
        />
      </van-cell-group>

      <div class="block-title">个人执照</div>
      <div class="license">
        <div class="license__placeholder">
          <van-image
            v-if="therapist.licenseImage"
            width="100%"
            height="120"
            fit="cover"
            :src="therapist.licenseImage"
          />
          <div v-else class="license__empty">执照公示（示意图）</div>
        </div>
        <p class="license__note">{{ therapist.licenseNote }}</p>
      </div>

      <van-button block round type="primary" class="cta" color="#0f766e" @click="bookPackage">
        预约技师
      </van-button>
    </div>
  </div>
  <van-empty v-else description="技师不存在" />
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

.price {
  font-size: 16px;
  font-weight: 700;
  color: #ee0a24;
  flex-shrink: 0;
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

.license {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  overflow: hidden;
}

.license__placeholder {
  border-radius: 8px;
  overflow: hidden;
  background: #f2f3f5;
}

.license__empty {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #969799;
  font-size: 13px;
}

.license__note {
  margin: 10px 0 0;
  font-size: 12px;
  color: #646566;
}

.cta {
  margin-top: 24px;
}
</style>
