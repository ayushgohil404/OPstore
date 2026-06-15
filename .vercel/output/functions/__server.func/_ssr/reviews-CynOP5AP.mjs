import { o as __toESM } from "../_runtime.mjs";
import { i as getCookie, n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-CynOP5AP.js
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
var getReviews_createServerFn_handler = createServerRpc({
	id: "55fa4b34afc759b8dbb5caeba482c36bac96e301899dccd9a952042c0affbb17",
	name: "getReviews",
	filename: "src/server/functions/reviews.ts"
}, (opts) => getReviews.__executeServer(opts));
var getReviews = createServerFn({ method: "GET" }).validator((productId) => productId).handler(getReviews_createServerFn_handler, async ({ data: productId }) => {
	return (await prisma.review.findMany({
		where: { productId },
		include: { user: { select: {
			id: true,
			name: true,
			avatarUrl: true
		} } },
		orderBy: { createdAt: "desc" }
	})).map((r) => ({
		...r,
		createdAt: r.createdAt.toISOString()
	}));
});
var createReview_createServerFn_handler = createServerRpc({
	id: "632bf91abf658b2254285f9bef0ccdfb006fbd68786b9dcc83d15846db6ef26c",
	name: "createReview",
	filename: "src/server/functions/reviews.ts"
}, (opts) => createReview.__executeServer(opts));
var createReview = createServerFn({ method: "POST" }).validator((data) => data).handler(createReview_createServerFn_handler, async ({ data }) => {
	const userId = getUserIdFromCookie();
	if (!userId) throw new Error("Unauthorized: Must be logged in to review.");
	const review = await prisma.review.create({
		data: {
			productId: data.productId,
			userId,
			rating: data.rating,
			comment: data.comment
		},
		include: { user: { select: {
			id: true,
			name: true,
			avatarUrl: true
		} } }
	});
	return {
		...review,
		createdAt: review.createdAt.toISOString()
	};
});
//#endregion
export { createReview_createServerFn_handler, getReviews_createServerFn_handler };
