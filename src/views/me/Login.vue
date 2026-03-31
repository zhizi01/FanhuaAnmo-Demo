<script setup>
import { useRouter } from 'vue-router'
import { showLoadingToast, closeToast, showToast } from 'vant'
import { USER_DEFAULT_AVATAR } from '@/constants/assets'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { loginGuest } = useAuth()

const logoSrc = USER_DEFAULT_AVATAR

function onBack() {
  router.back()
}

async function onWeChatLogin() {
  showLoadingToast({
    message: '正在唤起微信…',
    forbidClick: true,
    duration: 0,
  })
  await new Promise((r) => setTimeout(r, 3000))
  closeToast()
  showToast('唤起微信授权失败')
}

function onGuestLogin() {
  loginGuest()
  showToast('已以来宾身份登录')
  router.back()
}
</script>

<template>
  <div class="login">
    <button type="button" class="back" @click="onBack">返回</button>

    <div class="hero">
      <div class="logo-wrap">
        <img class="logo" :src="logoSrc" alt="" />
      </div>
      <h1 class="title">上门按摩小程序</h1>
      <p class="subtitle">尊敬的贵宾，请登录</p>
    </div>

    <div class="actions">
      <van-button
        block
        round
        type="primary"
        class="btn-wechat"
        icon="wechat"
        @click="onWeChatLogin"
      >
        微信授权登录
      </van-button>
      <van-button
        block
        round
        plain
        type="primary"
        class="btn-guest"
        @click="onGuestLogin"
      >
        演示模式来宾登录
      </van-button>
    </div>
  </div>
</template>

<style scoped>
.login {
  min-height: 100vh;
  min-height: 100dvh;
  padding: calc(12px + env(safe-area-inset-top)) 24px
    calc(28px + env(safe-area-inset-bottom));
  box-sizing: border-box;
  background: linear-gradient(180deg, #ecfdf5 0%, #f7f8fa 42%, #f7f8fa 100%);
  display: flex;
  flex-direction: column;
}

.back {
  align-self: flex-start;
  border: none;
  background: transparent;
  padding: 8px 4px;
  font-size: 15px;
  color: #0f766e;
  cursor: pointer;
}

.hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px 0 32px;
}

.logo-wrap {
  width: 88px;
  height: 88px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(15, 118, 110, 0.18);
  margin-bottom: 28px;
  background: #fff;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
  color: #134e4a;
  letter-spacing: 0.02em;
}

.subtitle {
  margin: 0;
  font-size: 15px;
  color: #64748b;
  line-height: 1.5;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.btn-wechat {
  --van-button-primary-background: #07c160;
  --van-button-primary-border-color: #07c160;
}

.btn-guest {
  --van-button-plain-primary-border-color: #0f766e;
  --van-button-plain-primary-color: #0f766e;
}
</style>
