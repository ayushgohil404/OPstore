import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { O as LoaderCircle, V as ArrowLeft, i as Upload } from "../_libs/lucide-react.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { r as productsApi } from "./api-zWRieyl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-DvbTLeRH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var uploadImage = createServerFn({ method: "POST" }).validator((formData) => formData).handler(createSsrRpc("59819dedcbdf25fc7a4d4a12d6684df8aa3cd8fc97d424e4f780637c172ccd14"));
function AddProduct() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [imageFile, setImageFile] = (0, import_react.useState)(null);
	const [imagePreview, setImagePreview] = (0, import_react.useState)(null);
	const handleImageChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const formData = new FormData(e.currentTarget);
			const title = formData.get("title");
			const price = parseFloat(formData.get("price"));
			const originalPriceRaw = formData.get("originalPrice");
			const originalPrice = originalPriceRaw ? parseFloat(originalPriceRaw) : void 0;
			const category = formData.get("category");
			const stock = parseInt(formData.get("stock"), 10);
			const description = formData.get("description");
			if (!imageFile) throw new Error("Please select an image");
			const imageFormData = new FormData();
			imageFormData.append("file", imageFile);
			const uploadRes = await uploadImage({ data: imageFormData });
			if (!uploadRes.url) throw new Error("Failed to get image URL");
			await productsApi.createProduct({
				title,
				price,
				originalPrice,
				category,
				stock,
				description,
				imageUrl: uploadRes.url
			});
			navigate({ to: "/admin/products" });
		} catch (err) {
			setError(err.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl mx-auto flex flex-col gap-8 pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({ to: "/admin/products" }),
					className: "p-2 border border-border rounded-lg hover:bg-secondary transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5 text-muted-foreground" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight mb-1",
					children: "Add Product"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Create a new product in your catalog."
				})] })]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "flex flex-col md:flex-row gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-background border border-border p-6 rounded-2xl flex flex-col gap-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold",
								children: "General Information"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Product Title"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "title",
									required: true,
									className: "w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none",
									placeholder: "e.g. Classic White Sneakers"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									name: "description",
									required: true,
									rows: 4,
									className: "w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none",
									placeholder: "Product details..."
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-background border border-border p-6 rounded-2xl flex flex-col gap-4 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Pricing & Inventory"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium",
										children: "Price ($)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "price",
										type: "number",
										step: "0.01",
										required: true,
										className: "w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none",
										placeholder: "0.00"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium",
										children: "Compare at Price ($)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "originalPrice",
										type: "number",
										step: "0.01",
										className: "w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none",
										placeholder: "Optional"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium",
										children: "Stock Quantity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "stock",
										type: "number",
										required: true,
										className: "w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none",
										placeholder: "10"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium",
										children: "Category"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "category",
										required: true,
										className: "w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "apparel",
												children: "Apparel"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "footwear",
												children: "Footwear"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "accessories",
												children: "Accessories"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "outerwear",
												children: "Outerwear"
											})
										]
									})]
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full md:w-80 flex flex-col gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-background border border-border p-6 rounded-2xl flex flex-col gap-4 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Product Image"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-square w-full border-2 border-dashed border-border rounded-xl flex items-center justify-center overflow-hidden bg-secondary/20 hover:bg-secondary/40 transition-colors group cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								onChange: handleImageChange,
								className: "absolute inset-0 opacity-0 cursor-pointer z-10"
							}), imagePreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: imagePreview,
								className: "w-full h-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white text-sm font-medium",
									children: "Change Image"
								})
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-2 text-muted-foreground p-6 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-8 h-8 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Click or drag image to upload"
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: loading,
						className: "w-full bg-primary text-primary-foreground font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : "Save Product"
					})]
				})]
			})
		]
	});
}
//#endregion
export { AddProduct as component };
