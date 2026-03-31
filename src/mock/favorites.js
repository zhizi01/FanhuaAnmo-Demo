/** 与 localStorage 同步的默认收藏 id，可被用户覆盖 */
export const defaultFavoriteTechnicianIds = ['t1', 't3']
export const defaultFavoriteStoreIds = ['s1']

const LS_FAV = 'zhizi-anmo-favorites'

export function loadFavoriteIds() {
  try {
    const raw = localStorage.getItem(LS_FAV)
    if (raw) {
      const v = JSON.parse(raw)
      return {
        technicianIds: Array.isArray(v.technicianIds) ? v.technicianIds : [...defaultFavoriteTechnicianIds],
        storeIds: Array.isArray(v.storeIds) ? v.storeIds : [...defaultFavoriteStoreIds],
      }
    }
  } catch {
    /* ignore */
  }
  return {
    technicianIds: [...defaultFavoriteTechnicianIds],
    storeIds: [...defaultFavoriteStoreIds],
  }
}

export function saveFavoriteIds({ technicianIds, storeIds }) {
  localStorage.setItem(LS_FAV, JSON.stringify({ technicianIds, storeIds }))
}
