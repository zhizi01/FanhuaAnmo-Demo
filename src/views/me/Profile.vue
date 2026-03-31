<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import { useAuth } from '@/composables/useAuth'
import { resolveUserAvatar } from '@/constants/assets'

const router = useRouter()
const { user, loginDemo, logout } = useAuth()

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

function customerService() {
  showToast('客服热线：400-000-0000（演示）')
}
</script>

<template>
  <div class="page">
    <div class="header">
      <div class="avatar-wrap" @click="loginDemo">
        <img :src="avatar" alt="" class="avatar" />
      </div>
      <div class="info">
        <div class="row">
          <span class="nick">{{ user.nickname }}</span>
          <van-tag type="warning" plain class="level">{{ user.memberLevel }}</van-tag>
        </div>
        <div class="phone">{{ maskPhone(user.phone) }}</div>
        <div v-if="!user.loggedIn" class="tip">点击头像模拟登录（演示）</div>
      </div>
    </div>

    <van-cell-group inset class="group">
      <van-cell title="订单历史" is-link to="/me/orders" />
      <van-cell title="收藏中心" is-link to="/me/favorites" />
      <van-cell title="商户入驻" is-link to="/me/merchant-join" />
      <van-cell title="技师入驻" is-link to="/me/therapist-join" />
      <van-cell title="隐私协议" is-link to="/me/privacy" />
      <van-cell title="服务协议" is-link to="/me/service" />
      <van-cell title="投诉违规" is-link to="/me/complaint" />
      <van-cell title="在线客服" is-link @click="customerService" />
      <van-cell title="关于我们" is-link to="/me/about" />
      <van-cell title="退出登录" is-link class="danger" @click="onLogout" />
    </van-cell-group>
  </div>
</template>

<style scoped>
.page {
  padding: 12px 0 24px;
}

.header {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 16px;
  margin: 0 12px 12px;
  background: linear-gradient(135deg, #0d9488, #115e59);
  border-radius: 12px;
  color: #fff;
}

.avatar-wrap {
  flex-shrink: 0;
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

.group {
  margin-top: 8px;
}

:deep(.danger .van-cell__title) {
  color: #ee0a24;
}
</style>
