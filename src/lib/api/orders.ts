import { 
  listUserOrders as listUserOrdersFn,
  listAllOrders as listAllOrdersFn,
  updateOrderStatus as updateOrderStatusFn,
  getStoreKPIs as getStoreKPIsFn
} from '../../server/functions/orders'

export interface Order {
  id: number
  userId: string | null
  customerName: string
  phone: string
  address: string
  totalAmount: number
  paymentMethod: string
  paymentStatus: string
  transactionId: string | null
  status: string
  items: any[]
  createdAt: string
}

export interface OrdersAdapter {
  listUserOrders: () => Promise<Order[]>
  listAllOrders: () => Promise<Order[]>
  updateOrderStatus: (orderId: number, status: string) => Promise<Order>
  getStoreKPIs: () => Promise<any>
}

export const ordersApi: OrdersAdapter = {
  listUserOrders: async () => {
    const data = await listUserOrdersFn()
    return data as unknown as Order[]
  },
  listAllOrders: async () => {
    const data = await listAllOrdersFn()
    return data as unknown as Order[]
  },
  updateOrderStatus: async (orderId, status) => {
    const data = await updateOrderStatusFn({ data: { orderId, status } })
    return data as unknown as Order
  },
  getStoreKPIs: async () => {
    return await getStoreKPIsFn()
  }
}
