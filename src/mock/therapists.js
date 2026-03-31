export const MASSAGE_TYPES = [
  '中式颈椎按摩',
  '足底推拿',
  '全身精油',
  '肩颈调理',
  '腰背舒缓',
  '头部减压',
]

export const therapists = [
  {
    id: 't1',
    name: '王强',
    gender: 'male',
    avatar: '',
    distanceKm: 1.2,
    tags: ['中式颈椎按摩', '肩颈调理'],
    intro: '从业八年，擅长颈椎与肩颈调理，手法柔和有力。',
    priceRange: { min: 168, max: 398 },
    orgName: '康体推拿中心',
    isPersonal: false,
    packages: [
      { id: 'p1', name: '标准全身 60 分钟', price: 268 },
      { id: 'p2', name: '肩颈专项 45 分钟', price: 198 },
    ],
    licenseImage: '',
    licenseNote: '持证上岗 · 健康师资格证',
  },
  {
    id: 't2',
    name: '李敏',
    gender: 'female',
    avatar: '',
    distanceKm: 2.5,
    tags: ['全身精油', '腰背舒缓'],
    intro: '注重沟通与力度调节，适合久坐办公人群。',
    priceRange: { min: 198, max: 458 },
    orgName: '',
    isPersonal: true,
    packages: [
      { id: 'p3', name: '精油舒压 90 分钟', price: 398 },
      { id: 'p4', name: '腰背专项 50 分钟', price: 228 },
    ],
    licenseImage: '',
    licenseNote: '个人技师 · 职业培训认证',
  },
  {
    id: 't3',
    name: '张伟',
    gender: 'male',
    avatar: '',
    distanceKm: 0.8,
    tags: ['足底推拿', '头部减压'],
    intro: '足疗与头部放松结合，缓解疲劳见效快。',
    priceRange: { min: 128, max: 328 },
    orgName: '足尚养生馆',
    isPersonal: false,
    packages: [
      { id: 'p5', name: '足疗+头疗套餐', price: 258 },
    ],
    licenseImage: '',
    licenseNote: '机构备案技师',
  },
  {
    id: 't4',
    name: '陈静',
    gender: 'female',
    avatar: '',
    distanceKm: 3.1,
    tags: ['中式颈椎按摩', '腰背舒缓', '全身精油'],
    intro: '温柔细致，哺乳期后修复与腰背护理经验丰富。',
    priceRange: { min: 218, max: 488 },
    orgName: '静心理疗',
    isPersonal: false,
    packages: [
      { id: 'p6', name: '产后腰背护理', price: 358 },
      { id: 'p7', name: '全身放松 75 分钟', price: 328 },
    ],
    licenseImage: '',
    licenseNote: '理疗师证书编号备案可查',
  },
  {
    id: 't5',
    name: '刘洋',
    gender: 'male',
    avatar: '',
    distanceKm: 4.0,
    tags: ['肩颈调理', '头部减压'],
    intro: '曾任运动康复方向，擅长运动损伤后放松。',
    priceRange: { min: 188, max: 368 },
    orgName: '',
    isPersonal: true,
    packages: [{ id: 'p8', name: '运动恢复套餐 60 分', price: 288 }],
    licenseImage: '',
    licenseNote: '运动康复培训认证',
  },
]

export function getTherapistById(id) {
  return therapists.find((t) => t.id === id) ?? null
}

export function getTherapistsByIds(ids) {
  const set = new Set(ids)
  return therapists.filter((t) => set.has(t.id))
}
