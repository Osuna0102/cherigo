import React, { useEffect, useState } from 'react'
import { client } from '../../src/lib/client'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import * as XLSX from 'xlsx'
import 'tailwindcss/tailwind.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

 const OrderStatsWidget = () => {
    const [stats, setStats] = useState({
      totalProducts: 0,
      totalInventory: 0,
      totalDiscountedProducts: 0,
      totalCategories: 0,
      products: [],
      totalSales: 0,
      topMonthlyItem: { name: '', sales: 0 },
      topAllTimeItem: { name: '', sales: 0 },
      overdueShipments: 0,
      salesPerformance: 0,
      monthlyProfit: 0,
      ordersToShip: 0,
      orderStatus: { pending: 0, shipped: 0, delivered: 0 }
    })
    const [searchCategory, setSearchCategory] = useState('')

    useEffect(() => {
      const fetchStats = async () => {
        const productQuery = '*[_type == "product"]'
        const products = await client.fetch(productQuery)

        const totalProducts = products.length
        const totalInventory = products.reduce((sum, product) => sum + (product.inventory || 0), 0)
        const totalDiscountedProducts = products.filter(product => product.discount > 0).length
        const totalCategories = new Set(products.flatMap(product => product.categories?.map(c => c.en))).size

        // Fetch orders
        const orderQuery = '*[_type == "order"]'
        const orders = await client.fetch(orderQuery)

        // Calculate real sales data
        const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0)
        const monthlyProfit = Math.floor(totalSales * 0.35) // Assuming 35% profit margin

        // Count order statuses
        const orderStatus = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1
          return acc
        }, { pending: 0, paid: 0, shipped: 0, delivered: 0 })

        // Calculate top selling items
        const itemSales = {}
        orders.forEach(order => {
          order.items?.forEach(item => {
            const productId = item.product?._ref
            if (productId) {
              itemSales[productId] = (itemSales[productId] || 0) + item.quantity
            }
          })
        })

        const sortedItems = Object.entries(itemSales).sort((a, b) => b[1] - a[1])
        const topAllTimeItem = sortedItems.length > 0 ? {
          name: products.find(p => p._id === sortedItems[0][0])?.name?.en || 'Unknown',
          sales: sortedItems[0][1]
        } : { name: 'No sales', sales: 0 }

        // For monthly, assume current month
        const currentMonth = new Date().getMonth()
        const monthlyOrders = orders.filter(order => new Date(order.createdAt).getMonth() === currentMonth)
        const monthlyItemSales = {}
        monthlyOrders.forEach(order => {
          order.items?.forEach(item => {
            const productId = item.product?._ref
            if (productId) {
              monthlyItemSales[productId] = (monthlyItemSales[productId] || 0) + item.quantity
            }
          })
        })
        const sortedMonthly = Object.entries(monthlyItemSales).sort((a, b) => b[1] - a[1])
        const topMonthlyItem = sortedMonthly.length > 0 ? {
          name: products.find(p => p._id === sortedMonthly[0][0])?.name?.en || 'Unknown',
          sales: sortedMonthly[0][1]
        } : { name: 'No sales', sales: 0 }

        // Simulate other data (overdue, performance, orders to ship)
        const overdueShipments = Math.floor(Math.random() * 10)
        const ordersToShip = orderStatus.pending + orderStatus.paid
        const salesPerformance = Math.min(100, Math.floor((totalSales / 50000) * 100) + 60) // Based on sales

        setStats({
          totalProducts,
          totalInventory,
          totalDiscountedProducts,
          totalCategories,
          products,
          totalSales,
          topMonthlyItem,
          topAllTimeItem,
          overdueShipments,
          salesPerformance,
          monthlyProfit,
          ordersToShip,
          orderStatus
        })
      }

      fetchStats()
    }, [])

    const handleExport = () => {
      const worksheet = XLSX.utils.json_to_sheet(stats.products)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')
      XLSX.writeFile(workbook, 'products_stats.xlsx')
    }

    const filteredProducts = stats.products.filter(product =>
      !searchCategory || product.categories?.some(c => c.en === searchCategory)
    )

    const barData = {
      labels: ['Total Products', 'Total Inventory', 'Discounted Products', 'Categories'],
      datasets: [
        {
          label: 'Statistics',
          data: [stats.totalProducts, stats.totalInventory, stats.totalDiscountedProducts, stats.totalCategories],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
          borderWidth: 1,
        },
      ],
    }

    const pieData = {
      labels: ['Total Products', 'Total Inventory', 'Discounted Products', 'Categories'],
      datasets: [
        {
          label: 'Statistics',
          data: [stats.totalProducts, stats.totalInventory, stats.totalDiscountedProducts, stats.totalCategories],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
          borderWidth: 1,
        },
      ],
    }

    return (
      <div style={{ padding: '16px', backgroundColor: '#121212', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.5)', margin: '0', width: '100%', fontSize: '12px', color: '#e0e0e0' }}>
        {/* Header */}
        <div style={{ borderBottom: '1px solid #333333', paddingBottom: '12px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '18px', width: '18px', marginRight: '10px', color: '#60a5fa' }} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
            </svg>
            Dashboard Statistics
          </h2>
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>Overview of products, sales and orders</p>
        </div>

        {/* Top KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#1e3a8a', borderRadius: '6px', padding: '12px', border: '1px solid #2563eb', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '500', color: '#93c5fd' }}>Total Products</p>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f0f0f0', marginTop: '4px' }}>{stats.totalProducts}</h3>
              </div>
              <div style={{ borderRadius: '50%', backgroundColor: '#1e40af', padding: '6px', color: '#60a5fa' }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '14px', width: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#064e3b', borderRadius: '6px', padding: '12px', border: '1px solid #059669', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '500', color: '#6ee7b7' }}>Total Inventory</p>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f0f0f0', marginTop: '4px' }}>{stats.totalInventory}</h3>
              </div>
              <div style={{ borderRadius: '50%', backgroundColor: '#065f46', padding: '6px', color: '#34d399' }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '14px', width: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#78350f', borderRadius: '6px', padding: '12px', border: '1px solid #b45309', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '500', color: '#fcd34d' }}>Total Sales</p>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f0f0f0', marginTop: '4px' }}>${stats.totalSales.toLocaleString()}</h3>
              </div>
              <div style={{ borderRadius: '50%', backgroundColor: '#92400e', padding: '6px', color: '#fbbf24' }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '14px', width: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#7f1d1d', borderRadius: '6px', padding: '12px', border: '1px solid #b91c1c', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '500', color: '#fca5a5' }}>Monthly Profit</p>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f0f0f0', marginTop: '4px' }}>${stats.monthlyProfit.toLocaleString()}</h3>
              </div>
              <div style={{ borderRadius: '50%', backgroundColor: '#991b1b', padding: '6px', color: '#f87171' }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '14px', width: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Export */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', backgroundColor: '#1e1e1e', padding: '12px', borderRadius: '6px', border: '1px solid #333333' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', width: '100%' }}>
            <label style={{ fontSize: '12px', fontWeight: '500', color: '#d1d5db', marginRight: '8px' }}>Category:</label>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              style={{ padding: '6px', fontSize: '12px', border: '1px solid #4b5563', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.2)', backgroundColor: '#2d2d2d', color: '#e5e7eb', flexGrow: 1 }}
            >
              <option value="">All Categories</option>
              {Array.from(new Set(stats.products.flatMap(product => product.categories?.map(c => c.en)))).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button
              onClick={handleExport}
              style={{ backgroundColor: '#4f46e5', color: 'white', fontSize: '12px', padding: '6px 12px', marginLeft: '12px', borderRadius: '4px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '12px', width: '12px', marginRight: '6px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          {/* Charts Section */}
          <div style={{ backgroundColor: '#1e1e1e', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', padding: '16px', border: '1px solid #333333' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#f0f0f0', marginBottom: '12px' }}>Product Analytics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ position: 'relative', minHeight: '180px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#9ca3af', marginBottom: '8px' }}>Product Distribution</h4>
                <div style={{ height: '160px', width: '100%' }}>
                  <Bar
                    data={{
                      ...barData,
                      datasets: [{
                        ...barData.datasets[0],
                        backgroundColor: ['rgba(129, 140, 248, 0.6)', 'rgba(52, 211, 153, 0.6)', 'rgba(251, 191, 36, 0.6)', 'rgba(167, 139, 250, 0.6)'],
                        borderColor: ['rgba(129, 140, 248, 1)', 'rgba(52, 211, 153, 1)', 'rgba(251, 191, 36, 1)', 'rgba(167, 139, 250, 1)'],
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          enabled: true,
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          titleFont: { size: 10 },
                          bodyFont: { size: 10 },
                          titleColor: '#f0f0f0',
                          bodyColor: '#f0f0f0'
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: { font: { size: 10 }, color: '#d1d5db' },
                          grid: { display: false },
                          border: { color: '#4b5563' }
                        },
                        x: {
                          ticks: { font: { size: 10 }, color: '#d1d5db' },
                          grid: { display: false },
                          border: { color: '#4b5563' }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <div style={{ position: 'relative', minHeight: '180px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#9ca3af', marginBottom: '8px' }}>Category Breakdown</h4>
                <div style={{ height: '160px', width: '100%' }}>
                  <Pie
                    data={{
                      ...pieData,
                      datasets: [{
                        ...pieData.datasets[0],
                        backgroundColor: ['rgba(129, 140, 248, 0.7)', 'rgba(52, 211, 153, 0.7)', 'rgba(251, 191, 36, 0.7)', 'rgba(167, 139, 250, 0.7)'],
                        borderColor: ['rgba(129, 140, 248, 1)', 'rgba(52, 211, 153, 1)', 'rgba(251, 191, 36, 1)', 'rgba(167, 139, 250, 1)'],
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: true,
                          position: 'bottom',
                          labels: {
                            color: '#d1d5db',
                            font: { size: 10 }
                          }
                        },
                        tooltip: {
                          enabled: true,
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          titleFont: { size: 10 },
                          bodyFont: { size: 10 },
                          titleColor: '#f0f0f0',
                          bodyColor: '#f0f0f0'
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div style={{ backgroundColor: '#1e1e1e', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', padding: '16px', border: '1px solid #333333' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#f0f0f0', marginBottom: '12px' }}>Order Status</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '12px', backgroundColor: '#78350f', borderRadius: '6px', border: '1px solid #92400e' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#f0f0f0' }}>Pending</h4>
                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#fcd34d', marginTop: '4px' }}>{stats.orderStatus.pending}</p>
                  </div>
                  <div style={{ borderRadius: '50%', backgroundColor: '#92400e', padding: '6px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '12px', width: '12px', color: '#fbbf24' }} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#1e3a8a', borderRadius: '6px', border: '1px solid #1e40af' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#f0f0f0' }}>Paid</h4>
                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#93c5fd', marginTop: '4px' }}>{stats.orderStatus.paid}</p>
                  </div>
                  <div style={{ borderRadius: '50%', backgroundColor: '#1e40af', padding: '6px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '12px', width: '12px', color: '#60a5fa' }} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h5a1 1 0 001-1v-4a1 1 0 00-.293-.707L12 3.293A1 1 0 0011.293 3H4a1 1 0 00-1 1z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#064e3b', borderRadius: '6px', border: '1px solid #065f46' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#f0f0f0' }}>Shipped</h4>
                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#6ee7b7', marginTop: '4px' }}>{stats.orderStatus.shipped}</p>
                  </div>
                  <div style={{ borderRadius: '50%', backgroundColor: '#065f46', padding: '6px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '12px', width: '12px', color: '#34d399' }} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h5a1 1 0 001-1v-4a1 1 0 00-.293-.707L12 3.293A1 1 0 0011.293 3H4a1 1 0 00-1 1z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#7f1d1d', borderRadius: '6px', border: '1px solid #b91c1c' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#f0f0f0' }}>Delivered</h4>
                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#fca5a5', marginTop: '4px' }}>{stats.orderStatus.delivered}</p>
                  </div>
                  <div style={{ borderRadius: '50%', backgroundColor: '#991b1b', padding: '6px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '12px', width: '12px', color: '#f87171' }} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Performance */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#d1d5db' }}>Sales Target: {stats.salesPerformance}%</h4>
              </div>
              <div style={{ width: '100%', backgroundColor: '#374151', borderRadius: '9999px', height: '8px' }}>
                <div
                  style={{
                    height: '8px',
                    borderRadius: '9999px',
                    width: `${stats.salesPerformance}%`,
                    backgroundColor: stats.salesPerformance >= 70 ? '#34d399' : stats.salesPerformance >= 40 ? '#fbbf24' : '#f87171'
                  }}
                ></div>
              </div>
            </div>

            {/* Top Items */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '12px', backgroundColor: '#252525', border: '1px solid #333333', borderRadius: '6px' }}>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>Top Monthly Item</p>
                <p style={{ fontSize: '12px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#f0f0f0', marginTop: '4px' }}>{stats.topMonthlyItem.name}</p>
                <p style={{ fontSize: '12px', color: '#818cf8', marginTop: '4px' }}>{stats.topMonthlyItem.sales} units</p>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#252525', border: '1px solid #333333', borderRadius: '6px' }}>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>Top All-Time Item</p>
                <p style={{ fontSize: '12px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#f0f0f0', marginTop: '4px' }}>{stats.topAllTimeItem.name}</p>
                <p style={{ fontSize: '12px', color: '#818cf8', marginTop: '4px' }}>{stats.topAllTimeItem.sales} units</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders To Ship */}
        <div style={{ backgroundColor: '#1e1e1e', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', padding: '16px', border: '1px solid #333333', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#f0f0f0', marginBottom: '12px' }}>Orders To Ship: {stats.ordersToShip}</h3>
          <div style={{ height: '80px', width: '100%' }}>
            <Bar
              data={{
                labels: ['Today', 'Tomorrow', 'This Week'],
                datasets: [
                  {
                    label: 'Orders',
                    data: [stats.ordersToShip, Math.floor(stats.ordersToShip * 0.6), Math.floor(stats.ordersToShip * 2.2)],
                    backgroundColor: ['rgba(96, 165, 250, 0.7)', 'rgba(52, 211, 153, 0.7)', 'rgba(251, 191, 36, 0.7)'],
                    borderColor: ['rgba(96, 165, 250, 1)', 'rgba(52, 211, 153, 1)', 'rgba(251, 191, 36, 1)'],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: { size: 10 },
                    bodyFont: { size: 10 },
                    titleColor: '#f0f0f0',
                    bodyColor: '#f0f0f0'
                  }
                },
                scales: {
                  y: {
                    ticks: { font: { size: 10 }, color: '#d1d5db' },
                    grid: { display: false },
                    border: { color: '#4b5563' }
                  },
                  x: {
                    ticks: { font: { size: 10 }, color: '#d1d5db' },
                    grid: { display: false },
                    border: { color: '#4b5563' }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Filtered Products */}
        {filteredProducts.length > 0 && (
          <div style={{ backgroundColor: '#1e1e1e', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', padding: '16px', border: '1px solid #333333' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#f0f0f0', marginBottom: '12px' }}>Filtered Products</h3>
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead style={{ backgroundColor: '#252525' }}>
                  <tr>
                    <th style={{ padding: '8px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                    <th style={{ padding: '8px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories</th>
                    <th style={{ padding: '8px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inventory</th>
                    <th style={{ padding: '8px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product._id} style={{ borderTop: '1px solid #333333' }}>
                      <td style={{ padding: '8px 16px', whiteSpace: 'nowrap', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <div style={{ fontWeight: '500', color: '#e5e7eb' }}>{product.name?.en}</div>
                      </td>
                      <td style={{ padding: '8px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {product.categories?.map(cat => (
                            <span key={cat.en} style={{ padding: '2px 6px', display: 'inline-flex', fontSize: '10px', fontWeight: '600', borderRadius: '9999px', backgroundColor: '#312e81', color: '#a5b4fc' }}>
                              {cat.en}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '8px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ color: '#e5e7eb' }}>{product.inventory || 0}</div>
                      </td>
                      <td style={{ padding: '8px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ color: '#e5e7eb' }}>${product.price?.toFixed(2) || '0.00'}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    )
  }

  export const orderStatsWidget = {
    name: 'orderStats',
    component: OrderStatsWidget
  }
