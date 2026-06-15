import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { a as useQueryClient, o as require_jsx_runtime, r as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { M as Ellipsis, _ as Search, x as Package } from "../_libs/lucide-react.mjs";
import { t as ordersApi } from "./orders-Dvl6-FEu.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-BDVf0g7Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminOrders() {
	const queryClient = useQueryClient();
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const { data: orders = [], isLoading } = useQuery({
		queryKey: ["admin-orders"],
		queryFn: () => ordersApi.listAllOrders()
	});
	const updateStatusMutation = useMutation({
		mutationFn: ({ orderId, status }) => ordersApi.updateOrderStatus(orderId, status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
			queryClient.invalidateQueries({ queryKey: ["admin-kpis"] });
			toast.success("Order status updated");
		}
	});
	const filteredOrders = orders.filter((o) => statusFilter === "ALL" || o.status === statusFilter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8 max-w-7xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight mb-1",
				children: "Orders"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Manage and track customer orders."
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-background border border-border rounded-2xl shadow-sm flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 border-b border-border flex flex-col sm:flex-row items-center gap-4 justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search by order ID or customer...",
						className: "w-full bg-secondary/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-3 w-full sm:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: statusFilter,
						onChange: (e) => setStatusFilter(e.target.value),
						className: "bg-background border border-border rounded-lg px-3 py-2 text-sm w-full sm:w-auto outline-none focus:ring-2 focus:ring-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "PROCESSING",
								children: "Processing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "SHIPPED",
								children: "Shipped"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "DELIVERED",
								children: "Delivered"
							})
						]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto min-h-[400px]",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-8 flex justify-center text-muted-foreground",
					children: "Loading orders..."
				}) : filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-16 flex flex-col items-center justify-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-12 h-12 text-muted-foreground opacity-50 mb-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-medium",
							children: "No orders found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: "There are no orders matching your current filters."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-muted-foreground bg-secondary/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Order ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Customer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium text-right",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: filteredOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-secondary/20 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-6 py-4 font-medium",
									children: ["#OP-", order.id.toString().padStart(4, "0")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-6 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium text-foreground",
										children: order.customerName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [order.items.length, " items"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-muted-foreground",
									children: new Date(order.createdAt).toLocaleDateString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-6 py-4 font-medium",
									children: ["$", order.totalAmount.toFixed(2)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: order.status,
										onChange: (e) => updateStatusMutation.mutate({
											orderId: order.id,
											status: e.target.value
										}),
										disabled: updateStatusMutation.isPending && updateStatusMutation.variables?.orderId === order.id,
										className: `px-2.5 py-1.5 rounded-full text-xs font-medium outline-none cursor-pointer border ${order.status === "PROCESSING" || order.status === "PENDING" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : order.status === "SHIPPED" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "PENDING",
												children: "Pending"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "PROCESSING",
												children: "Processing"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SHIPPED",
												children: "Shipped"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "DELIVERED",
												children: "Delivered"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "w-5 h-5" })
									})
								})
							]
						}, order.id))
					})]
				})
			})]
		})]
	});
}
//#endregion
export { AdminOrders as component };
