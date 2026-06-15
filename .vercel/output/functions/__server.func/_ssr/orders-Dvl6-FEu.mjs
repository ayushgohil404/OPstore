import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-Dvl6-FEu.js
var listUserOrders = createServerFn({ method: "GET" }).handler(createSsrRpc("08943e78fc82af5c8bd384db23b95ce9d296c098c050b9af42067d955d5e55f1"));
var listAllOrders = createServerFn({ method: "GET" }).handler(createSsrRpc("18e9d61060d226a217bddd3ab9ed2d1f4cec66074ba70c7422c09a6ff0d6b49a"));
var updateOrderStatus = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a328c510d0d8d7a6015cf5fcb79c1cdaad19756292c2df03215db93bb2ad65b8"));
var getStoreKPIs = createServerFn({ method: "GET" }).handler(createSsrRpc("6ce5f9c59223924ec6bd6e70934cf12ef3a09340cee18e458ad7d8b2a304bd79"));
var ordersApi = {
	listUserOrders: async () => {
		return await listUserOrders();
	},
	listAllOrders: async () => {
		return await listAllOrders();
	},
	updateOrderStatus: async (orderId, status) => {
		return await updateOrderStatus({ data: {
			orderId,
			status
		} });
	},
	getStoreKPIs: async () => {
		return await getStoreKPIs();
	}
};
//#endregion
export { ordersApi as t };
