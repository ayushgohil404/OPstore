import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-cart-BWS8qGVK.js
var getCart = createServerFn({ method: "GET" }).handler(createSsrRpc("405ed75e1e83b2c0e592b92897aaef3c246a89b490939256d77bf427853f7dcb"));
var addToCart = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("230d5355cab9339b0ce9ae0f5f47932bd129ff270fdae1cdf90f0daa44abce2b"));
var updateCartQuantity = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("403e1145f60088c051507584d8984502208ae6e5e210b472d05d27ee75bedc53"));
var removeFromCart = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("383937b9997449a1da06c1ebe902a072f653b117c82605c9e335c279614cbdb4"));
var clearCart = createServerFn({ method: "POST" }).handler(createSsrRpc("4cfe41f1eacd96e3cd3712b0444b8417266a16107218f87b56139278d42443e6"));
var cartApi = {
	getCart: async () => {
		return await getCart();
	},
	addItem: async (item) => {
		await addToCart({ data: item });
	},
	removeItem: async (variantId) => {
		await removeFromCart({ data: { variantId } });
	},
	updateQuantity: async (variantId, quantity) => {
		await updateCartQuantity({ data: {
			variantId,
			quantity
		} });
	},
	clearCart: async () => {
		await clearCart();
	}
};
//#endregion
export { cartApi as t };
