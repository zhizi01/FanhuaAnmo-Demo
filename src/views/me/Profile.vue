<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showLoadingToast, closeToast, showToast } from 'vant'
import { useAuth } from '@/composables/useAuth'
import { resolveUserAvatar } from '@/constants/assets'

const router = useRouter()
const { user, logout } = useAuth()

const avatar = computed(() => resolveUserAvatar(user.value))

function maskPhone(p) {
  if (!p) return '未绑定手机号'
  return p
}

async function onLogout() {
  try {
    await showConfirmDialog({ title: '确认退出', message: '确定要退出登录吗？' })
    logout()
    showToast('已退出')
  } catch {
    /* cancel */
  }
}

function go(path) {
  router.push(path)
}

function onAvatarClick() {
  if (!user.value.loggedIn) {
    router.push('/me/login')
  }
}

async function customerService() {
  showLoadingToast({
    message: '正在连接客服…',
    forbidClick: true,
    duration: 0,
  })
  await new Promise((r) => setTimeout(r, 5000))
  closeToast()
  showToast('唤起微信客服失败')
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">个人中心</h1>
    <div class="header">
      <div class="avatar-wrap" role="button" @click="onAvatarClick">
        <img :src="avatar" alt="" class="avatar" />
      </div>
      <div class="info">
        <div class="row">
          <span class="nick">{{ user.nickname }}</span>
          <van-tag type="warning" plain class="level">{{ user.memberLevel }}</van-tag>
        </div>
        <div class="phone">{{ maskPhone(user.phone) }}</div>
        <div v-if="!user.loggedIn" class="tip">点击头像前往登录</div>
      </div>
    </div>

    <div class="quick-wrap">
      <van-grid :column-num="3" :border="false" clickable class="quick-grid">
        <van-grid-item icon="orders-o" text="订单历史" @click="go('/me/orders')" />
        <van-grid-item icon="star-o" text="收藏" @click="go('/me/favorites')" />
        <van-grid-item icon="service-o" text="在线客服" @click="customerService" />
      </van-grid>
    </div>

    <van-cell-group inset class="group">
      <van-cell title="商户入驻" is-link to="/me/merchant-join" />
      <van-cell title="技师入驻" is-link to="/me/therapist-join" />
      <van-cell title="隐私协议" is-link to="/me/privacy" />
      <van-cell title="服务协议" is-link to="/me/service" />
      <van-cell title="投诉违规" is-link to="/me/complaint" />
      <van-cell title="关于我们" is-link to="/me/about" />
    </van-cell-group>

    <div v-if="user.loggedIn" class="logout-wrap">
      <van-button block round plain type="danger" class="logout-btn" @click="onLogout">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 12px 0 calc(24px + env(safe-area-inset-bottom));
}

.page-title {
  margin: 0;
  padding: 2px 16px 12px;
  font-size: 20px;
  font-weight: 700;
  color: #323233;
  letter-spacing: 0.02em;
}

.header {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 16px;
  margin: 0 12px 16px;
  background: linear-gradient(135deg, #0d9488, #115e59);
  border-radius: 12px;
  color: #fff;
}

.avatar-wrap {
  flex-shrink: 0;
  cursor: pointer;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.85);
  object-fit: cover;
  background: #fff;
}

.info {
  flex: 1;
  min-width: 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.nick {
  font-size: 18px;
  font-weight: 700;
}

.level {
  margin: 0;
}

.phone {
  margin-top: 6px;
  font-size: 13px;
  opacity: 0.95;
}

.tip {
  margin-top: 6px;
  font-size: 11px;
  opacity: 0.85;
}

.quick-wrap {
  margin: 0 12px 16px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
}

.quick-grid {
  --van-grid-item-content-padding: var(--van-padding-md) var(--van-padding-sm);
}

:deep(.quick-grid .van-grid-item__text) {
  font-size: 13px;
  color: #323233;
}

:deep(.quick-grid .van-grid-item__icon) {
  font-size: 28px;
  color: #0f766e;
}

.group {
  margin-top: 0;
}

.logout-wrap {
  margin: 24px 16px 0;
}

.logout-btn {
  font-size: 15px;
}
</style>
