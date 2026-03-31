/** 整点半点（:00 / :30），严格大于当前时刻，且落在未来 24 小时内（不含第 24 小时整点之后的时段） */
export function getBookableHalfHourSlots(now = new Date()) {
  const limit = now.getTime() + 24 * 60 * 60 * 1000
  const slot = new Date(now)
  slot.setSeconds(0, 0)
  slot.setMilliseconds(0)
  const m = slot.getMinutes()
  slot.setMinutes(m - (m % 30))

  while (slot.getTime() <= now.getTime()) {
    slot.setMinutes(slot.getMinutes() + 30)
  }

  const out = []
  while (slot.getTime() < limit) {
    out.push({
      value: slot.getTime(),
      label: formatSlotLabel(slot),
    })
    slot.setMinutes(slot.getMinutes() + 30)
  }
  return out
}

function formatSlotLabel(d) {
  const M = String(d.getMonth() + 1).padStart(2, '0')
  const D = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${M}-${D} ${h}:${m}`
}
