import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { o as TriangleAlert, y as Save } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-hEd5SrlQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminSettings() {
	const [storeName, setStoreName] = (0, import_react.useState)("OPStore");
	const [contactEmail, setContactEmail] = (0, import_react.useState)("contact@opstore.com");
	const handleSave = (e) => {
		e.preventDefault();
		toast.success("Settings saved successfully");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8 max-w-4xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight mb-1",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Manage your store configurations."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-background border border-border rounded-2xl shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Store Information"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: "Update your basic store details and contact information."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSave,
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 max-w-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Store Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: storeName,
									onChange: (e) => setStoreName(e.target.value),
									className: "w-full bg-secondary/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 max-w-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Contact Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: contactEmail,
									onChange: (e) => setContactEmail(e.target.value),
									className: "w-full bg-secondary/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "bg-primary text-primary-foreground font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), "Save changes"]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-background border border-red-500/30 rounded-2xl shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 border-b border-red-500/20 bg-red-500/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-xl font-semibold text-red-600 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5" }), "Danger Zone"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-red-600/80 mt-1",
						children: "Irreversible and destructive actions."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 bg-red-500/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-medium text-foreground",
							children: "Clear all sessions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: "Force all users to log out immediately. This cannot be undone."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toast.error("This action is not available in demo mode"),
							className: "bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shrink-0",
							children: "Clear all sessions"
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { AdminSettings as component };
