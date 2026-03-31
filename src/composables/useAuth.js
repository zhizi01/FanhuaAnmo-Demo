import { ref, computed } from 'vue'

const LS_KEY = 'zhizi-anmo-auth'

const loggedIn = ref(false)
const account = ref('')
const nickname = ref('游客')
const phone = ref('')
const address = ref('')
const avatar = ref('')
const memberLevel = ref('普通会员')

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) {
      resetLocalState()
      return
    }
    const u = JSON.parse(raw)
    loggedIn.value = !!u.loggedIn
    account.value = u.account ?? ''
    nickname.value = u.nickname ?? '游客'
    phone.value = u.phone ?? ''
    address.value = u.address ?? ''
    avatar.value = u.avatar ?? ''
    memberLevel.value = u.memberLevel ?? '普通会员'
  } catch {
    loggedIn.value = false
    resetLocalState()
  }
}

function resetLocalState() {
  loggedIn.value = false
  account.value = ''
  nickname.value = '游客'
  phone.value = ''
  address.value = ''
  avatar.value = ''
  memberLevel.value = '普通会员'
}

function persist() {
  localStorage.setItem(
    LS_KEY,
    JSON.stringify({
      loggedIn: loggedIn.value,
      account: account.value,
      nickname: nickname.value,
      phone: phone.value,
      address: address.value,
      avatar: avatar.value,
      memberLevel: memberLevel.value,
    }),
  )
}

load()

export function useAuth() {
  const user = computed(() => ({
    loggedIn: loggedIn.value,
    account: account.value,
    nickname: nickname.value,
    phone: phone.value,
    address: address.value,
    avatar: avatar.value,
    memberLevel: memberLevel.value,
  }))

  /** 个人中心头像点击（演示黄金会员） */
  function loginDemo() {
    loggedIn.value = true
    account.value = ''
    nickname.value = '芷子用户'
    phone.value = '138****8888'
    address.value = ''
    avatar.value = ''
    memberLevel.value = '黄金会员'
    persist()
  }

  /** 登录页 · 演示来宾 */
  function loginGuest() {
    loggedIn.value = true
    account.value = 'guest'
    nickname.value = '来宾'
    phone.value = '18888888888'
    address.value =
      '河南省郑州市金水区拉格朗姆大厦B1305郑州铁影网络'
    avatar.value = ''
    memberLevel.value = '演示来宾'
    persist()
  }

  function logout() {
    resetLocalState()
    persist()
  }

  return {
    loggedIn,
    account,
    nickname,
    phone,
    address,
    avatar,
    memberLevel,
    user,
    load,
    loginDemo,
    loginGuest,
    logout,
  }
}
