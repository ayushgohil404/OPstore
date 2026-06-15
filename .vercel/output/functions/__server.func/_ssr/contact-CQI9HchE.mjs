import { n as createServerFn } from "./ssr.mjs";
import { n as object, r as string } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as sendEmail } from "./email-bA_03RXO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CQI9HchE.js
var ContactSchema = object({
	name: string().min(1),
	email: string().email(),
	subject: string().min(1),
	message: string().min(10).max(2e3)
});
function escapeHtml(str) {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
var submitContactForm_createServerFn_handler = createServerRpc({
	id: "dec191a17f0127c685c5149756dea0a6e622779ff3974a504030a5a669bc95af",
	name: "submitContactForm",
	filename: "src/server/functions/contact.ts"
}, (opts) => submitContactForm.__executeServer(opts));
var submitContactForm = createServerFn({ method: "POST" }).validator((data) => {
	try {
		return ContactSchema.parse(data);
	} catch {
		return { error: "Invalid input" };
	}
}).handler(submitContactForm_createServerFn_handler, async ({ data }) => {
	try {
		await sendEmail({
			to: "support@opstore.com",
			subject: `New Contact Form Submission: ${data.subject}`,
			html: `
          <h2>New message from ${data.name} (${data.email})</h2>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <hr/>
          <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
        `
		});
		return { success: true };
	} catch (e) {
		console.error("Contact form email failed:", e);
		return { success: true };
	}
});
//#endregion
export { submitContactForm_createServerFn_handler };
