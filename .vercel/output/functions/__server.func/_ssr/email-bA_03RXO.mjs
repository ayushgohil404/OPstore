import { o as __toESM } from "../_runtime.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { t as require_nodemailer } from "../_libs/nodemailer.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/email-bA_03RXO.js
var import_nodemailer = /* @__PURE__ */ __toESM(require_nodemailer());
var getTransporter = () => {
	return import_nodemailer.default.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});
};
var sendEmail = async ({ to, subject, html }) => {
	if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
		console.warn("Gmail API credentials not configured. Skipping email:", subject);
		return;
	}
	await getTransporter().sendMail({
		from: "\"OPStore\" <" + process.env.EMAIL_USER + ">",
		to,
		subject,
		html
	});
};
var sendWelcomeEmail = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("b04e28ea5ef2d7a4cd65e07c4a4c60a74c77e1e24fe9e73c9a42ccbe5735c314"));
var sendOtpEmail = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("bf7cf2dfc79c48c7c14908e812c8e4b9f682154bff827f12bfc83a6aa6fe28fb"));
var sendOrderConfirmationEmail = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("f433a6e23b3b791e451bddfaf5094341d9c4482b4745da519b436e4c7a4706df"));
//#endregion
export { sendWelcomeEmail as i, sendOrderConfirmationEmail as n, sendOtpEmail as r, sendEmail as t };
