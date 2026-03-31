<script setup>
import { PROFILE_COVER_GG } from '@/constants/assets'

defineProps({
  avatarSrc: { type: String, required: true },
})
</script>

<template>
  <div class="profile-cover-wrap">
    <img class="profile-cover-img" :src="PROFILE_COVER_GG" alt="" />
  </div>
  <div class="profile-avatar-overlap">
    <img :src="avatarSrc" alt="" />
  </div>
</template>
