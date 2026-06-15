import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { o as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { r as Users, v as Search } from "../_libs/lucide-react.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-CwIA6Oze.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var listAllCustomers = createServerFn({ method: "GET" }).handler(createSsrRpc("f09c5504b1f05324348dbb4d9d54e9049f02c3422c08d5946715344027eaf2d8"));
function AdminCustomers() {
	const [search, setSearch] = (0, import_react.useState)("");
	const { data: customers = [], isLoading } = useQuery({
		queryKey: ["admin-customers"],
		queryFn: () => listAllCustomers()
	});
	const filteredCustomers = customers.filter((c) => {
		if (!search) return true;
		const q = search.toLowerCase();
		return `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8 max-w-7xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight mb-1",
				children: "Customers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Manage and track your customers."
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-background border border-border rounded-2xl shadow-sm flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 border-b border-border flex flex-col sm:flex-row items-center gap-4 justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search by name or email...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full bg-secondary/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto min-h-[400px]",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-8 flex justify-center text-muted-foreground",
					children: "Loading customers..."
				}) : filteredCustomers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-16 flex flex-col items-center justify-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-12 h-12 text-muted-foreground opacity-50 mb-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-medium",
							children: "No customers found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: "There are no customers matching your search."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-muted-foreground bg-secondary/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Orders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Joined date"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: filteredCustomers.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-secondary/20 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-6 py-4 font-medium text-foreground",
									children: [
										customer.firstName,
										" ",
										customer.lastName
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-muted-foreground",
									children: customer.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 font-medium",
									children: customer._count.orders
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-muted-foreground",
									children: new Date(customer.createdAt).toLocaleDateString()
								})
							]
						}, customer.id))
					})]
				})
			})]
		})]
	});
}
//#endregion
export { AdminCustomers as component };
