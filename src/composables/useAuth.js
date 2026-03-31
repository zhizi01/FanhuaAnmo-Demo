import { ref, computed } from 'vue'

const LS_KEY = 'zhizi-anmo-auth'

const loggedIn = ref(false)
const nickname = ref('游客')
const phone = ref('')
const avatar = ref('')
const memberLevel = ref('普通会员')

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) {
      loggedIn.value = false
      nickname.value = '游客'
      phone.value = ''
      avatar.value = ''
      memberLevel.value = '普通会员'
      return
    }
    const u = JSON.parse(raw)
    loggedIn.value = !!u.loggedIn
    nickname.value = u.nickname ?? '游客'
    phone.value = u.phone ?? ''
    avatar.value = u.avatar ?? ''
    memberLevel.value = u.memberLevel ?? '普通会员'
  } catch {
    loggedIn.value = false
  }
}

function persist() {
  localStorage.setItem(
    LS_KEY,
    JSON.stringify({
      loggedIn: loggedIn.value,
      nickname: nickname.value,
      phone: phone.value,
      avatar: avatar.value,
      memberLevel: memberLevel.value,
    }),
  )
}

load()

export function useAuth() {
  const user = computed(() => ({
    loggedIn: loggedIn.value,
    nickname: nickname.value,
    phone: phone.value,
    avatar: avatar.value,
    memberLevel: memberLevel.value,
  }))

  function loginDemo() {
    loggedIn.value = true
    nickname.value = '芷子用户'
    phone.value = '138****8888'
    avatar.value = ''
    memberLevel.value = '黄金会员'
    persist()
  }

  function logout() {
    loggedIn.value = false
    nickname.value = '游客'
    phone.value = ''
    avatar.value = ''
    memberLevel.value = '普通会员'
    persist()
  }

  return {
    loggedIn,
    nickname,
    phone,
    avatar,
    memberLevel,
    user,
    load,
    loginDemo,
    logout,
  }
}
