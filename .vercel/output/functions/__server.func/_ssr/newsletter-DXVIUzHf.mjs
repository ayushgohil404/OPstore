import { n as createServerFn } from "./ssr.mjs";
import { n as object, r as string } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/newsletter-DXVIUzHf.js
var NewsletterSchema = object({ email: string().email() });
var subscribeNewsletter_createServerFn_handler = createServerRpc({
	id: "e186aef83854d2461595c56ee64d3d818c971ea4f51906aee2b27faf50689a4b",
	name: "subscribeNewsletter",
	filename: "src/server/functions/newsletter.ts"
}, (opts) => subscribeNewsletter.__executeServer(opts));
var subscribeNewsletter = createServerFn({ method: "POST" }).validator((data) => data).handler(subscribeNewsletter_createServerFn_handler, async ({ data }) => {
	let email;
	try {
		email = NewsletterSchema.parse(data).email;
	} catch {
		return {
			success: false,
			message: "Invalid email address"
		};
	}
	if (await prisma.newsletter.findUnique({ where: { email } })) return {
		success: false,
		message: "Already subscribed"
	};
	await prisma.newsletter.create({ data: { email } });
	return {
		success: true,
		message: "Subscribed successfully"
	};
});
//#endregion
export { subscribeNewsletter_createServerFn_handler };
