import { ref } from 'vue'
import { showToast } from 'vant'
import { loadFavoriteIds, saveFavoriteIds } from '@/mock/favorites'

const technicianIds = ref([])
const storeIds = ref([])
let inited = false

function hydrate() {
  const f = loadFavoriteIds()
  technicianIds.value = [...f.technicianIds]
  storeIds.value = [...f.storeIds]
}

export function useFavorites() {
  if (!inited) {
    hydrate()
    inited = true
  }

  function persist() {
    saveFavoriteIds({
      technicianIds: [...technicianIds.value],
      storeIds: [...storeIds.value],
    })
  }

  function toggleTechnician(id) {
    if (!id) return
    const set = new Set(technicianIds.value)
    if (set.has(id)) {
      set.delete(id)
      showToast('已取消收藏')
    } else {
      set.add(id)
      showToast('收藏成功')
    }
    technicianIds.value = [...set]
    persist()
  }

  function toggleStore(id) {
    if (!id) return
    const set = new Set(storeIds.value)
    if (set.has(id)) {
      set.delete(id)
      showToast('已取消收藏')
    } else {
      set.add(id)
      showToast('收藏成功')
    }
    storeIds.value = [...set]
    persist()
  }

  function isTechnicianFavorite(id) {
    return !!id && technicianIds.value.includes(id)
  }

  function isStoreFavorite(id) {
    return !!id && storeIds.value.includes(id)
  }

  /** 从 localStorage 再读一次（通常无需调用，收藏全经由本 composable 写入） */
  function refresh() {
    hydrate()
  }

  return {
    technicianIds,
    storeIds,
    toggleTechnician,
    toggleStore,
    isTechnicianFavorite,
    isStoreFavorite,
    refresh,
  }
}
