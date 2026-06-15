import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { N as Funnel, z as ChevronDown } from "../_libs/lucide-react.mjs";
import { r as productsApi } from "./api-DYwpfXbe.mjs";
import { t as Route } from "./c._category-C8YJ7Hoj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/c._category-D9b_lPAZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
	const [selectedSize, setSelectedSize] = (0, import_react.useState)(null);
	const [selectedColor, setSelectedColor] = (0, import_react.useState)(null);
	const [maxPrice, setMaxPrice] = (0, import_react.useState)(9999);
	const filtered = products.filter((p) => {
		const sizeOk = !selectedSize || p.variants?.some((v) => v.size === selectedSize);
		const colorOk = !selectedColor || p.variants?.some((v) => v.color === selectedColor);
		const priceOk = p.price <= maxPrice;
		return sizeOk && colorOk && priceOk;
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
							className: "flex items-center justify-between pb-4 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-semibold text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "w-5 h-5" }), "Filters"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setSelectedSize(null);
									setSelectedColor(null);
									setMaxPrice(9999);
								},
								className: "text-xs text-primary hover:underline font-medium",
								children: "Clear filters"
							})]
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
									onClick: () => setSelectedSize(selectedSize === size ? null : size),
									className: `border rounded-md py-2 text-sm text-center transition-colors ${selectedSize === size ? "border-primary bg-primary/10" : "border-border hover:border-primary"}`,
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
									onClick: () => setSelectedColor(selectedColor === color.name ? null : color.name),
									className: `w-8 h-8 rounded-full border ring-offset-background hover:ring-2 hover:ring-ring hover:ring-offset-2 transition-all ${selectedColor === color.name ? "ring-2 ring-primary ring-offset-2" : "border-border"}`,
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
										type: "number",
										placeholder: "Max",
										value: maxPrice === 9999 ? "" : maxPrice,
										onChange: (e) => setMaxPrice(e.target.value ? Number(e.target.value) : 9999),
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
						children: [filtered.length, " Products"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "bg-transparent border border-border rounded-md px-3 py-1.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Recommended" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Newest" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Price: Low to High" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Price: High to Low" })
						]
					})]
				}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					children: filtered.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
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
