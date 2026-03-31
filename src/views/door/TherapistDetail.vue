<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  showToast,
  showConfirmDialog,
  showLoadingToast,
  closeToast,
  showDialog,
} from 'vant'

import 'vant/es/toast/style';
import 'vant/es/dialog/style';


import ProfileHero from '@/components/ProfileHero.vue'
import {
  resolveTherapistAvatar,
  USER_DEFAULT_AVATAR,
  LICENSE_BG,
} from '@/constants/assets'
import { getTherapistById } from '@/mock/therapists'
import { useAuth } from '@/composables/useAuth'
import { useFavorites } from '@/composables/useFavorites'

const route = useRoute()
const router = useRouter()
const { loggedIn, phone: userPhone } = useAuth()
const { technicianIds, toggleTechnician } = useFavorites()

const therapist = computed(() => getTherapistById(route.params.id))

const isFavorite = computed(
  () => !!therapist.value?.id && technicianIds.value.includes(therapist.value.id),
)

function onToggleFavorite() {
  if (therapist.value) toggleTechnician(therapist.value.id)
}

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

const showBook = ref(false)
const selectedPackageId = ref('')
const formPhone = ref('')
const formContactName = ref('')
const formAddress = ref('')

watch(showBook, (open) => {
  if (!open || !therapist.value) return
  const pkgs = therapist.value.packages ?? []
  if (pkgs.length && !selectedPackageId.value) {
    selectedPackageId.value = pkgs[0].id
  }
})

function openBookPopup() {
  const pkgs = therapist.value?.packages ?? []
  selectedPackageId.value = pkgs[0]?.id ?? ''
  formPhone.value = ''
  formContactName.value = ''
  formAddress.value = ''
  if (loggedIn.value && userPhone.value && !userPhone.value.includes('*')) {
    formPhone.value = userPhone.value
  }
  showBook.value = true
}

const PHONE_RE = /^1[3-9]\d{9}$/

function validateBookForm() {
  const phone = formPhone.value.trim()
  if (!phone) {
    showToast('请填写手机号')
    return false
  }
  if (!PHONE_RE.test(phone)) {
    showToast('请输入正确的 11 位手机号')
    return false
  }
  const contact = formContactName.value.trim()
  if (!contact || contact.length < 2) {
    showToast('请填写联系人（至少 2 个字）')
    return false
  }
  const addr = formAddress.value.trim()
  if (!addr || addr.length < 2) {
    showToast('请填写地址')
    return false
  }
  return true
}

async function submitOrder() {
  const pkgs = therapist.value?.packages ?? []
  if (pkgs.length && !selectedPackageId.value) {
    showToast('请选择套餐')
    return
  }

  if (!validateBookForm()) {
    return
  }

  if (!loggedIn.value) {
    try {
      await showConfirmDialog({
        title: '提示',
        message: '需要先登录，才能为您提供服务！',
        confirmButtonText: '登录',
        cancelButtonText: '取消',
      })
      showBook.value = false
      router.push('/me/login')
    } catch {
      /* 取消 */
    }
    return
  }

  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  })
  await new Promise((r) => setTimeout(r, 5000))
  closeToast()
  await showDialog({
    title: '提示',
    message:
      '调动微信支付异常，检测到当前是演示模式，演示模式不允许下单，谢谢。',
    confirmButtonText: '知道了',
  })
  showBook.value = false
}
</script>

<template>
  <div v-if="therapist" class="page">
    <van-nav-bar title="技师主页" left-arrow fixed placeholder @click-left="onBack">
      <template #right>
        <van-icon
          :name="isFavorite ? 'star' : 'star-o'"
          class="nav-fav"
          :class="{ 'nav-fav--on': isFavorite }"
          size="22"
          @click="onToggleFavorite"
        />
      </template>
    </van-nav-bar>

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

      <div class="block-title">价格展示目录</div>
      <van-cell-group inset>
        <van-cell
          v-for="pkg in therapist.packages"
          :key="pkg.id"
          :title="pkg.name"
          :value="`¥${pkg.price}`"
        />
      </van-cell-group>

      <div class="block-title">个人执照</div>
      <div class="license">
        <div class="license__img-wrap">
          <img class="license__img" :src="LICENSE_BG" alt="执照公示" />
        </div>
        <p class="license__note">{{ therapist.licenseNote }}</p>
      </div>

      <van-button
        block
        round
        type="primary"
        class="cta"
        color="#0f766e"
        @click="openBookPopup"
      >
        预约技师
      </van-button>
    </div>

    <van-popup
      v-model:show="showBook"
      position="bottom"
      round
      class="book-popup"
      :style="{ maxHeight: '85vh' }"
    >
      <div class="popup-inner">
        <div class="popup-head">预约 {{ therapist.name }}</div>

        <div class="popup-sub">选择套餐</div>
        <van-radio-group v-model="selectedPackageId">
          <van-cell-group inset>
            <van-cell
              v-for="pkg in therapist.packages"
              :key="pkg.id"
              :title="pkg.name"
              clickable
              @click="selectedPackageId = pkg.id"
            >
              <template #value>
                <span class="pkg-price">¥{{ pkg.price }}</span>
              </template>
              <template #right-icon>
                <van-radio :name="pkg.id" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>

        <van-field
          v-model="formPhone"
          label="手机号"
          placeholder="请输入手机号"
          type="tel"
          maxlength="11"
        />
        <van-field
          v-model="formContactName"
          label="联系人"
          placeholder="请输入联系人姓名"
        />
        <van-field
          v-model="formAddress"
          label="地址"
          placeholder="上门服务详细地址"
        />

        <van-button block round type="primary" color="#0f766e" @click="submitOrder">
          下单
        </van-button>
      </div>
    </van-popup>
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

.license__img-wrap {
  border-radius: 8px;
  overflow: hidden;
  background: #f2f3f5;
}

.license__img {
  display: block;
  width: 100%;
  height: auto;
}

.license__note {
  margin: 10px 0 0;
  font-size: 12px;
  color: #646566;
}

.cta {
  margin-top: 24px;
}

.popup-inner {
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom));
}

.popup-head {
  font-size: 17px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
  color: #323233;
}

.popup-sub {
  font-size: 14px;
  font-weight: 600;
  margin: 0 4px 10px;
  color: #646566;
}

.pkg-price {
  color: #ee0a24;
  font-weight: 600;
  margin-right: 8px;
}

.nav-fav {
  padding: 8px;
  margin-right: 4px;
  color: #646566;
}

.nav-fav--on {
  color: #ffb800;
}
</style>
