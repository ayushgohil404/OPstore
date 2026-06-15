import { o as __toESM } from "../_runtime.mjs";
import { i as getCookie, n as createServerFn, o as setCookie$1 } from "./ssr.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
import { n as sendOrderConfirmationEmail } from "./email-bA_03RXO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-ByjiJaVw.js
var import_jsonwebtoken = /* @__PURE__ */ __toESM(require_jsonwebtoken());
var JWT_SECRET = process.env.JWT_SECRET || "secret";
var processCheckout_createServerFn_handler = createServerRpc({
	id: "60fd700990d4abc59282c535d52c29cc6b51c202bc567731d0200823912a4482",
	name: "processCheckout",
	filename: "src/server/functions/checkout.ts"
}, (opts) => processCheckout.__executeServer(opts));
var processCheckout = createServerFn({ method: "POST" }).validator((data) => data).handler(processCheckout_createServerFn_handler, async ({ data }) => {
	const cookieStr = getCookie("store_cart");
	if (!cookieStr) throw new Error("Cart is empty");
	let rawCart = [];
	try {
		rawCart = JSON.parse(cookieStr);
	} catch {
		throw new Error("Invalid cart data");
	}
	if (rawCart.length === 0) throw new Error("Cart is empty");
	const productIds = rawCart.map((i) => parseInt(i.productId, 10)).filter((id) => !isNaN(id));
	const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
	let subtotal = 0;
	const orderItems = rawCart.map((item) => {
		const p = products.find((prod) => prod.id.toString() === item.productId);
		if (!p) throw new Error(`Product ${item.productId} not found`);
		const itemTotal = p.price * item.quantity;
		subtotal += itemTotal;
		return {
			productId: p.id,
			title: p.title,
			price: p.price,
			quantity: item.quantity
		};
	});
	const totalAmount = subtotal + (subtotal > 150 ? 0 : 15);
	const token = getCookie("auth_token");
	let userId = null;
	if (token) try {
		userId = import_jsonwebtoken.default.verify(token, JWT_SECRET).id;
	} catch (e) {}
	const customerName = `${data.firstName} ${data.lastName}`.trim();
	const fullAddress = `${data.address}, ${data.city}, ${data.zipCode}`;
	const orderIdStr = `#OP-${(await prisma.order.create({ data: {
		userId,
		customerName,
		phone: "N/A",
		address: fullAddress,
		totalAmount,
		paymentMethod: data.paymentMethod,
		paymentStatus: "COMPLETED",
		status: "PROCESSING",
		items: JSON.stringify(orderItems)
	} })).id.toString().padStart(4, "0")}`;
	sendOrderConfirmationEmail({ data: {
		email: data.email,
		orderId: orderIdStr,
		total: totalAmount
	} }).catch(console.error);
	setCookie$1("store_cart", "[]", {
		path: "/",
		httpOnly: true
	});
	return {
		success: true,
		orderId: orderIdStr
	};
});
//#endregion
export { processCheckout_createServerFn_handler };
