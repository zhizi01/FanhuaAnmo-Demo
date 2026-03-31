<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showTab = computed(() => !route.meta.hideTabBar)
</script>

<template>
  <div
    class="app-root"
    :class="showTab ? 'app-page' : 'app-page app-page--no-tab'"
  >
    <router-view />
    <van-tabbar v-if="showTab" route placeholder fixed safe-area-inset-bottom>
      <van-tabbar-item replace to="/door" icon="logistics">
        上门按摩
      </van-tabbar-item>
      <van-tabbar-item replace to="/store" icon="shop-o">
        到店按摩
      </van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="user-o">
        个人中心
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100dvh;
}
</style>
