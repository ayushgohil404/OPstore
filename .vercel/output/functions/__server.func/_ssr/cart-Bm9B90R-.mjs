import { i as getCookie, n as createServerFn, o as setCookie$1 } from "./ssr.mjs";
import { o as mapProduct } from "./products-BtALL_Ne.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-Bm9B90R-.js
var getRawCart = () => {
	const cookieStr = getCookie("store_cart");
	if (!cookieStr) return [];
	try {
		return JSON.parse(cookieStr);
	} catch {
		return [];
	}
};
var saveRawCart = (cart) => {
	setCookie$1("store_cart", JSON.stringify(cart), {
		path: "/",
		httpOnly: true,
		maxAge: 3600 * 24 * 30
	});
};
var getCart_createServerFn_handler = createServerRpc({
	id: "405ed75e1e83b2c0e592b92897aaef3c246a89b490939256d77bf427853f7dcb",
	name: "getCart",
	filename: "src/server/functions/cart.ts"
}, (opts) => getCart.__executeServer(opts));
var getCart = createServerFn({ method: "GET" }).handler(getCart_createServerFn_handler, async () => {
	const rawCart = getRawCart();
	if (rawCart.length === 0) return [];
	const productIds = rawCart.map((i) => parseInt(i.productId, 10)).filter((id) => !isNaN(id));
	const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
	return rawCart.map((item) => {
		const p = products.find((prod) => prod.id.toString() === item.productId);
		if (!p) return null;
		return {
			variantId: item.productId,
			quantity: item.quantity,
			product: mapProduct(p)
		};
	}).filter(Boolean);
});
var addToCart_createServerFn_handler = createServerRpc({
	id: "230d5355cab9339b0ce9ae0f5f47932bd129ff270fdae1cdf90f0daa44abce2b",
	name: "addToCart",
	filename: "src/server/functions/cart.ts"
}, (opts) => addToCart.__executeServer(opts));
var addToCart = createServerFn({ method: "POST" }).validator((data) => data).handler(addToCart_createServerFn_handler, async ({ data }) => {
	const rawCart = getRawCart();
	const existing = rawCart.find((i) => i.productId === data.variantId);
	if (existing) existing.quantity += data.quantity;
	else rawCart.push({
		productId: data.variantId,
		quantity: data.quantity
	});
	saveRawCart(rawCart);
	return { success: true };
});
var updateCartQuantity_createServerFn_handler = createServerRpc({
	id: "403e1145f60088c051507584d8984502208ae6e5e210b472d05d27ee75bedc53",
	name: "updateCartQuantity",
	filename: "src/server/functions/cart.ts"
}, (opts) => updateCartQuantity.__executeServer(opts));
var updateCartQuantity = createServerFn({ method: "POST" }).validator((data) => data).handler(updateCartQuantity_createServerFn_handler, async ({ data }) => {
	const rawCart = getRawCart();
	const existing = rawCart.find((i) => i.productId === data.variantId);
	if (existing) existing.quantity = data.quantity;
	saveRawCart(rawCart);
	return { success: true };
});
var removeFromCart_createServerFn_handler = createServerRpc({
	id: "383937b9997449a1da06c1ebe902a072f653b117c82605c9e335c279614cbdb4",
	name: "removeFromCart",
	filename: "src/server/functions/cart.ts"
}, (opts) => removeFromCart.__executeServer(opts));
var removeFromCart = createServerFn({ method: "POST" }).validator((data) => data).handler(removeFromCart_createServerFn_handler, async ({ data }) => {
	let rawCart = getRawCart();
	rawCart = rawCart.filter((i) => i.productId !== data.variantId);
	saveRawCart(rawCart);
	return { success: true };
});
var clearCart_createServerFn_handler = createServerRpc({
	id: "4cfe41f1eacd96e3cd3712b0444b8417266a16107218f87b56139278d42443e6",
	name: "clearCart",
	filename: "src/server/functions/cart.ts"
}, (opts) => clearCart.__executeServer(opts));
var clearCart = createServerFn({ method: "POST" }).handler(clearCart_createServerFn_handler, async () => {
	saveRawCart([]);
	return { success: true };
});
//#endregion
export { addToCart_createServerFn_handler, clearCart_createServerFn_handler, getCart_createServerFn_handler, removeFromCart_createServerFn_handler, updateCartQuantity_createServerFn_handler };
