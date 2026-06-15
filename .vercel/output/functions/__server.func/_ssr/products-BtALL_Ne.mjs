import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-BtALL_Ne.js
var mapProduct = (p) => {
	let parsedImages = [];
	try {
		parsedImages = typeof p.images === "string" ? JSON.parse(p.images) : p.images;
	} catch (e) {
		if (typeof p.images === "string" && p.images.startsWith("http")) parsedImages = [p.images];
	}
	let parsedSizes = [];
	try {
		parsedSizes = typeof p.sizes === "string" ? JSON.parse(p.sizes) : p.sizes;
	} catch (e) {}
	return {
		id: p.id.toString(),
		name: p.title,
		slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
		description: p.description,
		price: p.price,
		originalPrice: p.originalPrice || void 0,
		images: parsedImages,
		categoryId: p.category,
		materials: ["Cotton"],
		variants: parsedSizes.length > 0 ? parsedSizes.map((size, i) => ({
			id: `${p.id}-v${i}`,
			size,
			color: "Black",
			sku: `SKU-${p.id}-${size}`,
			stock: p.stock
		})) : [{
			id: `${p.id}-v0`,
			size: "OS",
			color: "Black",
			sku: `SKU-${p.id}-OS`,
			stock: p.stock
		}]
	};
};
var listProducts = createServerFn({ method: "GET" }).validator((filters) => filters).handler(createSsrRpc("aaa2a9cc3c55fec31d1451469b9a330167ffdaaf22385c6ad7c88e40308b0e44"));
var getProduct = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("c09e6ff46493a0266a642fb117a49108485bd0d1f4b7f5b19a8e71d71e513615"));
var getFeatured = createServerFn({ method: "GET" }).handler(createSsrRpc("f557915d2fe13594f7504e8dfde05000f562e6c9201c1cb0955de8acf0eeabe9"));
var createProduct = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("b874f798e1ec2d45be11b04fffdaedeb1e0d12b4b6fdfe0265115583dc3432fa"));
var getLowStockProducts = createServerFn({ method: "GET" }).handler(createSsrRpc("919edf1d886c56f34b93fc9524b3f617b0e093436acf8fff22e929c9c924de00"));
//#endregion
export { listProducts as a, getProduct as i, getFeatured as n, mapProduct as o, getLowStockProducts as r, createProduct as t };
