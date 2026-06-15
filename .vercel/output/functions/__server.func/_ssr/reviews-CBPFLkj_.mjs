import "../_runtime.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
import { n as object, r as string, t as number } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
import { t as getUserIdFromCookie } from "./auth-utils-hAx8t1vN.mjs";
require_jsonwebtoken();
var ReviewSchema = object({
	productId: number().int(),
	rating: number().int().min(1).max(5),
	comment: string().min(1).max(1e3)
});
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set");
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
var createReview = createServerFn({ method: "POST" }).validator((data) => {
	try {
		return ReviewSchema.parse(data);
	} catch {
		return { error: "Invalid input" };
	}
}).handler(createReview_createServerFn_handler, async ({ data }) => {
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
