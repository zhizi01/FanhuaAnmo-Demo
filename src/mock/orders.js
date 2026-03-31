export const orders = [
  {
    id: 'o1',
    type: 'door',
    refId: 't2',
    title: '上门 · 李敏 · 精油舒压',
    amount: 398,
    status: 'completed',
    createdAt: '2026-03-20 14:30',
  },
  {
    id: 'o2',
    type: 'store',
    refId: 's1',
    title: '到店 · 康体推拿·徐汇店',
    amount: 268,
    status: 'pending',
    createdAt: '2026-03-28 10:00',
  },
  {
    id: 'o3',
    type: 'door',
    refId: 't1',
    title: '上门 · 王强 · 肩颈专项',
    amount: 198,
    status: 'cancelled',
    createdAt: '2026-02-10 09:15',
  },
]

export const ORDER_STATUS_LABEL = {
  pending: '待服务',
  completed: '已完成',
  cancelled: '已取消',
}
