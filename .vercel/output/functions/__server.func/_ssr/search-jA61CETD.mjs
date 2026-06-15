import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { H as ArrowRight, N as Funnel, f as SlidersHorizontal, t as X, v as Search, z as ChevronDown } from "../_libs/lucide-react.mjs";
import { r as productsApi } from "./api-DYwpfXbe.mjs";
import { t as Route } from "./search-B1a-cRJe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-jA61CETD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q, category } = Route.useSearch();
	const navigate = useNavigate({ from: "/search" });
	const [inputValue, setInputValue] = (0, import_react.useState)(q || "");
	const [isFiltersOpen, setIsFiltersOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			navigate({
				search: {
					q: inputValue || void 0,
					category
				},
				replace: true
			});
		}, 400);
		return () => clearTimeout(timer);
	}, [
		inputValue,
		category,
		navigate
	]);
	const { data: products, isLoading } = useQuery({
		queryKey: [
			"products",
			"search",
			q,
			category
		],
		queryFn: () => productsApi.listProducts({
			search: q,
			categoryId: category
		}),
		enabled: !!q || !!category
	});
	const trendingSearches = [
		"leather tote",
		"silk dress",
		"essential tee",
		"kids bomber"
	];
	const categoriesList = [
		"Men",
		"Women",
		"Kids",
		"Accessories"
	];
	const handleCategoryToggle = (cat) => {
		navigate({
			search: {
				q,
				category: category === cat.toLowerCase() ? void 0 : cat.toLowerCase()
			},
			replace: true
		});
	};
	const hasSearchOrFilter = !!q || !!category;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mx-auto px-4 py-8 min-h-[80vh]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-4xl mx-auto mb-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-muted-foreground group-focus-within:text-primary transition-colors" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: inputValue,
							onChange: (e) => setInputValue(e.target.value),
							placeholder: "What are you looking for?",
							className: "w-full bg-secondary/30 border-2 border-border rounded-full pl-20 pr-16 py-6 text-2xl font-medium focus:outline-none focus:border-primary transition-all shadow-sm",
							autoFocus: true
						}),
						inputValue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setInputValue(""),
							className: "absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-background rounded-full text-muted-foreground hover:text-foreground hover:shadow-md transition-all",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
						})
					]
				})
			}),
			!hasSearchOrFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUpIcon, { className: "w-4 h-4" }), " Trending Now"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-3",
					children: trendingSearches.map((term) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setInputValue(term),
						className: "px-6 py-3 rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors font-medium shadow-sm hover:shadow-md",
						children: term
					}, term))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6",
					children: "Explore Categories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-6",
					children: [
						{
							name: "Men",
							image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=400&auto=format&fit=crop"
						},
						{
							name: "Women",
							image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop"
						},
						{
							name: "Kids",
							image: "https://images.unsplash.com/photo-1519238396346-60866160e1d0?q=80&w=400&auto=format&fit=crop"
						}
					].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleCategoryToggle(cat.name),
						className: "group relative h-48 rounded-2xl overflow-hidden block w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: cat.image,
								alt: cat.name,
								className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center z-20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white text-2xl font-bold tracking-tight",
									children: cat.name
								})
							})
						]
					}, cat.name))
				})] })]
			}),
			hasSearchOrFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col lg:flex-row gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: `w-full lg:w-64 flex-shrink-0 ${isFiltersOpen ? "block" : "hidden lg:block"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-24 space-y-8 bg-secondary/20 p-6 rounded-3xl border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-bold text-lg pb-4 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "w-5 h-5" }), "Filters"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-medium flex items-center justify-between",
								children: ["Category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: categoriesList.map((cat) => {
									const isChecked = category === cat.toLowerCase();
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-3 cursor-pointer group",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: isChecked,
												onChange: () => handleCategoryToggle(cat),
												className: "hidden"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? "bg-primary border-primary text-primary-foreground" : "border-border group-hover:border-primary"}`,
												children: isChecked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													viewBox: "0 0 14 14",
													fill: "none",
													className: "w-3 h-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														d: "M3 8L6 11L11 3.5",
														stroke: "currentColor",
														strokeWidth: "2",
														strokeLinecap: "round",
														strokeLinejoin: "round"
													})
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm",
												children: cat
											})
										]
									}, cat);
								})
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-medium",
							children: q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Results for \"",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: q
								}),
								"\""
							] }) : category ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "capitalize",
								children: [category, " Collection"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All Products" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-sm",
								children: isLoading ? "Searching..." : `${products?.length || 0} items`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary",
								onClick: () => setIsFiltersOpen(!isFiltersOpen),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "w-4 h-4" }), " Filters"]
							})]
						})]
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 animate-pulse",
						children: [
							1,
							2,
							3,
							4,
							5,
							6
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[3/4] bg-secondary rounded-2xl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-secondary w-3/4 rounded mt-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-secondary w-1/4 rounded" })
							]
						}, i))
					}) : products && products.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10",
						children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/p/$slug",
							params: { slug: product.slug },
							className: "group flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: product.images[0],
									alt: product.name,
									className: "object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-medium text-foreground truncate",
									children: product.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-primary font-bold",
										children: ["$", product.price.toFixed(2)]
									})
								})]
							})]
						}, product.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-32 bg-secondary/20 rounded-3xl border border-border border-dashed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-bold mb-2",
								children: "No matching items"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground mb-8 max-w-md mx-auto",
								children: "We couldn't find anything matching your filters. Try checking for typos or using more general terms."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setInputValue("");
									navigate({ search: {
										q: void 0,
										category: void 0
									} });
								},
								className: "bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors",
								children: "Clear search"
							})
						]
					})]
				})]
			})
		]
	});
}
function TrendingUpIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		...props,
		xmlns: "http://www.w3.org/2000/svg",
		width: "24",
		height: "24",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "16 7 22 7 22 13" })]
	});
}
//#endregion
export { SearchPage as component };
