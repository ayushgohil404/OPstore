import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { N as DollarSign, S as PackageOpen, o as TrendingUp, p as ShoppingBag, r as Users, s as TrendingDown } from "../_libs/lucide-react.mjs";
import { r as getLowStockProducts } from "./products-BtALL_Ne.mjs";
import { t as ordersApi } from "./orders-Dvl6-FEu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-B7JHjhGi.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const { data: kpis, isLoading } = useQuery({
		queryKey: ["admin-kpis"],
		queryFn: () => ordersApi.getStoreKPIs()
	});
	const { data: lowStockItems = [] } = useQuery({
		queryKey: ["admin-low-stock"],
		queryFn: () => getLowStockProducts()
	});
	if (isLoading || !kpis) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-muted-foreground animate-pulse",
		children: "Loading dashboard..."
	});
	const { totalRevenue, totalOrders, activeCustomers, recentOrders } = kpis;
	const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight mb-1",
					children: "Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Welcome back. Here's what's happening with your store today."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "bg-background border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Time" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Today" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Last 7 Days" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors",
						children: "Download Report"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "Total Revenue",
						value: `$${totalRevenue.toFixed(2)}`,
						change: "+14.5%",
						trend: "up",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "w-5 h-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "Total Orders",
						value: totalOrders.toString(),
						change: "+8.2%",
						trend: "up",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "w-5 h-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "Active Customers",
						value: activeCustomers.toString(),
						change: "-2.4%",
						trend: "down",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-5 h-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "Avg. Order Value",
						value: `$${avgOrderValue.toFixed(2)}`,
						change: "+4.1%",
						trend: "up",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-5 h-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 bg-background border border-border rounded-2xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "Recent Orders"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/orders",
							className: "text-sm text-primary hover:underline font-medium",
							children: "View All"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-muted-foreground border-b border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-medium",
										children: "Order ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-medium",
										children: "Customer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-medium",
										children: "Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-medium",
										children: "Total"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-medium",
										children: "Status"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border",
								children: recentOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 5,
									className: "py-8 text-center text-muted-foreground",
									children: "No recent orders"
								}) }) : recentOrders.map((order, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/50 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-4 font-medium",
											children: ["#OP-", order.id.toString().padStart(4, "0")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-4",
											children: order.customerName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-4 text-muted-foreground",
											children: new Date(order.createdAt).toLocaleDateString()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-4 font-medium",
											children: ["$", order.totalAmount.toFixed(2)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `px-2.5 py-1 rounded-full text-xs font-medium ${order.status === "PROCESSING" || order.status === "PENDING" ? "bg-amber-500/10 text-amber-500" : order.status === "SHIPPED" ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"}`,
												children: order.status
											})
										})
									]
								}, i))
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border border-border rounded-2xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-xl font-bold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, { className: "w-5 h-5 text-destructive" }), "Low Stock"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/products",
							className: "text-sm text-primary hover:underline font-medium",
							children: "Manage"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-4",
						children: lowStockItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground text-center py-4",
							children: "All products are well stocked!"
						}) : lowStockItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-3 rounded-xl border border-border bg-secondary/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-sm truncate",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: item.sku
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-destructive/10 text-destructive font-bold text-xs",
								children: item.stock
							})]
						}, i))
					})]
				})]
			})
		]
	});
}
function KpiCard({ title, value, change, trend, icon }) {
	const isUp = trend === "up";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background border border-border rounded-2xl p-6 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-medium text-muted-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center",
				children: icon
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-3xl font-bold",
				children: value
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center text-sm font-medium ${isUp ? "text-emerald-500" : "text-destructive"}`,
				children: [isUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4 mr-1" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "w-4 h-4 mr-1" }), change]
			})]
		})]
	});
}
//#endregion
export { AdminDashboard as component };
