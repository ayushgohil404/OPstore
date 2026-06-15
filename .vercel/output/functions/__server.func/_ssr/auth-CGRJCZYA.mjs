import { o as __toESM } from "../_runtime.mjs";
import { i as getCookie, n as createServerFn, o as setCookie$1, r as deleteCookie$1 } from "./ssr.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
import { n as object, r as string } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as prisma } from "./db-DdnRbRDq.mjs";
import { i as sendWelcomeEmail, r as sendOtpEmail } from "./email-bA_03RXO.mjs";
import { t as bcryptjs_default } from "../_libs/bcryptjs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CGRJCZYA.js
var import_jsonwebtoken = /* @__PURE__ */ __toESM(require_jsonwebtoken());
var RegisterSchema = object({
	email: string().email(),
	password: string().min(6, "Password must be at least 6 characters"),
	firstName: string().min(1),
	lastName: string().min(1)
});
var LoginSchema = object({
	email: string().email(),
	password: string().min(1)
});
var JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set");
var generateOtp = () => Math.floor(1e5 + Math.random() * 9e5).toString();
var getOtpExpiry = () => new Date(Date.now() + 900 * 1e3);
var login_createServerFn_handler = createServerRpc({
	id: "c66295356ee1bed9dcd6acc6996417714105d1c255d6dc117cb348c4624a9cfa",
	name: "login",
	filename: "src/server/functions/auth.ts"
}, (opts) => login.__executeServer(opts));
var login = createServerFn({ method: "POST" }).validator((data) => {
	try {
		return LoginSchema.parse(data);
	} catch {
		return { error: "Invalid input" };
	}
}).handler(login_createServerFn_handler, async ({ data }) => {
	const { email, password } = data;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) throw new Error("Invalid email or password");
	if (user.authProvider === "GOOGLE") throw new Error("This account uses Google Sign-In. Please use Google to log in.");
	if (!user.isVerified) throw new Error("Account not verified. Please complete registration.");
	if (!await bcryptjs_default.compare(password, user.password)) throw new Error("Invalid email or password");
	setCookie$1("auth_token", import_jsonwebtoken.default.sign({
		id: user.id,
		email: user.email,
		role: user.role
	}, JWT_SECRET, { expiresIn: "7d" }), {
		httpOnly: true,
		secure: true,
		path: "/",
		maxAge: 3600 * 24 * 7
	});
	return {
		id: user.id,
		email: user.email,
		firstName: user.name,
		lastName: "",
		role: user.role
	};
});
var register_createServerFn_handler = createServerRpc({
	id: "90c0569f8b22ccf890bd2d7f48cf7357d79e9dc19f53a36f84a9d9e02c742da3",
	name: "register",
	filename: "src/server/functions/auth.ts"
}, (opts) => register.__executeServer(opts));
var register = createServerFn({ method: "POST" }).validator((data) => {
	try {
		return RegisterSchema.parse(data);
	} catch {
		return { error: "Invalid input" };
	}
}).handler(register_createServerFn_handler, async ({ data }) => {
	const { email, password, firstName, lastName } = data;
	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) {
		if (existing.authProvider === "GOOGLE") throw new Error("This email is already registered via Google.");
		if (existing.isVerified) throw new Error("Email already registered.");
		const otp = generateOtp();
		await prisma.user.update({
			where: { id: existing.id },
			data: {
				verifyOtp: otp,
				verifyOtpExpiry: getOtpExpiry(),
				password: await bcryptjs_default.hash(password, 10)
			}
		});
		const emailResult = await sendOtpEmail({ data: {
			email,
			otp,
			type: "verify"
		} });
		if (!emailResult.success) throw new Error(`Email could not be sent: ${emailResult.error}. Please check your EMAIL_USER and EMAIL_PASS (App Password) environment variables.`);
		return { requireOtp: true };
	}
	const hashedPassword = await bcryptjs_default.hash(password, 10);
	const name = `${firstName || ""} ${lastName || ""}`.trim() || "New User";
	const otp = generateOtp();
	await prisma.user.create({ data: {
		email,
		password: hashedPassword,
		name,
		authProvider: "EMAIL",
		isVerified: false,
		verifyOtp: otp,
		verifyOtpExpiry: getOtpExpiry()
	} });
	const emailResult = await sendOtpEmail({ data: {
		email,
		otp,
		type: "verify"
	} });
	if (!emailResult.success) throw new Error(`Email could not be sent: ${emailResult.error}. Please check your EMAIL_USER and EMAIL_PASS (App Password) environment variables.`);
	return { requireOtp: true };
});
var verifyRegistration_createServerFn_handler = createServerRpc({
	id: "d29a005c860c714dec6c5bd484b506e260c9de537d30c90f3c57ba86a74c4616",
	name: "verifyRegistration",
	filename: "src/server/functions/auth.ts"
}, (opts) => verifyRegistration.__executeServer(opts));
var verifyRegistration = createServerFn({ method: "POST" }).validator((data) => data).handler(verifyRegistration_createServerFn_handler, async ({ data }) => {
	const { email, otp } = data;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) throw new Error("User not found");
	if (user.isVerified) throw new Error("User is already verified");
	if (user.verifyOtp !== otp) throw new Error("Invalid OTP");
	if (!user.verifyOtpExpiry || user.verifyOtpExpiry < /* @__PURE__ */ new Date()) throw new Error("OTP has expired");
	const updatedUser = await prisma.user.update({
		where: { id: user.id },
		data: {
			isVerified: true,
			verifyOtp: null,
			verifyOtpExpiry: null
		}
	});
	setCookie$1("auth_token", import_jsonwebtoken.default.sign({
		id: updatedUser.id,
		email: updatedUser.email,
		role: updatedUser.role
	}, JWT_SECRET, { expiresIn: "7d" }), {
		httpOnly: true,
		secure: true,
		path: "/",
		maxAge: 3600 * 24 * 7
	});
	sendWelcomeEmail({ data: {
		email: updatedUser.email,
		firstName: updatedUser.name.split(" ")[0]
	} }).catch(console.error);
	return {
		id: updatedUser.id,
		email: updatedUser.email,
		firstName: updatedUser.name,
		lastName: "",
		role: updatedUser.role
	};
});
var forgotPasswordStep1_createServerFn_handler = createServerRpc({
	id: "e115dfa96332c62252ce32bd9e95e2485d456ec1fcfcfdebaf7cbb177eb94505",
	name: "forgotPasswordStep1",
	filename: "src/server/functions/auth.ts"
}, (opts) => forgotPasswordStep1.__executeServer(opts));
var forgotPasswordStep1 = createServerFn({ method: "POST" }).validator((data) => data).handler(forgotPasswordStep1_createServerFn_handler, async ({ data }) => {
	const { email } = data;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) return { success: true };
	if (user.authProvider === "GOOGLE") throw new Error("This account uses Google Sign-In. Please reset your password via Google.");
	const otp = generateOtp();
	await prisma.user.update({
		where: { id: user.id },
		data: {
			resetOtp: otp,
			resetOtpExpiry: getOtpExpiry()
		}
	});
	await sendOtpEmail({ data: {
		email,
		otp,
		type: "reset"
	} });
	return { success: true };
});
var resetPassword_createServerFn_handler = createServerRpc({
	id: "d60d9929a45a03358828443d0c65048100e702d698952d29ef6b8e311f48fd6a",
	name: "resetPassword",
	filename: "src/server/functions/auth.ts"
}, (opts) => resetPassword.__executeServer(opts));
var resetPassword = createServerFn({ method: "POST" }).validator((data) => data).handler(resetPassword_createServerFn_handler, async ({ data }) => {
	const { email, otp, password } = data;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) throw new Error("Invalid request");
	if (user.resetOtp !== otp) throw new Error("Invalid OTP");
	if (!user.resetOtpExpiry || user.resetOtpExpiry < /* @__PURE__ */ new Date()) throw new Error("OTP has expired");
	const hashedPassword = await bcryptjs_default.hash(password, 10);
	await prisma.user.update({
		where: { id: user.id },
		data: {
			password: hashedPassword,
			resetOtp: null,
			resetOtpExpiry: null
		}
	});
	return { success: true };
});
var getGoogleAuthUrl_createServerFn_handler = createServerRpc({
	id: "e70b0a25bcfa6b3ff6264b88442e709990ed486a5773d88ff9d9850b3c49302c",
	name: "getGoogleAuthUrl",
	filename: "src/server/functions/auth.ts"
}, (opts) => getGoogleAuthUrl.__executeServer(opts));
var getGoogleAuthUrl = createServerFn({ method: "GET" }).handler(getGoogleAuthUrl_createServerFn_handler, async () => {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	if (!clientId) throw new Error("Google OAuth is not configured on the server.");
	return { url: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/auth/google/callback"}&response_type=code&scope=email profile` };
});
var loginWithGoogle_createServerFn_handler = createServerRpc({
	id: "6baab00c3c53ba591670028b68e38dbf591ae6338ec670d2e8bcea794780a3cd",
	name: "loginWithGoogle",
	filename: "src/server/functions/auth.ts"
}, (opts) => loginWithGoogle.__executeServer(opts));
var loginWithGoogle = createServerFn({ method: "POST" }).validator((data) => data).handler(loginWithGoogle_createServerFn_handler, async ({ data }) => {
	const { email, name } = data;
	let user = await prisma.user.findUnique({ where: { email } });
	if (user) {
		if (user.authProvider !== "GOOGLE") user = await prisma.user.update({
			where: { id: user.id },
			data: {
				authProvider: "GOOGLE",
				isVerified: true
			}
		});
	} else {
		user = await prisma.user.create({ data: {
			email,
			name,
			password: "OAUTH_USER",
			authProvider: "GOOGLE",
			isVerified: true
		} });
		sendWelcomeEmail({ data: {
			email: user.email,
			firstName: name.split(" ")[0]
		} }).catch(console.error);
	}
	setCookie$1("auth_token", import_jsonwebtoken.default.sign({
		id: user.id,
		email: user.email,
		role: user.role
	}, JWT_SECRET, { expiresIn: "7d" }), {
		httpOnly: true,
		secure: true,
		path: "/",
		maxAge: 3600 * 24 * 7
	});
	return { success: true };
});
var logout_createServerFn_handler = createServerRpc({
	id: "29fdd7534a8fc4cc73a2fc0e6a37abee71570be1256a0cd8b872f6c5140c326e",
	name: "logout",
	filename: "src/server/functions/auth.ts"
}, (opts) => logout.__executeServer(opts));
var logout = createServerFn({ method: "POST" }).handler(logout_createServerFn_handler, async () => {
	deleteCookie$1("auth_token", { path: "/" });
	return { success: true };
});
var getCurrentUser_createServerFn_handler = createServerRpc({
	id: "04cab093470b32062d3dc577fbb85096ba73e976b4b9baf559bccf5d7ac33553",
	name: "getCurrentUser",
	filename: "src/server/functions/auth.ts"
}, (opts) => getCurrentUser.__executeServer(opts));
var getCurrentUser = createServerFn({ method: "GET" }).handler(getCurrentUser_createServerFn_handler, async () => {
	const token = getCookie("auth_token");
	if (!token) return null;
	try {
		const decoded = import_jsonwebtoken.default.verify(token, JWT_SECRET);
		const user = await prisma.user.findUnique({ where: { id: decoded.id } });
		if (!user) return null;
		return {
			id: user.id,
			email: user.email,
			firstName: user.name,
			lastName: "",
			role: user.role
		};
	} catch (e) {
		return null;
	}
});
//#endregion
export { forgotPasswordStep1_createServerFn_handler, getCurrentUser_createServerFn_handler, getGoogleAuthUrl_createServerFn_handler, loginWithGoogle_createServerFn_handler, login_createServerFn_handler, logout_createServerFn_handler, register_createServerFn_handler, resetPassword_createServerFn_handler, verifyRegistration_createServerFn_handler };
