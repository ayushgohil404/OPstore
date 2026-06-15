import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as useStripe, n as PaymentElement, r as useElements, t as Elements } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { I as CircleCheck, O as LoaderCircle, P as CreditCard, m as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { t as cartApi } from "./inventory-cart-BWS8qGVK.mjs";
import { t as stripeApi } from "./stripe-B0zodDBm.mjs";
import { t as loadStripe } from "../_libs/stripe__stripe-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-8yrvpeMn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var processCheckout = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("60fd700990d4abc59282c535d52c29cc6b51c202bc567731d0200823912a4482"));
var stripePromise = loadStripe("pk_test_YOUR_STRIPE_PUBLISHABLE_KEY");
function CheckoutWrapper() {
	const { data: cartItems = [], isLoading } = useQuery({
		queryKey: ["cart"],
		queryFn: () => cartApi.getCart()
	});
	const [clientSecret, setClientSecret] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
	const shipping = subtotal > 150 ? 0 : 15;
	const total = subtotal + shipping;
	(0, import_react.useEffect)(() => {
		if (total > 0 && !clientSecret) stripeApi.createPaymentIntent(total).then((res) => setClientSecret(res.clientSecret)).catch((err) => setError(err.message));
	}, [total, clientSecret]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-20 text-center flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" })
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-destructive mb-4",
			children: error
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/cart",
			className: "underline",
			children: "Return to Cart"
		})]
	});
	if (cartItems.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold tracking-tight mb-4",
			children: "Your Cart is Empty"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors",
			children: "Continue Shopping"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mx-auto px-4 py-10 max-w-6xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold tracking-tight mb-10 text-center",
			children: "Checkout"
		}), clientSecret ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Elements, {
			stripe: stripePromise,
			options: {
				clientSecret,
				appearance: { theme: "stripe" }
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutForm, {
				cartItems,
				subtotal,
				shipping,
				total
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" })
		})]
	});
}
function CheckoutForm({ cartItems, subtotal, shipping, total }) {
	const stripe = useStripe();
	const elements = useElements();
	const [step, setStep] = (0, import_react.useState)("shipping");
	const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const [orderId, setOrderId] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		firstName: "",
		lastName: "",
		email: "",
		address: "",
		city: "",
		zipCode: "",
		paymentMethod: "Credit Card"
	});
	const handlePlaceOrder = async () => {
		if (!stripe || !elements) return;
		setIsProcessing(true);
		setError(null);
		try {
			const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
				elements,
				confirmParams: { return_url: window.location.origin + "/checkout?success=true" },
				redirect: "if_required"
			});
			if (stripeError) throw new Error(stripeError.message);
			if (paymentIntent && paymentIntent.status === "succeeded") {
				const result = await processCheckout({ data: formData });
				if (result.success) {
					setOrderId(result.orderId);
					setIsSuccess(true);
				}
			} else throw new Error("Payment was not successful. Please try again.");
		} catch (e) {
			setError(e.message || "Failed to place order");
		} finally {
			setIsProcessing(false);
		}
	};
	if (isSuccess) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center text-center py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-10 h-10" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight mb-2",
				children: "Order Confirmed!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground mb-8",
				children: [
					"Thank you for your purchase. Your order number is ",
					orderId,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => window.location.href = "/",
				className: "bg-secondary text-foreground px-8 py-3 rounded-full font-medium hover:bg-secondary/80 transition-colors",
				children: "Return to Store"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col lg:flex-row gap-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full lg:w-[60%] flex flex-col gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center gap-2 ${step === "shipping" ? "text-primary font-bold" : "text-muted-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === "shipping" ? "bg-primary text-primary-foreground" : "bg-secondary"}`,
							children: "1"
						}), "Shipping"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 border-t border-border mx-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center gap-2 ${step === "payment" ? "text-primary font-bold" : "text-muted-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === "payment" ? "bg-primary text-primary-foreground" : "bg-secondary"}`,
							children: "2"
						}), "Payment"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 border-t border-border mx-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center gap-2 ${step === "review" ? "text-primary font-bold" : "text-muted-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === "review" ? "bg-primary text-primary-foreground" : "bg-secondary"}`,
							children: "3"
						}), "Review"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-secondary/50 rounded-3xl p-6 md:p-8",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl",
						children: error
					}),
					step === "shipping" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							setStep("payment");
						},
						className: "flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold",
								children: "Shipping Address"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: formData.firstName,
										onChange: (e) => setFormData({
											...formData,
											firstName: e.target.value
										}),
										type: "text",
										placeholder: "First Name",
										className: "col-span-1 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: formData.lastName,
										onChange: (e) => setFormData({
											...formData,
											lastName: e.target.value
										}),
										type: "text",
										placeholder: "Last Name",
										className: "col-span-1 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: formData.email,
										onChange: (e) => setFormData({
											...formData,
											email: e.target.value
										}),
										type: "email",
										placeholder: "Email Address",
										className: "col-span-1 md:col-span-2 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: formData.address,
										onChange: (e) => setFormData({
											...formData,
											address: e.target.value
										}),
										type: "text",
										placeholder: "Address",
										className: "col-span-1 md:col-span-2 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: formData.city,
										onChange: (e) => setFormData({
											...formData,
											city: e.target.value
										}),
										type: "text",
										placeholder: "City",
										className: "col-span-1 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: formData.zipCode,
										onChange: (e) => setFormData({
											...formData,
											zipCode: e.target.value
										}),
										type: "text",
										placeholder: "ZIP Code",
										className: "col-span-1 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "w-full bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors mt-4",
								children: "Continue to Payment"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: step === "payment" ? "block animate-in fade-in slide-in-from-bottom-4" : "hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold mb-6",
								children: "Payment Details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-background rounded-xl p-4 border border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentElement, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setStep("shipping"),
									className: "px-6 py-4 rounded-xl font-medium border border-border hover:bg-background transition-colors",
									children: "Back"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setStep("review"),
									className: "flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors",
									children: "Review Order"
								})]
							})
						]
					}),
					step === "review" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold",
								children: "Review Order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-background border border-border rounded-xl p-4 flex flex-col gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Shipping To:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-right",
										children: [
											formData.firstName,
											" ",
											formData.lastName,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											formData.address,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											formData.city,
											", ",
											formData.zipCode
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-background border border-border rounded-xl p-4 flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Payment:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "w-4 h-4" }), " Secure Stripe Payment"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStep("payment"),
									className: "px-6 py-4 rounded-xl font-medium border border-border hover:bg-background transition-colors",
									children: "Back"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: isProcessing || !stripe,
									onClick: handlePlaceOrder,
									className: "flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70",
									children: isProcessing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : `Place Order - $${total.toFixed(2)}`
								})]
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full lg:w-[40%]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-secondary/30 border border-border rounded-3xl p-6 sticky top-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold mb-4",
						children: "In Your Cart"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-4 mb-6",
						children: cartItems.map((item, idx) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-background",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: Array.isArray(item.product.images) ? item.product.images[0] : "",
											alt: item.product.name,
											className: "w-full h-full object-cover"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-sm",
											children: item.product.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground",
											children: ["Qty: ", item.quantity]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-sm",
										children: ["$", (item.product.price * item.quantity).toFixed(2)]
									})
								]
							}, idx);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 border-t border-border pt-4 text-sm mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["$", subtotal.toFixed(2)] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shipping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shipping === 0 ? "Free" : `$${shipping.toFixed(2)}` })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-lg",
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold text-xl text-primary",
							children: ["$", total.toFixed(2)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground bg-background rounded-full py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-emerald-500" }), "256-bit Secure SSL Checkout"]
					})
				]
			})
		})]
	});
}
//#endregion
export { CheckoutWrapper as component };
