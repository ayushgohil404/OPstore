import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-CJga3jKq.js
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
var listProducts_createServerFn_handler = createServerRpc({
	id: "aaa2a9cc3c55fec31d1451469b9a330167ffdaaf22385c6ad7c88e40308b0e44",
	name: "listProducts",
	filename: "src/server/functions/products.ts"
}, (opts) => listProducts.__executeServer(opts));
var listProducts = createServerFn({ method: "GET" }).validator((filters) => filters).handler(listProducts_createServerFn_handler, async ({ data: filters }) => {
	let where = {};
	if (filters?.categoryId) where.category = filters.categoryId;
	if (filters?.search) where.OR = [{ title: {
		contains: filters.search,
		mode: "insensitive"
	} }, { description: {
		contains: filters.search,
		mode: "insensitive"
	} }];
	return (await prisma.product.findMany({
		where,
		take: filters?.limit,
		orderBy: { createdAt: "desc" }
	})).map(mapProduct);
});
var getProduct_createServerFn_handler = createServerRpc({
	id: "c09e6ff46493a0266a642fb117a49108485bd0d1f4b7f5b19a8e71d71e513615",
	name: "getProduct",
	filename: "src/server/functions/products.ts"
}, (opts) => getProduct.__executeServer(opts));
var getProduct = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getProduct_createServerFn_handler, async ({ data: slug }) => {
	const titleQuery = slug.replace(/-/g, " ");
	const product = await prisma.product.findFirst({ where: { title: {
		contains: titleQuery,
		mode: "insensitive"
	} } });
	if (!product) return null;
	return mapProduct(product);
});
var getFeatured_createServerFn_handler = createServerRpc({
	id: "f557915d2fe13594f7504e8dfde05000f562e6c9201c1cb0955de8acf0eeabe9",
	name: "getFeatured",
	filename: "src/server/functions/products.ts"
}, (opts) => getFeatured.__executeServer(opts));
var getFeatured = createServerFn({ method: "GET" }).handler(getFeatured_createServerFn_handler, async () => {
	return (await prisma.product.findMany({
		take: 4,
		orderBy: { createdAt: "desc" }
	})).map(mapProduct);
});
var createProduct_createServerFn_handler = createServerRpc({
	id: "b874f798e1ec2d45be11b04fffdaedeb1e0d12b4b6fdfe0265115583dc3432fa",
	name: "createProduct",
	filename: "src/server/functions/products.ts"
}, (opts) => createProduct.__executeServer(opts));
var createProduct = createServerFn({ method: "POST" }).validator((data) => data).handler(createProduct_createServerFn_handler, async ({ data }) => {
	return mapProduct(await prisma.product.create({ data: {
		title: data.title,
		description: data.description,
		price: data.price,
		category: data.category,
		stock: data.stock,
		originalPrice: data.originalPrice,
		images: JSON.stringify([data.imageUrl])
	} }));
});
var getLowStockProducts_createServerFn_handler = createServerRpc({
	id: "919edf1d886c56f34b93fc9524b3f617b0e093436acf8fff22e929c9c924de00",
	name: "getLowStockProducts",
	filename: "src/server/functions/products.ts"
}, (opts) => getLowStockProducts.__executeServer(opts));
var getLowStockProducts = createServerFn({ method: "GET" }).handler(getLowStockProducts_createServerFn_handler, async () => {
	return (await prisma.product.findMany({
		where: { stock: { lte: 5 } },
		orderBy: { stock: "asc" },
		take: 5
	})).map((p) => ({
		name: p.title,
		sku: `SKU-${p.id}`,
		stock: p.stock
	}));
});
//#endregion
export { createProduct_createServerFn_handler, getFeatured_createServerFn_handler, getLowStockProducts_createServerFn_handler, getProduct_createServerFn_handler, listProducts_createServerFn_handler };
