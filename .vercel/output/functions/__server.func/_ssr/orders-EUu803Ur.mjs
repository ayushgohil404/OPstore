import { o as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { C as Package, L as Clock, R as CircleCheck, a as Truck } from "../_libs/lucide-react.mjs";
import { t as ordersApi } from "./orders-Dvl6-FEu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-EUu803Ur.js
var import_jsx_runtime = require_jsx_runtime();
function AccountOrders() {
	const { data: orders = [], isLoading } = useQuery({
		queryKey: ["user-orders"],
		queryFn: () => ordersApi.listUserOrders()
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 md:p-10 animate-pulse text-muted-foreground",
		children: "Loading orders..."
	});
	if (orders.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[400px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-16 h-16 text-muted-foreground mb-4 opacity-50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold mb-2",
				children: "No Orders Yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground max-w-sm",
				children: "You haven't placed any orders yet. Once you do, they will appear here."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 md:p-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 pb-6 border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Order History"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-1",
				children: "View and track your recent orders."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-8",
			children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-border rounded-2xl overflow-hidden bg-secondary/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-secondary/30 p-4 sm:p-6 border-b border-border flex flex-wrap gap-6 items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-muted-foreground",
								children: "Order Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold",
								children: ["#OP-", order.id.toString().padStart(4, "0")]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-muted-foreground",
								children: "Date Placed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: new Date(order.createdAt).toLocaleDateString()
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-muted-foreground",
								children: "Total Amount"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold",
								children: ["$", order.totalAmount.toFixed(2)]
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-sm font-medium border border-border bg-background px-4 py-2 rounded-lg hover:bg-secondary transition-colors",
						children: "View Invoice"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 sm:p-6 flex flex-col lg:flex-row gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 space-y-6",
						children: order.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-20 h-24 rounded-lg bg-secondary overflow-hidden flex-shrink-0 border border-border flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-8 h-8 text-muted-foreground opacity-50" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-foreground",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground mt-1",
									children: [
										"Qty: ",
										item.quantity,
										" | Price: $",
										item.price
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-primary text-sm font-medium hover:underline mt-2",
									children: "Write a Review"
								})
							] })]
						}, idx))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full lg:w-72 flex-shrink-0 bg-background border border-border rounded-xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "font-semibold mb-4 flex items-center gap-2 capitalize",
								children: [order.status === "COMPLETED" || order.status === "DELIVERED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4 text-amber-500" }), order.status.toLowerCase()]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mb-6",
								children: order.status === "PROCESSING" ? `Being prepared for shipping` : `Status updated recently`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative pl-6 space-y-6 before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute -left-6 w-6 h-6 bg-background rounded-full flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2.5 h-2.5 rounded-full bg-primary" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: "Order Placed"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute -left-6 w-6 h-6 bg-background rounded-full flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-2.5 h-2.5 rounded-full ${order.status === "SHIPPED" || order.status === "DELIVERED" ? "bg-primary" : "bg-border"}` })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-sm font-medium ${order.status === "PROCESSING" || order.status === "PENDING" ? "text-muted-foreground" : ""}`,
											children: "Shipped"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute -left-6 w-6 h-6 bg-background rounded-full flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-2.5 h-2.5 rounded-full ${order.status === "DELIVERED" ? "bg-primary" : "bg-border"}` })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-sm font-medium ${order.status !== "DELIVERED" ? "text-muted-foreground" : ""}`,
											children: "Delivered"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "w-full mt-6 flex items-center justify-center gap-2 text-sm font-medium border border-border px-4 py-2 rounded-lg hover:bg-secondary transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "w-4 h-4" }), " Track Package"]
							})
						]
					})]
				})]
			}, order.id))
		})]
	});
}
//#endregion
export { AccountOrders as component };
