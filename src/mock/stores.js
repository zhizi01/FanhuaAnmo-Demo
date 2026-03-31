export const stores = [
  {
    id: 's1',
    name: '康体推拿·徐汇店',
    image: '',
    distanceKm: 1.5,
    tags: ['中式', '足疗', '可停车'],
    intro: '门面整洁，独立包厢，支持线上预约。',
    address: '徐汇区淮海中路 1888 号 2F',
    therapistIds: ['t1', 't3', 't4'],
  },
  {
    id: 's2',
    name: '静心理疗工作室',
    image: '',
    distanceKm: 2.8,
    tags: ['女性友好', '精油 SPA'],
    intro: '小而美工作室，一对一服务，需提前预约。',
    address: '静安区南京西路商圈某商务楼 1206',
    therapistIds: ['t2', 't4'],
  },
  {
    id: 's3',
    name: '足尚养生馆（浦东）',
    image: '',
    distanceKm: 5.2,
    tags: ['足疗', '肩颈', '连锁'],
    intro: '连锁门店，环境明亮，适合下班后来放松。',
    address: '浦东新区张杨路 500 号 B1',
    therapistIds: ['t3', 't1'],
  },
]

export function getStoreById(id) {
  return stores.find((s) => s.id === id) ?? null
}
