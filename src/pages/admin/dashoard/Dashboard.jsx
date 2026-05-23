import { useEffect, useMemo, useState } from 'react'
import {
  FaArrowRotateRight,
  FaBoxOpen,
  FaDollarSign,
  FaReceipt,
  FaUsers,
} from 'react-icons/fa6'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

import { getAllOrdersService } from '../../../services/orderService'
import { getAllPaymentsService } from '../../../services/paymentService'
import { getAllProductsService } from '../../../services/productService'
import { getAllUsersService } from '../../../services/userService'

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
const statusLabels = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED']

const formatMoney = (v) => `$${Number(v || 0).toFixed(2)}`
const getBody = (r) => (r.status === 'fulfilled' ? r.value?.body || [] : [])

const COLORS = ['#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ef4444']

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchDashboard = async () => {
    setLoading(true)

    try {
      const [u, p, o, pay] = await Promise.allSettled([
        getAllUsersService(),
        getAllProductsService(),
        getAllOrdersService(),
        getAllPaymentsService(),
      ])

      setUsers(getBody(u))
      setProducts(getBody(p))
      setOrders(getBody(o))
      setPayments(getBody(pay))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const dashboardData = useMemo(() => {
    const paidPayments = payments.filter((p) => p.paymentStatus === 'PAID')

    const revenue = paidPayments.reduce((s, p) => s + Number(p.amount || 0), 0)

    // Monthly revenue (REAL)
    const monthlyRevenue = monthLabels.map((month, index) => {
      const total = paidPayments
        .filter((p) => new Date(p.createdAt).getMonth() === index)
        .reduce((s, p) => s + Number(p.amount || 0), 0)

      return { month, total }
    })

    // Order status chart
    const statusData = statusLabels.map((status) => ({
      name: status,
      value: orders.filter((o) => o.status === status).length,
    }))

    // Top products
    const map = new Map()

    orders.forEach((order) => {
      (order.items || []).forEach((item) => {
        const id = item.productId

        const current = map.get(id) || {
          name: item.productName,
          sold: 0,
          amount: 0,
        }

        current.sold += Number(item.quantity || 0)
        current.amount += Number(item.totalPrice || 0)

        map.set(id, current)
      })
    })

    const topProducts = Array.from(map.values())
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5)

    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)

    return {
      revenue,
      monthlyRevenue,
      statusData,
      topProducts,
      recentOrders,
    }
  }, [orders, payments])

  const stats = [
    { label: 'Revenue', value: formatMoney(dashboardData.revenue), icon: FaDollarSign },
    { label: 'Orders', value: orders.length, icon: FaReceipt },
    { label: 'Users', value: users.length, icon: FaUsers },
    { label: 'Products', value: products.length, icon: FaBoxOpen },
  ]

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        {/* <h1 className="text-2xl font-black">Dashboard</h1> */}

         <div>
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          </div>

        <button
          onClick={fetchDashboard}
          disabled={loading}
          className="rounded bg-[#2563EB] px-4 py-2 text-white"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white p-4 shadow">
            <s.icon className="mb-2 text-blue-600" />
            <p className="text-sm">{s.label}</p>
            <h2 className="text-xl font-black">{s.value}</h2>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-4">

        {/* LINE CHART */}
        <div className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-3 font-bold">Monthly Revenue</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dashboardData.monthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => `$${v}`} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-3 font-bold">Order Status</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dashboardData.statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {dashboardData.statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TOP PRODUCTS */}
      <div className="rounded-xl bg-white p-4 shadow">
        <h3 className="mb-3 font-bold">Top Products</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="text-sm">
              <th>Name</th>
              <th>Sold</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {dashboardData.topProducts.map((p) => (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>{p.sold}</td>
                <td>{formatMoney(p.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}