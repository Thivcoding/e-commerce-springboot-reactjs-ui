import { useEffect, useMemo, useState } from 'react'
import {
  FaArrowRotateRight,
  FaArrowTrendUp,
  FaBoxOpen,
  FaChartColumn,
  FaChartLine,
  FaDollarSign,
  FaReceipt,
  FaUsers,
} from 'react-icons/fa6'
import { getAllOrdersService } from '../../../services/orderService'
import { getAllPaymentsService } from '../../../services/paymentService'
import { getAllProductsService } from '../../../services/productService'
import { getAllUsersService } from '../../../services/userService'

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
const statusLabels = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED']

const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`

const formatDate = (value) => {
  if (!value) return '-'

  return new Date(value).toLocaleString()
}

const getBody = (result) => {
  if (result.status !== 'fulfilled') return []

  return result.value?.body || []
}

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchDashboard = async () => {
    try {
      setLoading(true)

      const [usersResult, productsResult, ordersResult, paymentsResult] =
        await Promise.allSettled([
          getAllUsersService(),
          getAllProductsService(),
          getAllOrdersService(),
          getAllPaymentsService(),
        ])

      setUsers(getBody(usersResult))
      setProducts(getBody(productsResult))
      setOrders(getBody(ordersResult))
      setPayments(getBody(paymentsResult))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true

    const loadDashboard = async () => {
      try {
        setLoading(true)

        const [usersResult, productsResult, ordersResult, paymentsResult] =
          await Promise.allSettled([
            getAllUsersService(),
            getAllProductsService(),
            getAllOrdersService(),
            getAllPaymentsService(),
          ])

        if (active) {
          setUsers(getBody(usersResult))
          setProducts(getBody(productsResult))
          setOrders(getBody(ordersResult))
          setPayments(getBody(paymentsResult))
        }
      } catch (error) {
        console.log(error)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      active = false
    }
  }, [])

  const dashboardData = useMemo(() => {
    const paidPayments = payments.filter((payment) => payment.paymentStatus === 'PAID')
    const paymentRevenue = paidPayments.reduce(
      (total, payment) => total + Number(payment.amount || 0),
      0
    )

    const orderRevenue = orders.reduce((total, order) => total + Number(order.totalPrice || 0), 0)
    const revenue = paymentRevenue || orderRevenue

    const monthlyTotals = monthLabels.map((month, index) => {
      const total = orders
        .filter((order) => {
          if (!order.createdAt) return false

          return new Date(order.createdAt).getMonth() === index
        })
        .reduce((sum, order) => sum + Number(order.totalPrice || 0), 0)

      return {
        month,
        total,
      }
    })

    const maxMonthlyTotal = Math.max(...monthlyTotals.map((item) => item.total), 1)

    const salesData = monthlyTotals.map((item) => ({
      ...item,
      value: Math.max((item.total / maxMonthlyTotal) * 100, item.total > 0 ? 8 : 0),
    }))

    const statusData = statusLabels.map((status) => {
      const count = orders.filter((order) => order.status === status).length
      const value = orders.length ? (count / orders.length) * 100 : 0

      return {
        status,
        count,
        value,
      }
    })

    const soldMap = orders.reduce((map, order) => {
      ;(order.items || []).forEach((item) => {
        const key = item.productId || item.productName
        const current = map.get(key) || {
          name: item.productName || 'Unknown product',
          sold: 0,
          amount: 0,
          stock: 0,
        }

        current.sold += Number(item.quantity || 0)
        current.amount += Number(item.totalPrice || 0)

        map.set(key, current)
      })

      return map
    }, new Map())

    products.forEach((product) => {
      const current = soldMap.get(product.id) || {
        name: product.name,
        sold: 0,
        amount: 0,
        stock: product.stock || 0,
      }

      current.stock = product.stock || 0
      soldMap.set(product.id, current)
    })

    const topProducts = Array.from(soldMap.values())
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5)

    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5)

    return {
      revenue,
      salesData,
      statusData,
      topProducts,
      recentOrders,
    }
  }, [orders, payments, products])

  const stats = [
    {
      label: 'Total revenue',
      value: formatMoney(dashboardData.revenue),
      change: 'Real data',
      tone: 'bg-blue-50 text-blue-700',
      icon: FaDollarSign,
    },
    {
      label: 'Orders',
      value: orders.length.toLocaleString(),
      change: 'Live API',
      tone: 'bg-emerald-50 text-emerald-700',
      icon: FaReceipt,
    },
    {
      label: 'Customers',
      value: users.length.toLocaleString(),
      change: 'Live API',
      tone: 'bg-violet-50 text-violet-700',
      icon: FaUsers,
    },
    {
      label: 'Products',
      value: products.length.toLocaleString(),
      change: 'Live API',
      tone: 'bg-amber-50 text-amber-700',
      icon: FaBoxOpen,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold text-slate-500">Overview</p>
          <h2 className="text-3xl font-black text-slate-950">Store performance</h2>
        </div>

        <button
          type="button"
          onClick={fetchDashboard}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <FaArrowRotateRight className={loading ? 'animate-spin' : ''} />
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.tone}`}>
                  <item.icon />
                </div>
                <p className="text-sm font-bold text-slate-500">{item.label}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${item.tone}`}>
                <FaArrowTrendUp className="mr-1 inline-block" />
                {item.change}
              </span>
            </div>
            <p className="mt-4 text-3xl font-black text-slate-950">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-950">
                <FaChartColumn className="text-blue-600" />
                Monthly sales
              </h3>
              <p className="text-sm font-semibold text-slate-500">Revenue by order month</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
              API
            </span>
          </div>

          <div className="flex h-72 items-end gap-3 border-b border-slate-200 pb-4">
            {dashboardData.salesData.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-56 w-full items-end rounded-xl bg-slate-100 p-1">
                  <div
                    className="w-full rounded-lg bg-blue-600 shadow-lg shadow-blue-100"
                    style={{ height: `${item.value}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-slate-500">{item.month}</p>
                  <p className="text-[11px] font-bold text-slate-400">{formatMoney(item.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-lg font-black text-slate-950">
              <FaChartLine className="text-emerald-600" />
              Order status
            </h3>
            <p className="text-sm font-semibold text-slate-500">Current order distribution</p>
          </div>

          <div className="space-y-4">
            {dashboardData.statusData.map((item) => (
              <div key={item.status}>
                <div className="mb-2 flex items-center justify-between text-sm font-bold">
                  <span className="text-slate-600">{item.status}</span>
                  <span className="text-slate-950">{item.count}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-emerald-500"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="flex items-center gap-2 text-lg font-black text-slate-950">
            <FaBoxOpen className="text-amber-600" />
            Top products
          </h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Sold</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dashboardData.topProducts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-sm font-bold text-slate-400">
                      No product sales yet
                    </td>
                  </tr>
                ) : (
                  dashboardData.topProducts.map((product) => (
                    <tr key={product.name}>
                      <td className="py-4 text-sm font-black text-slate-950">{product.name}</td>
                      <td className="py-4 text-sm font-bold text-slate-600">{product.sold}</td>
                      <td className="py-4 text-sm font-bold text-slate-600">{product.stock}</td>
                      <td className="py-4 text-right text-sm font-black text-slate-950">
                        {formatMoney(product.amount)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="flex items-center gap-2 text-lg font-black text-slate-950">
            <FaReceipt className="text-blue-600" />
            Recent orders
          </h3>
          <div className="mt-5 space-y-3">
            {dashboardData.recentOrders.length === 0 ? (
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 text-center text-sm font-bold text-slate-400">
                No recent orders
              </div>
            ) : (
              dashboardData.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="min-w-0">
                    <p className="font-black text-slate-950">#{order.id}</p>
                    <p className="truncate text-sm font-semibold text-slate-500">
                      {order.userName || order.fullName || 'Unknown customer'}
                    </p>
                    <p className="text-xs font-bold text-slate-400">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-950">{formatMoney(order.totalPrice)}</p>
                    <p className="text-xs font-black text-blue-600">{order.status}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
