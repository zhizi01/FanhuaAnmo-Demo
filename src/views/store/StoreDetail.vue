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
import ProfileHero from '@/components/ProfileHero.vue'
import {
  resolveStoreImage,
  resolveTherapistAvatar,
  LICENSE_BG,
} from '@/constants/assets'
import { getStoreById } from '@/mock/stores'
import { getTherapistsByIds } from '@/mock/therapists'
import { useAuth } from '@/composables/useAuth'
import { useFavorites } from '@/composables/useFavorites'
import { getBookableHalfHourSlots } from '@/utils/bookableSlots'

const route = useRoute()
const router = useRouter()
const { loggedIn, phone: userPhone, nickname: userNickname } = useAuth()
const { storeIds, toggleStore } = useFavorites()

const store = computed(() => getStoreById(route.params.id))

const isFavorite = computed(
  () => !!store.value?.id && storeIds.value.includes(store.value.id),
)

function onToggleFavorite() {
  if (store.value) toggleStore(store.value.id)
}

const staff = computed(() => {
  if (!store.value) return []
  return getTherapistsByIds(store.value.therapistIds)
})

const avatarSrc = computed(() =>
  store.value ? resolveStoreImage(store.value) : resolveStoreImage({}),
)

/** 门店照片轮播（当前仅 bg.png，后续可扩展为多图） */
const storePhotoSlides = [LICENSE_BG]

function onBack() {
  router.back()
}

function openTherapist(t) {
  router.push(`/door/therapist/${t.id}`)
}

const showBook = ref(false)
const timeSlots = ref([])
const selectedSlotTs = ref(null)
const showTimePicker = ref(false)
const pickerColumns = ref([])

const selectedTherapistId = ref('')
const selectedPackageId = ref('')
const formName = ref('')
const formPhone = ref('')

const selectedTherapist = computed(() =>
  staff.value.find((t) => t.id === selectedTherapistId.value) ?? null,
)

const packageOptions = computed(() => selectedTherapist.value?.packages ?? [])

watch(showBook, (open) => {
  if (!open) return
  timeSlots.value = getBookableHalfHourSlots()
  if (timeSlots.value.length) {
    selectedSlotTs.value = timeSlots.value[0].value
  } else {
    selectedSlotTs.value = null
  }
  const list = staff.value
  selectedTherapistId.value = list[0]?.id ?? ''
  const pkgs = selectedTherapist.value?.packages ?? []
  selectedPackageId.value = pkgs[0]?.id ?? ''
  formName.value = ''
  formPhone.value = ''
  if (loggedIn.value) {
    if (userNickname.value && userNickname.value !== '游客') {
      formName.value = userNickname.value
    }
    if (userPhone.value && !userPhone.value.includes('*')) {
      formPhone.value = userPhone.value
    }
  }
})

watch(selectedTherapistId, () => {
  const pkgs = selectedTherapist.value?.packages ?? []
  selectedPackageId.value = pkgs[0]?.id ?? ''
})

function openBookPopup() {
  showBook.value = true
}

const selectedTimeLabel = computed(() => {
  if (selectedSlotTs.value == null) return '请选择到店时间'
  const hit = timeSlots.value.find((s) => s.value === selectedSlotTs.value)
  return hit?.label ?? '请选择到店时间'
})

function openTimePicker() {
  if (!timeSlots.value.length) {
    showToast('暂无可预约时段')
    return
  }
  pickerColumns.value = [
    timeSlots.value.map((s) => ({ text: s.label, value: s.value })),
  ]
  showTimePicker.value = true
}

function onTimePickerConfirm({ selectedOptions }) {
  const opt = selectedOptions[0]
  if (opt) selectedSlotTs.value = opt.value
  showTimePicker.value = false
}

const PHONE_RE = /^1[3-9]\d{9}$/

function validateBookForm() {
  if (selectedSlotTs.value == null) {
    showToast('请选择预约到店时间')
    return false
  }
  if (!selectedTherapistId.value) {
    showToast('请选择预约技师')
    return false
  }
  const pkgs = packageOptions.value
  if (pkgs.length && !selectedPackageId.value) {
    showToast('请选择预约服务')
    return false
  }
  const name = formName.value.trim()
  if (!name || name.length < 2) {
    showToast('请填写姓名（至少 2 个字）')
    return false
  }
  const phone = formPhone.value.trim()
  if (!phone) {
    showToast('请填写手机号')
    return false
  }
  if (!PHONE_RE.test(phone)) {
    showToast('请输入正确的 11 位手机号')
    return false
  }
  return true
}

async function submitOrder() {
  if (!validateBookForm()) return

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
  <div v-if="store" class="page">
    <van-nav-bar title="门店详情" left-arrow fixed placeholder @click-left="onBack">
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

      <div class="block-title">门店照片</div>
      <van-swipe
        class="store-photos"
        lazy-render
        indicator-color="#0f766e"
        :show-indicators="storePhotoSlides.length > 1"
      >
        <van-swipe-item v-for="(src, i) in storePhotoSlides" :key="i">
          <div class="store-photos__slide">
            <img :src="src" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>

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

      <van-button block round type="primary" class="cta" color="#0f766e" @click="openBookPopup">
        预约到店
      </van-button>
    </div>

    <van-popup
      v-model:show="showBook"
      position="bottom"
      round
      class="book-popup"
      :style="{ maxHeight: '88vh' }"
    >
      <div class="popup-inner">
        <div class="popup-head">预约到店 · {{ store.name }}</div>

        <van-field
          readonly
          is-link
          label="到店时间"
          :model-value="selectedTimeLabel"
          placeholder="请选择（整点/半点，24 小时内）"
          @click="openTimePicker"
        />

        <div class="popup-sub">预约技师</div>
        <van-radio-group v-model="selectedTherapistId">
          <van-cell-group inset>
            <van-cell
              v-for="t in staff"
              :key="t.id"
              :title="t.name"
              clickable
              @click="selectedTherapistId = t.id"
            >
              <template #right-icon>
                <van-radio :name="t.id" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>

        <div class="popup-sub">预约服务</div>
        <van-radio-group v-model="selectedPackageId">
          <van-cell-group inset>
            <van-cell
              v-for="pkg in packageOptions"
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

        <van-field v-model="formName" label="姓名" placeholder="请输入您的姓名" />
        <van-field
          v-model="formPhone"
          label="手机号"
          placeholder="请输入手机号"
          type="tel"
          maxlength="11"
        />

        <van-button block round type="primary" color="#0f766e" @click="submitOrder">
          下单
        </van-button>
      </div>
    </van-popup>

    <van-popup v-model:show="showTimePicker" position="bottom" round teleport="body">
      <van-picker
        v-if="pickerColumns.length"
        title="选择到店时间"
        :columns="pickerColumns"
        @confirm="onTimePickerConfirm"
        @cancel="showTimePicker = false"
      />
    </van-popup>
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

.store-photos {
  height: 176px;
  margin: 0 4px 8px;
  border-radius: 12px;
  overflow: hidden;
}

.store-photos__slide {
  height: 176px;
  padding: 0 8px;
  box-sizing: border-box;
}

.store-photos__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 12px;
  background: #f2f3f5;
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

.popup-inner {
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom));
  overflow-y: auto;
  max-height: 88vh;
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
  margin: 14px 4px 8px;
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
