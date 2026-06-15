import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { g as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useQueryClient, n as useSuspenseQuery, o as require_jsx_runtime, r as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { M as Heart, T as Minus, a as Truck, b as RefreshCw, h as ShieldCheck, n as User, u as Star, x as Plus, z as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as cartApi } from "./inventory-cart-BWS8qGVK.mjs";
import { t as wishlistApi } from "./wishlist-CybqrJAO.mjs";
import { i as reviewsApi, r as productsApi, t as authApi } from "./api-Cjn8KwVa.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./p._slug-CLWU7X0T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/p._slug-AN1isP_N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPDP() {
	const { slug } = Route.useParams();
	const { data: product } = useSuspenseQuery({
		queryKey: [
			"products",
			"detail",
			slug
		],
		queryFn: () => productsApi.getProduct(slug)
	});
	const { data: user } = useQuery({
		queryKey: ["auth-user"],
		queryFn: () => authApi.getCurrentUser()
	});
	const { data: wishlist = [] } = useQuery({
		queryKey: ["wishlist"],
		queryFn: () => wishlistApi.getWishlist()
	});
	const isWishlisted = product ? wishlist.some((w) => w.productId === product.id.toString()) : false;
	const { data: reviews = [] } = useQuery({
		queryKey: ["reviews", product?.id],
		queryFn: () => reviewsApi.getReviews(parseInt(product.id)),
		enabled: !!product
	});
	const [selectedSize, setSelectedSize] = (0, import_react.useState)(null);
	const [selectedColor, setSelectedColor] = (0, import_react.useState)(null);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [reviewRating, setReviewRating] = (0, import_react.useState)(5);
	const [reviewComment, setReviewComment] = (0, import_react.useState)("");
	if (!product) return null;
	const sizes = Array.from(new Set(product.variants.map((v) => v.size)));
	const colors = Array.from(new Set(product.variants.map((v) => v.color)));
	const colorMap = {
		"Black": "#000000",
		"Midnight Blue": "#1e3a8a",
		"Olive": "#4d7c0f"
	};
	const queryClient = useQueryClient();
	const router = useRouter();
	const addMutation = useMutation({
		mutationFn: () => cartApi.addItem({
			variantId: product.id.toString(),
			quantity
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			router.invalidate();
			toast.success(`${quantity}x ${product.name} added to cart!`);
		}
	});
	const handleAddToCart = () => {
		if (!selectedSize || !selectedColor) {
			toast.error("Please select size and color");
			return;
		}
		addMutation.mutate();
	};
	const wishlistMutation = useMutation({
		mutationFn: () => wishlistApi.toggleWishlist(parseInt(product.id)),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
			if (data.added) toast.success("Added to wishlist!");
			else toast.success("Removed from wishlist");
		},
		onError: () => {
			toast.error("You must be logged in to use the wishlist.");
		}
	});
	const reviewMutation = useMutation({
		mutationFn: () => reviewsApi.createReview({
			productId: parseInt(product.id),
			rating: reviewRating,
			comment: reviewComment
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reviews", product.id] });
			setReviewComment("");
			setReviewRating(5);
			toast.success("Review submitted successfully!");
		},
		onError: (err) => {
			toast.error(err.message || "Failed to submit review");
		}
	});
	const handleReviewSubmit = (e) => {
		e.preventDefault();
		if (!reviewComment.trim()) {
			toast.error("Please write a comment for your review.");
			return;
		}
		reviewMutation.mutate();
	};
	const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mx-auto px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "text-sm text-muted-foreground mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary transition-colors",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/c/$category",
						params: { category: product.categoryId },
						className: "hover:text-primary transition-colors capitalize",
						children: product.categoryId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: product.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col lg:flex-row gap-12 mb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full lg:w-[55%] flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: product.images[0],
							alt: product.name,
							className: "w-full h-full object-cover"
						})
					}), product.images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-4 overflow-x-auto pb-2",
						children: product.images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary focus:border-primary transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: img,
								alt: "",
								className: "w-full h-full object-cover"
							})
						}, i))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full lg:w-[45%] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl lg:text-4xl font-bold tracking-tight mb-2",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center text-amber-500",
								children: [
									1,
									2,
									3,
									4,
									5
								].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `w-4 h-4 ${star <= Math.round(averageRating) ? "fill-current" : "fill-muted text-muted"}` }, star))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted-foreground underline decoration-dotted underline-offset-4 cursor-pointer",
								onClick: () => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" }),
								children: [
									reviews.length,
									" ",
									reviews.length === 1 ? "Review" : "Reviews"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-3xl font-bold text-primary",
								children: ["$", product.price.toFixed(2)]
							}), product.originalPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xl text-muted-foreground line-through",
								children: ["$", product.originalPrice.toFixed(2)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "Size"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-sm text-muted-foreground underline",
									children: "Size Guide"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-3",
								children: sizes.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedSize(size),
									className: `min-w-[3rem] h-12 rounded-xl border flex items-center justify-center text-sm transition-all ${selectedSize === size ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`,
									children: size
								}, size))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium block mb-3",
								children: ["Color ", selectedColor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground font-normal ml-1",
									children: ["- ", selectedColor]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-3",
								children: colors.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedColor(color),
									className: `w-10 h-10 rounded-full border-2 ring-offset-2 ring-offset-background transition-all ${selectedColor === color ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary"}`,
									style: { backgroundColor: colorMap[color] || "#333" },
									title: color
								}, color))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-6 mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: "In Stock"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center border border-border rounded-xl h-12",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQuantity(Math.max(1, quantity - 1)),
										className: "w-12 h-full flex items-center justify-center hover:bg-secondary transition-colors rounded-l-xl",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-full flex items-center justify-center font-medium border-x border-border",
										children: quantity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQuantity(quantity + 1),
										className: "w-12 h-full flex items-center justify-center hover:bg-secondary transition-colors rounded-r-xl",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleAddToCart,
								className: "w-full bg-primary text-primary-foreground h-14 rounded-xl font-medium text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20",
								children: "ADD TO CART"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => wishlistMutation.mutate(),
								disabled: wishlistMutation.isPending,
								className: `w-full border border-border h-14 rounded-xl font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2 ${isWishlisted ? "text-rose-500 hover:text-rose-600" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `w-5 h-5 ${isWishlisted ? "fill-current" : ""}` }), isWishlisted ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-4 border-y border-border py-6 mb-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center text-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: [
											"Free Shipping",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Over $150"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center text-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: [
											"30-Day",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Returns"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center text-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: [
											"Secure",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Checkout"
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col divide-y divide-border border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "group",
								open: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex justify-between items-center font-medium cursor-pointer list-none py-4",
									children: ["Description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "transition group-open:rotate-180",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-5 h-5" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground text-sm pb-4 animate-accordion-down",
									children: product.description
								})]
							}), product.materials && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex justify-between items-center font-medium cursor-pointer list-none py-4",
									children: ["Materials & Care", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "transition group-open:rotate-180",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-5 h-5" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground text-sm pb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "list-disc pl-5 space-y-1",
										children: [
											product.materials.map((mat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: mat }, i)),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Machine wash cold with like colors" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Do not bleach" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Tumble dry low" })
										]
									})
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "reviews",
				className: "max-w-4xl mx-auto pt-16 border-t border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold mb-8",
					children: "Customer Reviews"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row gap-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 space-y-8",
						children: reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-12 bg-secondary/10 rounded-2xl border border-border border-dashed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-medium mb-1",
									children: "No reviews yet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-sm",
									children: "Be the first to review this product!"
								})
							]
						}) : reviews.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border pb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden",
										children: review.user.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: review.user.avatarUrl,
											alt: review.user.name,
											className: "w-full h-full object-cover"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5 text-muted-foreground" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: review.user.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: new Date(review.createdAt).toLocaleDateString()
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex text-amber-500",
									children: [
										1,
										2,
										3,
										4,
										5
									].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `w-4 h-4 ${star <= review.rating ? "fill-current" : "fill-muted text-muted"}` }, star))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-sm leading-relaxed",
								children: review.comment
							})]
						}, review.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full md:w-80 flex-shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-secondary/20 rounded-2xl p-6 border border-border sticky top-24",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-lg mb-4",
								children: "Write a Review"
							}), !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-sm mb-4",
									children: "You must be logged in to leave a review."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium inline-block w-full",
									children: "Log In"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleReviewSubmit,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-sm font-medium mb-2",
										children: "Rating"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-1 text-amber-500",
										children: [
											1,
											2,
											3,
											4,
											5
										].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setReviewRating(star),
											className: "hover:scale-110 transition-transform focus:outline-none",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `w-6 h-6 ${star <= reviewRating ? "fill-current" : "text-muted-foreground"}` })
										}, star))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-sm font-medium mb-2",
										children: "Comment"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: reviewComment,
										onChange: (e) => setReviewComment(e.target.value),
										rows: 4,
										placeholder: "What did you think about this product?",
										className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: reviewMutation.isPending,
										className: "w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50",
										children: reviewMutation.isPending ? "Submitting..." : "Submit Review"
									})
								]
							})]
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { ProductPDP as component };
