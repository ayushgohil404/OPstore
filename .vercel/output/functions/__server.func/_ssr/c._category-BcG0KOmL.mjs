import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { L as ChevronDown, j as Funnel } from "../_libs/lucide-react.mjs";
import { r as productsApi } from "./api-zWRieyl8.mjs";
import { t as Route } from "./c._category-DW36RyF2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/c._category-BcG0KOmL.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPLP() {
	const { category } = Route.useParams();
	const { data: products } = useSuspenseQuery({
		queryKey: [
			"products",
			"category",
			category
		],
		queryFn: () => productsApi.listProducts({ categoryId: category })
	});
	const title = category.charAt(0).toUpperCase() + category.slice(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mx-auto px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-bold tracking-tight mb-2",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground",
				children: [
					"Discover our latest ",
					title.toLowerCase(),
					" collection. Premium quality, modern aesthetic."
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col md:flex-row gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "w-full md:w-64 flex-shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-24 space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-semibold text-lg pb-4 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "w-5 h-5" }), "Filters"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-medium flex items-center justify-between",
								children: ["Size ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-2",
								children: [
									"XS",
									"S",
									"M",
									"L",
									"XL"
								].map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "border border-border hover:border-primary rounded-md py-2 text-sm text-center transition-colors",
									children: size
								}, size))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-medium flex items-center justify-between",
								children: ["Color ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-3",
								children: [
									{
										name: "Black",
										hex: "#000000"
									},
									{
										name: "White",
										hex: "#ffffff"
									},
									{
										name: "Navy",
										hex: "#1e3a8a"
									},
									{
										name: "Olive",
										hex: "#4d7c0f"
									},
									{
										name: "Stone",
										hex: "#d6d3d1"
									}
								].map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "w-8 h-8 rounded-full border border-border ring-offset-background hover:ring-2 hover:ring-ring hover:ring-offset-2 transition-all",
									style: { backgroundColor: color.hex },
									title: color.name
								}, color.name))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-medium flex items-center justify-between",
								children: ["Price ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Min",
										className: "w-full bg-secondary rounded-md px-3 py-2 text-sm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "-" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Max",
										className: "w-full bg-secondary rounded-md px-3 py-2 text-sm"
									})
								]
							})]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground",
						children: [products.length, " Products"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "bg-transparent border border-border rounded-md px-3 py-1.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Recommended" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Newest" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Price: Low to High" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Price: High to Low" })
						]
					})]
				}), products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-20 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-medium mb-2",
						children: "No products found"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Try adjusting your filters or search."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10",
					children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
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
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary font-bold",
									children: ["$", product.price.toFixed(2)]
								}), product.originalPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted-foreground line-through",
									children: ["$", product.originalPrice.toFixed(2)]
								})]
							})]
						})]
					}, product.id))
				})]
			})]
		})]
	});
}
//#endregion
export { CategoryPLP as component };
