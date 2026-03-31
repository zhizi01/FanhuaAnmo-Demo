const LS_FAV = 'zhizi-anmo-favorites'

export function loadFavoriteIds() {
  try {
    const raw = localStorage.getItem(LS_FAV)
    if (raw) {
      const v = JSON.parse(raw)
      return {
        technicianIds: Array.isArray(v.technicianIds) ? v.technicianIds : [],
        storeIds: Array.isArray(v.storeIds) ? v.storeIds : [],
      }
    }
  } catch {
    /* ignore */
  }
  return {
    technicianIds: [],
    storeIds: [],
  }
}

export function saveFavoriteIds({ technicianIds, storeIds }) {
  localStorage.setItem(
    LS_FAV,
    JSON.stringify({
      technicianIds: Array.isArray(technicianIds) ? technicianIds : [],
      storeIds: Array.isArray(storeIds) ? storeIds : [],
    }),
  )
}
