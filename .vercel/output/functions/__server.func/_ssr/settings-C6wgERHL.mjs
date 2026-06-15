import "../_runtime.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
import { n as object, r as string } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
import { t as bcryptjs_default } from "../_libs/bcryptjs.mjs";
import { t as getUserIdFromCookie } from "./auth-utils-hAx8t1vN.mjs";
require_jsonwebtoken();
var PasswordSchema = object({
	currentPassword: string().min(1),
	newPassword: string().min(6)
});
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set");
var updateProfile_createServerFn_handler = createServerRpc({
	id: "457662bb1a744021ed49b2bec554453c666e682396f4dfc1159d1753d5d37098",
	name: "updateProfile",
	filename: "src/server/functions/settings.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).validator((data) => data).handler(updateProfile_createServerFn_handler, async ({ data }) => {
	const userId = getUserIdFromCookie();
	if (!userId) throw new Error("Unauthorized");
	const existing = await prisma.user.findUnique({ where: { email: data.email } });
	if (existing && existing.id !== userId) throw new Error("Email is already in use by another account.");
	const updatedUser = await prisma.user.update({
		where: { id: userId },
		data: {
			name: data.name,
			email: data.email
		}
	});
	return {
		success: true,
		user: {
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email
		}
	};
});
var updatePassword_createServerFn_handler = createServerRpc({
	id: "8ee5d321fad9ffed022ad5db7a3fd369840ab704fdd4d4cde7691b92cf2ebb3f",
	name: "updatePassword",
	filename: "src/server/functions/settings.ts"
}, (opts) => updatePassword.__executeServer(opts));
var updatePassword = createServerFn({ method: "POST" }).validator((data) => {
	try {
		return PasswordSchema.parse(data);
	} catch {
		return { error: "Invalid input" };
	}
}).handler(updatePassword_createServerFn_handler, async ({ data }) => {
	const userId = getUserIdFromCookie();
	if (!userId) throw new Error("Unauthorized");
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) throw new Error("User not found");
	if (!await bcryptjs_default.compare(data.currentPassword, user.password)) throw new Error("Current password is incorrect.");
	const hashedPassword = await bcryptjs_default.hash(data.newPassword, 10);
	await prisma.user.update({
		where: { id: userId },
		data: { password: hashedPassword }
	});
	return { success: true };
});
//#endregion
export { updatePassword_createServerFn_handler, updateProfile_createServerFn_handler };
