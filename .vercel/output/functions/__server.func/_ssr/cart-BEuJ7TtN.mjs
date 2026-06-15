import { g as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useQueryClient, n as useSuspenseQuery, o as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { A as LoaderCircle, H as ArrowRight, h as ShieldCheck, l as Trash2 } from "../_libs/lucide-react.mjs";
import { t as cartApi } from "./inventory-cart-BWS8qGVK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-BEuJ7TtN.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { data: cartItems } = useSuspenseQuery({
		queryKey: ["cart"],
		queryFn: () => cartApi.getCart()
	});
	const updateMutation = useMutation({
		mutationFn: ({ variantId, quantity }) => cartApi.updateQuantity(variantId, quantity),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			router.invalidate();
		}
	});
	const removeMutation = useMutation({
		mutationFn: (variantId) => cartApi.removeItem(variantId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			router.invalidate();
		}
	});
	const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
	const shipping = subtotal > 150 ? 0 : 15;
	const total = subtotal + shipping;
	if (cartItems.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight mb-4",
				children: "Your Cart is Empty"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-8",
				children: "Looks like you haven't added anything yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors",
				children: "Continue Shopping"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mx-auto px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold tracking-tight mb-10",
			children: "Shopping Cart"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col lg:flex-row gap-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full lg:w-2/3 flex flex-col gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground pb-4 border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-6",
							children: "Product"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-3 text-center",
							children: "Quantity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-3 text-right",
							children: "Total"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-6",
					children: cartItems.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b border-border/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-1 md:col-span-6 flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-24 h-32 rounded-xl overflow-hidden bg-secondary flex-shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.product.images[0] || "",
										alt: item.product.name,
										className: "w-full h-full object-cover"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col justify-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/p/$slug",
											params: { slug: item.product.slug || item.product.id.toString() },
											className: "font-semibold hover:text-primary transition-colors",
											children: item.product.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-sm text-muted-foreground",
											children: ["Category: ", item.product.categoryId]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-primary font-medium mt-1",
											children: ["$", item.product.price.toFixed(2)]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-1 md:col-span-3 flex md:justify-center items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "md:hidden text-sm text-muted-foreground",
									children: "Qty:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center border border-border rounded-lg h-10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateMutation.mutate({
												variantId: item.variantId,
												quantity: Math.max(1, item.quantity - 1)
											}),
											disabled: updateMutation.isPending,
											className: "w-10 h-full flex items-center justify-center hover:bg-secondary rounded-l-lg transition-colors",
											children: "-"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-full flex items-center justify-center text-sm font-medium border-x border-border",
											children: updateMutation.isPending && updateMutation.variables?.variantId === item.variantId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : item.quantity
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateMutation.mutate({
												variantId: item.variantId,
												quantity: item.quantity + 1
											}),
											disabled: updateMutation.isPending,
											className: "w-10 h-full flex items-center justify-center hover:bg-secondary rounded-r-lg transition-colors",
											children: "+"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-1 md:col-span-3 flex justify-between md:justify-end items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold",
									children: ["$", (item.product.price * item.quantity).toFixed(2)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => removeMutation.mutate(item.variantId),
									disabled: removeMutation.isPending,
									className: "p-2 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50",
									children: removeMutation.isPending && removeMutation.variables === item.variantId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-5 h-5" })
								})]
							})
						]
					}, idx))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full lg:w-1/3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-secondary rounded-3xl p-8 sticky top-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold mb-6",
							children: "Order Summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 text-sm mb-6 border-b border-border/50 pb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: ["$", subtotal.toFixed(2)]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Shipping"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-lg",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-2xl text-primary",
								children: ["$", total.toFixed(2)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/checkout",
							className: "w-full bg-primary text-primary-foreground h-14 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20",
							children: ["PROCEED TO CHECKOUT ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-primary" }), "Secure Checkout"]
						})
					]
				})
			})]
		})]
	});
}
//#endregion
export { CartPage as component };
