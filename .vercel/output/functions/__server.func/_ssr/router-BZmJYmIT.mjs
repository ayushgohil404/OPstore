import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { M as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as QueryClientProvider, o as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as Route$27 } from "../_slug-BIJoiD1a.mjs";
import { _ as Search, f as ShoppingCart, n as User, t as X, w as Menu } from "../_libs/lucide-react.mjs";
import { t as cartApi } from "./inventory-cart-BWS8qGVK.mjs";
import { n as getCurrentUser, r as productsApi } from "./api-zWRieyl8.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$28 } from "./c._category-DW36RyF2.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$29 } from "./p._slug-CN6H_mG1.mjs";
import { t as Route$30 } from "./search-B8OaEaaV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BZmJYmIT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-no9w0agk.css";
function MegaMenu() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "hidden md:flex items-center space-x-8 text-sm font-medium",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/c/$category",
				params: { category: "men" },
				className: "hover:text-primary transition-colors",
				children: "Men"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/c/$category",
				params: { category: "women" },
				className: "hover:text-primary transition-colors",
				children: "Women"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/c/$category",
				params: { category: "kids" },
				className: "hover:text-primary transition-colors",
				children: "Kids"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/c/$category",
				params: { category: "accessories" },
				className: "hover:text-primary transition-colors",
				children: "Accessories"
			})
		]
	});
}
function SearchBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full max-w-sm hidden lg:block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-y-0 left-3 flex items-center pointer-events-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-muted-foreground" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			placeholder: "Search apparel...",
			className: "w-full bg-secondary text-secondary-foreground rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-muted-foreground"
		})]
	});
}
function MiniCart() {
	const { data: cartItems = [] } = useQuery({
		queryKey: ["cart"],
		queryFn: () => cartApi.getCart()
	});
	const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/cart",
		className: "relative p-2 hover:bg-secondary rounded-full transition-colors flex items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-5 h-5" }), totalQuantity > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-bold shadow-sm",
			children: totalQuantity
		})]
	});
}
function StoreHeader() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4 h-16 flex items-center justify-between gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "md:hidden p-2 -ml-2 hover:bg-secondary rounded-full",
					onClick: () => setIsMobileMenuOpen(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-5 h-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex items-center gap-2 font-bold text-xl tracking-tight flex-1 md:flex-none",
					children: "OPStore"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:flex flex-1 justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MegaMenu, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end gap-2 md:gap-4 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							className: "md:hidden p-2 hover:bg-secondary rounded-full transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "p-2 hover:bg-secondary rounded-full transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCart, {})
					]
				})
			]
		}), isMobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-[100] bg-background md:hidden flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-4 border-b border-border h-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold text-xl tracking-tight",
					children: "Menu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "p-2 -mr-2 hover:bg-secondary rounded-full",
					onClick: () => setIsMobileMenuOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col p-4 gap-4 text-lg font-medium",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/c/$category",
						params: { category: "men" },
						onClick: () => setIsMobileMenuOpen(false),
						className: "py-2 border-b border-border/50",
						children: "Men"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/c/$category",
						params: { category: "women" },
						onClick: () => setIsMobileMenuOpen(false),
						className: "py-2 border-b border-border/50",
						children: "Women"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/c/$category",
						params: { category: "kids" },
						onClick: () => setIsMobileMenuOpen(false),
						className: "py-2 border-b border-border/50",
						children: "Kids"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/c/$category",
						params: { category: "accessories" },
						onClick: () => setIsMobileMenuOpen(false),
						className: "py-2 border-b border-border/50",
						children: "Accessories"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/journal",
						onClick: () => setIsMobileMenuOpen(false),
						className: "py-2 border-b border-border/50",
						children: "Journal"
					})
				]
			})]
		})]
	});
}
function StoreFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "w-full border-t border-border bg-background text-foreground mt-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-4 gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-lg mb-4",
						children: "OPStore"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm max-w-xs",
						children: "Premium apparel for everyone. Redefining fashion with modern aesthetics and uncompromising quality."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-semibold mb-4",
						children: "Shop"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/c/$category",
								params: { category: "men" },
								className: "hover:text-primary transition-colors",
								children: "Men's Fashion"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/c/$category",
								params: { category: "women" },
								className: "hover:text-primary transition-colors",
								children: "Women's Fashion"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/c/$category",
								params: { category: "kids" },
								className: "hover:text-primary transition-colors",
								children: "Kids & Baby"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/c/$category",
								params: { category: "accessories" },
								className: "hover:text-primary transition-colors",
								children: "Accessories"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-semibold mb-4",
						children: "Support"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pages/contact",
								className: "hover:text-primary transition-colors",
								children: "Contact Us"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/journal",
								className: "hover:text-primary transition-colors",
								children: "Journal & Blog"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pages/shipping",
								className: "hover:text-primary transition-colors",
								children: "Shipping Information"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pages/refunds",
								className: "hover:text-primary transition-colors",
								children: "Returns & Exchanges"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pages/faq",
								className: "hover:text-primary transition-colors",
								children: "FAQ"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-semibold mb-4",
						children: "Company"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pages/about",
								className: "hover:text-primary transition-colors",
								children: "About Us"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pages/careers",
								className: "hover:text-primary transition-colors",
								children: "Careers"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pages/privacy",
								className: "hover:text-primary transition-colors",
								children: "Privacy Policy"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pages/terms",
								className: "hover:text-primary transition-colors",
								children: "Terms of Service"
							}) })
						]
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" OPStore. All rights reserved."
				] })
			})]
		})
	});
}
var Route$26 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "OPStore | Premium Apparel" }
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	shellComponent: RootDocument,
	component: RootComponent
});
function RootComponent() {
	if (useRouterState({ select: (s) => s.location.pathname }).startsWith("/admin")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme: "dark",
		position: "top-center"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "top-center"
			})
		]
	});
}
function RootDocument({ children }) {
	const queryClient = useRouter().options.context.queryClient;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
			client: queryClient,
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var $$splitComponentImporter$25 = () => import("./register-DaANqlDm.mjs");
var Route$25 = createFileRoute("/register")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./login-DKAlVyHp.mjs");
var Route$24 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("./forgot-password-Bi5SN296.mjs");
var Route$23 = createFileRoute("/forgot-password")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
var $$splitComponentImporter$22 = () => import("./checkout-8yrvpeMn.mjs");
var Route$22 = createFileRoute("/checkout")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./cart-BEuJ7TtN.mjs");
var Route$21 = createFileRoute("/cart")({
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData({
			queryKey: ["cart"],
			queryFn: () => cartApi.getCart()
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./account-CApHcWlt.mjs");
var Route$20 = createFileRoute("/account")({
	beforeLoad: async () => {
		if (!await getCurrentUser()) throw redirect({ to: "/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./route-5YDr_iY-.mjs");
var Route$19 = createFileRoute("/admin")({
	beforeLoad: async () => {
		const user = await getCurrentUser();
		if (!user || user.role !== "ADMIN") throw redirect({ to: "/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./routes-Ca-xy-x6.mjs");
var Route$18 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "OPStore | Premium Apparel For All" }, {
		name: "description",
		content: "Redefined fashion for Men, Women, and Kids. Experience the perfect blend of comfort and modern aesthetics."
	}] }),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData({
			queryKey: ["products", "featured"],
			queryFn: () => productsApi.getFeatured()
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./journal-4Q_eVl1r.mjs");
var Route$17 = createFileRoute("/journal/")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./admin-B7JHjhGi.mjs");
var Route$16 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./account-DBZHXH5d.mjs");
var Route$15 = createFileRoute("/account/")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./terms-Da3om9VB.mjs");
var Route$14 = createFileRoute("/pages/terms")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./shipping-l0lIxkV6.mjs");
var Route$13 = createFileRoute("/pages/shipping")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./refunds-BAWqjdgK.mjs");
var Route$12 = createFileRoute("/pages/refunds")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./privacy-D5uVlEts.mjs");
var Route$11 = createFileRoute("/pages/privacy")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./faq-Dyyv1JOh.mjs");
var Route$10 = createFileRoute("/pages/faq")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./contact-Cy94YDPJ.mjs");
var Route$9 = createFileRoute("/pages/contact")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./careers-DLspEn-e.mjs");
var Route$8 = createFileRoute("/pages/careers")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./about-Bp2Smqbq.mjs");
var Route$7 = createFileRoute("/pages/about")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./wishlist-CY7kTkOB.mjs");
var Route$6 = createFileRoute("/account/wishlist")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./settings-CyylNExd.mjs");
var Route$5 = createFileRoute("/account/settings")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./orders-EUu803Ur.mjs");
var Route$4 = createFileRoute("/account/orders")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./products-D-AZ8Toe.mjs");
var Route$3 = createFileRoute("/admin/products/")({
	loader: ({ context }) => {
		context.queryClient.ensureQueryData({
			queryKey: ["admin", "products"],
			queryFn: () => productsApi.listProducts()
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./orders-BDVf0g7Y.mjs");
var Route$2 = createFileRoute("/admin/orders/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./callback-YYIf38Iz.mjs");
var Route$1 = createFileRoute("/auth/google/callback")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./new-DvbTLeRH.mjs");
var Route = createFileRoute("/admin/products/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var SearchRoute = Route$30.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$26
});
var RegisterRoute = Route$25.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$26
});
var LoginRoute = Route$24.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$26
});
var ForgotPasswordRoute = Route$23.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$26
});
var CheckoutRoute = Route$22.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$26
});
var CartRoute = Route$21.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$26
});
var AccountRoute = Route$20.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$26
});
var AdminRouteRoute = Route$19.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$26
});
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$26
});
var JournalIndexRoute = Route$17.update({
	id: "/journal/",
	path: "/journal/",
	getParentRoute: () => Route$26
});
var AdminIndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRouteRoute
});
var AccountIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => AccountRoute
});
var PagesTermsRoute = Route$14.update({
	id: "/pages/terms",
	path: "/pages/terms",
	getParentRoute: () => Route$26
});
var PagesShippingRoute = Route$13.update({
	id: "/pages/shipping",
	path: "/pages/shipping",
	getParentRoute: () => Route$26
});
var PagesRefundsRoute = Route$12.update({
	id: "/pages/refunds",
	path: "/pages/refunds",
	getParentRoute: () => Route$26
});
var PagesPrivacyRoute = Route$11.update({
	id: "/pages/privacy",
	path: "/pages/privacy",
	getParentRoute: () => Route$26
});
var PagesFaqRoute = Route$10.update({
	id: "/pages/faq",
	path: "/pages/faq",
	getParentRoute: () => Route$26
});
var PagesContactRoute = Route$9.update({
	id: "/pages/contact",
	path: "/pages/contact",
	getParentRoute: () => Route$26
});
var PagesCareersRoute = Route$8.update({
	id: "/pages/careers",
	path: "/pages/careers",
	getParentRoute: () => Route$26
});
var PagesAboutRoute = Route$7.update({
	id: "/pages/about",
	path: "/pages/about",
	getParentRoute: () => Route$26
});
var PSlugRoute = Route$29.update({
	id: "/p/$slug",
	path: "/p/$slug",
	getParentRoute: () => Route$26
});
var JournalSlugRoute = Route$27.update({
	id: "/journal/$slug",
	path: "/journal/$slug",
	getParentRoute: () => Route$26
});
var CCategoryRoute = Route$28.update({
	id: "/c/$category",
	path: "/c/$category",
	getParentRoute: () => Route$26
});
var AccountWishlistRoute = Route$6.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => AccountRoute
});
var AccountSettingsRoute = Route$5.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AccountRoute
});
var AccountOrdersRoute = Route$4.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AccountRoute
});
var AdminProductsIndexRoute = Route$3.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => AdminRouteRoute
});
var AdminOrdersIndexRoute = Route$2.update({
	id: "/orders/",
	path: "/orders/",
	getParentRoute: () => AdminRouteRoute
});
var AuthGoogleCallbackRoute = Route$1.update({
	id: "/auth/google/callback",
	path: "/auth/google/callback",
	getParentRoute: () => Route$26
});
var AdminRouteRouteChildren = {
	AdminIndexRoute,
	AdminProductsNewRoute: Route.update({
		id: "/products/new",
		path: "/products/new",
		getParentRoute: () => AdminRouteRoute
	}),
	AdminOrdersIndexRoute,
	AdminProductsIndexRoute
};
var AdminRouteRouteWithChildren = AdminRouteRoute._addFileChildren(AdminRouteRouteChildren);
var AccountRouteChildren = {
	AccountOrdersRoute,
	AccountSettingsRoute,
	AccountWishlistRoute,
	AccountIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRouteRoute: AdminRouteRouteWithChildren,
	AccountRoute: AccountRoute._addFileChildren(AccountRouteChildren),
	CartRoute,
	CheckoutRoute,
	ForgotPasswordRoute,
	LoginRoute,
	RegisterRoute,
	SearchRoute,
	CCategoryRoute,
	JournalSlugRoute,
	PSlugRoute,
	PagesAboutRoute,
	PagesCareersRoute,
	PagesContactRoute,
	PagesFaqRoute,
	PagesPrivacyRoute,
	PagesRefundsRoute,
	PagesShippingRoute,
	PagesTermsRoute,
	JournalIndexRoute,
	AuthGoogleCallbackRoute
};
var routeTree = Route$26._addFileChildren(rootRouteChildren)._addFileTypes();
var queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 1e3 * 60 * 5 } } });
function getRouter() {
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
}
//#endregion
export { getRouter, queryClient };
