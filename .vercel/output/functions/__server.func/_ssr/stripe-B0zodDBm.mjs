import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stripe-B0zodDBm.js
var createPaymentIntent = createServerFn({ method: "POST" }).validator((amount) => amount).handler(createSsrRpc("de52c3641a85f28ff04d6d8ebfb5acdf4b3cbfcfbaec57d40234e469c604a296"));
var stripeApi = { createPaymentIntent: async (amount) => {
	return { clientSecret: (await createPaymentIntent({ data: amount })).clientSecret || "" };
} };
//#endregion
export { stripeApi as t };
