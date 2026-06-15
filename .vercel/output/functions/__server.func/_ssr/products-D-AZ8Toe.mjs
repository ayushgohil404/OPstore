import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { M as Ellipsis, _ as Search, c as Trash2, j as Funnel, u as SquarePen, y as Plus } from "../_libs/lucide-react.mjs";
import { r as productsApi } from "./api-zWRieyl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-D-AZ8Toe.js
var import_jsx_runtime = require_jsx_runtime();
function AdminProductsList() {
	const { data: products } = useSuspenseQuery({
		queryKey: ["admin", "products"],
		queryFn: () => productsApi.listProducts()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6 max-w-7xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight mb-1",
				children: "Products"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Manage your catalog, inventory, and pricing."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/products/new",
				className: "bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-5 h-5" }), "Add Product"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-background border border-border rounded-2xl flex flex-col overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-b border-border flex items-center justify-between bg-secondary/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full max-w-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search products...",
								className: "w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium bg-background hover:bg-secondary transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "w-4 h-4" }), "Filter"]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-muted-foreground border-b border-border bg-secondary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 font-medium",
									children: "Product"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 font-medium",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 font-medium",
									children: "Price"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 font-medium",
									children: "Inventory"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 font-medium text-right",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: products.map((product) => {
								const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
								const inStock = totalStock > 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/50 transition-colors group",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: product.images[0],
														alt: "",
														className: "w-full h-full object-cover"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer",
														children: product.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs text-muted-foreground",
														children: [product.variants.length, " Variants"]
													})]
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4 capitalize",
											children: product.categoryId
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-6 py-4 font-medium",
											children: ["$", product.price.toFixed(2)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-2 h-2 rounded-full ${inStock ? "bg-emerald-500" : "bg-destructive"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: inStock ? "" : "text-destructive font-medium",
													children: inStock ? `${totalStock} in stock` : "Out of stock"
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-end gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														className: "p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors",
														title: "Edit",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-4 h-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														className: "p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors",
														title: "Delete",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														className: "p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "w-4 h-4" })
													})
												]
											})
										})
									]
								}, product.id);
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-secondary/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Showing 1 to ",
						products.length,
						" of ",
						products.length,
						" products"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-3 py-1 border border-border rounded-md opacity-50 cursor-not-allowed",
							children: "Previous"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-3 py-1 border border-border rounded-md hover:bg-secondary transition-colors",
							children: "Next"
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
export { AdminProductsList as component };
