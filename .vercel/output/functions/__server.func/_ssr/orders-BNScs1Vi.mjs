import { o as __toESM } from "../_runtime.mjs";
import { i as getCookie, n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-BNScs1Vi.js
var import_jsonwebtoken = /* @__PURE__ */ __toESM(require_jsonwebtoken());
var JWT_SECRET = process.env.JWT_SECRET || "secret";
var getUserIdFromCookie = () => {
	const token = getCookie("auth_token");
	if (!token) return null;
	try {
		return import_jsonwebtoken.default.verify(token, JWT_SECRET).id;
	} catch (e) {
		return null;
	}
};
var requireAdmin = async () => {
	const token = getCookie("auth_token");
	if (!token) throw new Error("Unauthorized");
	try {
		const decoded = import_jsonwebtoken.default.verify(token, JWT_SECRET);
		const user = await prisma.user.findUnique({ where: { id: decoded.id } });
		if (!user || user.role !== "ADMIN") throw new Error("Forbidden: Admin access required");
		return user;
	} catch (e) {
		throw new Error(e.message || "Unauthorized");
	}
};
var listUserOrders_createServerFn_handler = createServerRpc({
	id: "08943e78fc82af5c8bd384db23b95ce9d296c098c050b9af42067d955d5e55f1",
	name: "listUserOrders",
	filename: "src/server/functions/orders.ts"
}, (opts) => listUserOrders.__executeServer(opts));
var listUserOrders = createServerFn({ method: "GET" }).handler(listUserOrders_createServerFn_handler, async () => {
	const userId = getUserIdFromCookie();
	if (!userId) return [];
	return (await prisma.order.findMany({
		where: { userId },
		orderBy: { createdAt: "desc" }
	})).map((o) => ({
		...o,
		items: JSON.parse(o.items)
	}));
});
var listAllOrders_createServerFn_handler = createServerRpc({
	id: "18e9d61060d226a217bddd3ab9ed2d1f4cec66074ba70c7422c09a6ff0d6b49a",
	name: "listAllOrders",
	filename: "src/server/functions/orders.ts"
}, (opts) => listAllOrders.__executeServer(opts));
var listAllOrders = createServerFn({ method: "GET" }).handler(listAllOrders_createServerFn_handler, async () => {
	await requireAdmin();
	return (await prisma.order.findMany({ orderBy: { createdAt: "desc" } })).map((o) => ({
		...o,
		items: JSON.parse(o.items)
	}));
});
var updateOrderStatus_createServerFn_handler = createServerRpc({
	id: "a328c510d0d8d7a6015cf5fcb79c1cdaad19756292c2df03215db93bb2ad65b8",
	name: "updateOrderStatus",
	filename: "src/server/functions/orders.ts"
}, (opts) => updateOrderStatus.__executeServer(opts));
var updateOrderStatus = createServerFn({ method: "POST" }).validator((data) => data).handler(updateOrderStatus_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const order = await prisma.order.update({
		where: { id: data.orderId },
		data: { status: data.status }
	});
	return {
		...order,
		items: JSON.parse(order.items)
	};
});
var getStoreKPIs_createServerFn_handler = createServerRpc({
	id: "6ce5f9c59223924ec6bd6e70934cf12ef3a09340cee18e458ad7d8b2a304bd79",
	name: "getStoreKPIs",
	filename: "src/server/functions/orders.ts"
}, (opts) => getStoreKPIs.__executeServer(opts));
var getStoreKPIs = createServerFn({ method: "GET" }).handler(getStoreKPIs_createServerFn_handler, async () => {
	await requireAdmin();
	const totalOrders = await prisma.order.count();
	const revenueAgg = await prisma.order.aggregate({ _sum: { totalAmount: true } });
	const activeCustomers = await prisma.user.count();
	const recentOrders = await prisma.order.findMany({
		take: 5,
		orderBy: { createdAt: "desc" }
	});
	return {
		totalRevenue: revenueAgg._sum.totalAmount || 0,
		totalOrders,
		activeCustomers,
		recentOrders: recentOrders.map((o) => ({
			...o,
			items: JSON.parse(o.items)
		}))
	};
});
//#endregion
export { getStoreKPIs_createServerFn_handler, listAllOrders_createServerFn_handler, listUserOrders_createServerFn_handler, updateOrderStatus_createServerFn_handler };
