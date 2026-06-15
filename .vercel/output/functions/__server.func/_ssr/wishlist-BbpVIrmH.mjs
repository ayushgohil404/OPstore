import "../_runtime.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { o as mapProduct } from "./products-BtALL_Ne.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
import { t as getUserIdFromCookie } from "./auth-utils-hAx8t1vN.mjs";
require_jsonwebtoken();
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set");
var getWishlist_createServerFn_handler = createServerRpc({
	id: "23497a46959a75a4f515d77e23057b56b49da2f801b46a447029952ad8ec843c",
	name: "getWishlist",
	filename: "src/server/functions/wishlist.ts"
}, (opts) => getWishlist.__executeServer(opts));
var getWishlist = createServerFn({ method: "GET" }).handler(getWishlist_createServerFn_handler, async () => {
	const userId = getUserIdFromCookie();
	if (!userId) return [];
	return (await prisma.wishlist.findMany({
		where: { userId },
		include: { product: true },
		orderBy: { createdAt: "desc" }
	})).map((w) => ({
		id: w.id,
		productId: w.productId.toString(),
		product: mapProduct(w.product),
		createdAt: w.createdAt.toISOString()
	}));
});
var toggleWishlist_createServerFn_handler = createServerRpc({
	id: "360236355a9861f95902e9eb0d307f2efee5a2f199cf39f88f087e433632b420",
	name: "toggleWishlist",
	filename: "src/server/functions/wishlist.ts"
}, (opts) => toggleWishlist.__executeServer(opts));
var toggleWishlist = createServerFn({ method: "POST" }).validator((productId) => productId).handler(toggleWishlist_createServerFn_handler, async ({ data: productId }) => {
	const userId = getUserIdFromCookie();
	if (!userId) throw new Error("Unauthorized");
	const existing = await prisma.wishlist.findFirst({ where: {
		userId,
		productId
	} });
	if (existing) {
		await prisma.wishlist.delete({ where: { id: existing.id } });
		return { added: false };
	} else {
		await prisma.wishlist.create({ data: {
			userId,
			productId
		} });
		return { added: true };
	}
});
//#endregion
export { getWishlist_createServerFn_handler, toggleWishlist_createServerFn_handler };
