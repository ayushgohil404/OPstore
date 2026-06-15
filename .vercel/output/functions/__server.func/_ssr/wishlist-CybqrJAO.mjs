import "../_runtime.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
require_jsonwebtoken();
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set");
var getWishlist = createServerFn({ method: "GET" }).handler(createSsrRpc("23497a46959a75a4f515d77e23057b56b49da2f801b46a447029952ad8ec843c"));
var toggleWishlist = createServerFn({ method: "POST" }).validator((productId) => productId).handler(createSsrRpc("360236355a9861f95902e9eb0d307f2efee5a2f199cf39f88f087e433632b420"));
var wishlistApi = {
	getWishlist: async () => {
		return await getWishlist();
	},
	toggleWishlist: async (productId) => {
		return await toggleWishlist({ data: productId });
	}
};
//#endregion
export { wishlistApi as t };
