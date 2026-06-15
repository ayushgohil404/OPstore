import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useQueryClient, o as require_jsx_runtime, r as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { M as Heart, l as Trash2, p as ShoppingCart } from "../_libs/lucide-react.mjs";
import { t as cartApi } from "./inventory-cart-BWS8qGVK.mjs";
import { t as wishlistApi } from "./wishlist-U78bOMao.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-CY7kTkOB.js
var import_jsx_runtime = require_jsx_runtime();
function AccountWishlist() {
	const queryClient = useQueryClient();
	const { data: wishlistItems = [], isLoading } = useQuery({
		queryKey: ["wishlist"],
		queryFn: () => wishlistApi.getWishlist()
	});
	const removeMutation = useMutation({
		mutationFn: (productId) => wishlistApi.toggleWishlist(productId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
			toast.success("Removed from wishlist.");
		}
	});
	const cartMutation = useMutation({
		mutationFn: (productId) => cartApi.addItem({
			variantId: productId,
			quantity: 1
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			toast.success("Added to cart!");
		}
	});
	const handleMoveToCart = (item) => {
		cartMutation.mutate(item.productId);
		removeMutation.mutate(parseInt(item.productId));
	};
	const handleRemove = (item) => {
		removeMutation.mutate(parseInt(item.productId));
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 md:p-10 text-muted-foreground animate-pulse",
		children: "Loading wishlist..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 md:p-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-8 pb-6 border-b border-border flex items-center justify-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-2xl font-bold tracking-tight flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-6 h-6 text-primary fill-primary" }), " Your Wishlist"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground mt-1",
				children: [wishlistItems.length, " items saved"]
			})] })
		}), wishlistItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center py-20 bg-secondary/10 rounded-3xl border border-border border-dashed",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl font-medium mb-2",
					children: "Your wishlist is empty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mb-6",
					children: "Save items you love to build your perfect collection."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm inline-block",
					children: "Explore Collections"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6",
			children: wishlistItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group flex flex-col gap-3 bg-secondary/10 border border-border p-4 rounded-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/p/$slug",
						params: { slug: item.product.slug },
						className: "relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.product.images[0],
							alt: item.product.name,
							className: "object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1 mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/p/$slug",
							params: { slug: item.product.slug },
							className: "font-semibold text-foreground hover:text-primary transition-colors truncate",
							children: item.product.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-primary font-bold",
							children: ["$", item.product.price.toFixed(2)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleMoveToCart(item),
							disabled: cartMutation.isPending || removeMutation.isPending,
							className: "flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-4 h-4" }), " Move to Cart"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleRemove(item),
							disabled: removeMutation.isPending,
							className: "p-2.5 border border-border bg-background rounded-lg text-muted-foreground hover:text-destructive hover:border-destructive hover:bg-destructive/10 transition-colors",
							title: "Remove from wishlist",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
						})]
					})
				]
			}, item.id))
		})]
	});
}
//#endregion
export { AccountWishlist as component };
