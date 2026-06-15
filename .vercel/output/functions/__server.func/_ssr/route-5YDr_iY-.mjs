import { f as Outlet, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { C as Package, V as Bell, g as Settings, j as LayoutDashboard, k as LogOut, p as ShoppingCart, r as Users, v as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-5YDr_iY-.js
var import_jsx_runtime = require_jsx_runtime();
function AdminLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen bg-background overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "w-64 border-r border-border bg-secondary/30 flex flex-col hidden md:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-16 flex items-center px-6 border-b border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-bold text-xl tracking-tight text-primary",
						children: "OPStore Admin"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex-1 overflow-y-auto py-6 px-4 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
							to: "/admin",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "w-5 h-5" }),
							label: "Dashboard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
							to: "/admin/products",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-5 h-5" }),
							label: "Products"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
							to: "/admin/orders",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-5 h-5" }),
							label: "Orders"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
							to: "/admin/customers",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-5 h-5" }),
							label: "Customers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-6 mt-6 border-t border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2",
								children: "Settings"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								to: "/admin/settings",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-5 h-5" }),
								label: "Store Settings"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center gap-3 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-5 h-5" }), "Logout"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 flex flex-col h-full overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "h-16 border-b border-border bg-background flex items-center justify-between px-6 flex-shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center w-full max-w-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search orders, products...",
							className: "w-full bg-secondary rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "relative p-2 text-muted-foreground hover:bg-secondary rounded-full transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm",
						children: "AD"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-6 bg-secondary/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
function SidebarItem({ to, icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		activeProps: { className: "bg-primary/10 text-primary font-medium" },
		inactiveProps: { className: "text-muted-foreground hover:bg-secondary hover:text-foreground" },
		className: "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm",
		children: [icon, label]
	});
}
//#endregion
export { AdminLayout as component };
