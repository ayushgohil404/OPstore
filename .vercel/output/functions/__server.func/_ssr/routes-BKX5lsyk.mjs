import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { H as ArrowRight } from "../_libs/lucide-react.mjs";
import { r as productsApi } from "./api-DYwpfXbe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BKX5lsyk.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { data: featuredProducts } = useSuspenseQuery({
		queryKey: ["products", "featured"],
		queryFn: () => productsApi.getFeatured()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full flex flex-col items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "w-full h-[600px] md:h-[700px] relative overflow-hidden bg-zinc-900",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center justify-center opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
							alt: "Fashion Models",
							className: "w-full h-full object-cover"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-5xl md:text-7xl font-bold tracking-tighter mb-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400",
										children: "PREMIUM APPAREL"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"FOR ALL"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg md:text-xl text-muted-foreground max-w-2xl mb-10",
								children: "Redefined fashion for Men, Women, and Kids. Experience the perfect blend of comfort and modern aesthetics."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/c/$category",
								params: { category: "men" },
								className: "inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95",
								children: ["Shop Collection ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 w-5 h-5" })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "container mx-auto px-4 py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, {
							title: "Men",
							to: "/c/$category",
							params: { category: "men" },
							image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, {
							title: "Women",
							to: "/c/$category",
							params: { category: "women" },
							image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, {
							title: "Kids",
							to: "/c/$category",
							params: { category: "kids" },
							image: "https://images.unsplash.com/photo-1519238396346-60866160e1d0?q=80&w=800&auto=format&fit=crop"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container mx-auto px-4 py-10 mb-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold tracking-tight",
						children: "Featured Arrivals"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						className: "text-primary hover:underline font-medium",
						children: "View All"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
					children: featuredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/p/$slug",
						params: { slug: product.slug },
						className: "group flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product.images[0],
								alt: product.name,
								className: "object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium text-foreground truncate",
								children: product.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-primary font-bold",
								children: ["$", product.price.toFixed(2)]
							})]
						})]
					}, product.id))
				})]
			})
		]
	});
}
function CategoryCard({ title, to, params, image }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		params,
		className: "group relative h-[400px] overflow-hidden rounded-3xl bg-secondary block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: title,
				className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-0 left-0 p-8 z-20 w-full flex justify-between items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-3xl font-bold text-white",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
