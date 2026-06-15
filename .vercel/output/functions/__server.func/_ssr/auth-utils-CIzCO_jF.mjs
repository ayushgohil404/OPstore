import { o as __toESM } from "../_runtime.mjs";
import { i as getCookie } from "./ssr.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-utils-CIzCO_jF.js
var import_jsonwebtoken = /* @__PURE__ */ __toESM(require_jsonwebtoken());
var getUserIdFromCookie = () => {
	const token = getCookie("auth_token");
	if (!token) return null;
	const JWT_SECRET = process.env.JWT_SECRET;
	if (!JWT_SECRET) {
		console.error("JWT_SECRET is not set");
		return null;
	}
	try {
		return import_jsonwebtoken.default.verify(token, JWT_SECRET).id;
	} catch (e) {
		return null;
	}
};
var requireAdmin = async () => {
	const token = getCookie("auth_token");
	if (!token) throw new Error("Unauthorized");
	const JWT_SECRET = process.env.JWT_SECRET;
	if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set");
	try {
		const decoded = import_jsonwebtoken.default.verify(token, JWT_SECRET);
		const user = await prisma.user.findUnique({ where: { id: decoded.id } });
		if (!user || user.role !== "ADMIN") throw new Error("Forbidden: Admin access required");
		return user;
	} catch (e) {
		throw new Error(e.message || "Unauthorized");
	}
};
//#endregion
export { requireAdmin as n, getUserIdFromCookie as t };
