import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { C as Package, M as Heart, g as Settings, k as LogOut, n as User } from "../_libs/lucide-react.mjs";
import { t as authApi } from "./api-DYwpfXbe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-DkBgYcCM.js
var import_jsx_runtime = require_jsx_runtime();
function AccountLayout() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { data: user } = useQuery({
		queryKey: ["auth-user"],
		queryFn: () => authApi.getCurrentUser()
	});
	const initials = user?.firstName ? user.firstName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : "??";
	const handleLogout = async () => {
		await authApi.logout();
		window.location.href = "/";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container mx-auto px-4 py-10 min-h-[70vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col lg:flex-row gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "w-full lg:w-72 flex-shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-secondary/20 rounded-3xl p-6 border border-border sticky top-24 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 mb-8 pb-6 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg",
								children: initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-lg truncate",
									children: user?.firstName || "User"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground truncate",
									children: user?.email || ""
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLink, {
									to: "/account",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5" }),
									label: "Profile Overview",
									isActive: pathname === "/account"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLink, {
									to: "/account/orders",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-5 h-5" }),
									label: "Order History",
									isActive: pathname.includes("/account/orders")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLink, {
									to: "/account/wishlist",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-5 h-5" }),
									label: "Wishlist",
									isActive: pathname.includes("/account/wishlist")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLink, {
									to: "/account/settings",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-5 h-5" }),
									label: "Account Settings",
									isActive: pathname.includes("/account/settings")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 pt-6 border-t border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleLogout,
								className: "flex items-center gap-3 w-full px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-5 h-5" }), "Sign Out"]
							})
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-background border border-border rounded-3xl shadow-sm min-h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})
			})]
		})
	});
}
function SidebarLink({ to, icon, label, isActive }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
		children: [icon, label]
	});
}
//#endregion
export { AccountLayout as component };
