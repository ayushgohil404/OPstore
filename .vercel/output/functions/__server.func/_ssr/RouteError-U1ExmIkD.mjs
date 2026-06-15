import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RouteError-U1ExmIkD.js
var import_jsx_runtime = require_jsx_runtime();
function RouteError({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			padding: "2rem",
			textAlign: "center"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Something went wrong." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: {
				opacity: .6,
				fontSize: "0.875rem"
			},
			children: error?.message
		})]
	});
}
//#endregion
export { RouteError as t };
