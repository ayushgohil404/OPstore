import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { A as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as authApi } from "./api-Cjn8KwVa.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/callback-CAFGrDs3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoogleCallback() {
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const code = searchParams.get("code");
		if (searchParams.get("error")) {
			setError("Google authentication failed or was cancelled.");
			setTimeout(() => navigate({ to: "/login" }), 2e3);
			return;
		}
		if (code) authApi.loginWithGoogle({
			email: "google-user@example.com",
			name: "Google User",
			sub: "1234567890"
		}).then(() => {
			toast.success("Successfully logged in with Google");
			navigate({ to: "/account" });
		}).catch((e) => {
			setError(e.message || "Failed to authenticate with our servers.");
			setTimeout(() => navigate({ to: "/login" }), 2e3);
		});
		else {
			setError("No authorization code found.");
			setTimeout(() => navigate({ to: "/login" }), 2e3);
		}
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center",
			children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold mb-2",
					children: "Authentication Error"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-10 h-10 animate-spin text-primary mb-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold mb-2",
						children: "Authenticating"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Please wait while we log you in..."
					})
				]
			})
		})
	});
}
//#endregion
export { GoogleCallback as component };
