import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as Stripe } from "../_libs/stripe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stripe-TATatDpP.js
var stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
var stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" }) : null;
var createPaymentIntent_createServerFn_handler = createServerRpc({
	id: "de52c3641a85f28ff04d6d8ebfb5acdf4b3cbfcfbaec57d40234e469c604a296",
	name: "createPaymentIntent",
	filename: "src/server/functions/stripe.ts"
}, (opts) => createPaymentIntent.__executeServer(opts));
var createPaymentIntent = createServerFn({ method: "POST" }).validator((amount) => amount).handler(createPaymentIntent_createServerFn_handler, async ({ data: amount }) => {
	if (!stripe) throw new Error("Stripe is not configured. Please add STRIPE_SECRET_KEY to your .env file.");
	try {
		return { clientSecret: (await stripe.paymentIntents.create({
			amount: Math.round(amount * 100),
			currency: "usd",
			automatic_payment_methods: { enabled: true }
		})).client_secret };
	} catch (error) {
		throw new Error(`Stripe Error: ${error.message}`);
	}
});
//#endregion
export { createPaymentIntent_createServerFn_handler };
