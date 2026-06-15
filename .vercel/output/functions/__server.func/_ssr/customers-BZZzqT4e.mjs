import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
import { n as requireAdmin } from "./auth-utils-CIzCO_jF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-BZZzqT4e.js
var listAllCustomers_createServerFn_handler = createServerRpc({
	id: "f09c5504b1f05324348dbb4d9d54e9049f02c3422c08d5946715344027eaf2d8",
	name: "listAllCustomers",
	filename: "src/server/functions/customers.ts"
}, (opts) => listAllCustomers.__executeServer(opts));
var listAllCustomers = createServerFn({ method: "GET" }).handler(listAllCustomers_createServerFn_handler, async () => {
	await requireAdmin();
	return prisma.user.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			createdAt: true,
			_count: { select: { orders: true } }
		},
		orderBy: { createdAt: "desc" }
	});
});
//#endregion
export { listAllCustomers_createServerFn_handler };
