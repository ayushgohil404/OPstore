import "../_runtime.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import "./inventory-cart-BWS8qGVK.mjs";
import { a as listProducts, i as getProduct, n as getFeatured, t as createProduct } from "./products-BtALL_Ne.mjs";
import "./orders-Dvl6-FEu.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
import "./wishlist-CybqrJAO.mjs";
import "./stripe-B0zodDBm.mjs";
import { n as object, r as string, t as number } from "../_libs/zod.mjs";
require_jsonwebtoken();
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
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set");
var login = createServerFn({ method: "POST" }).validator((data) => {
	try {
		return LoginSchema.parse(data);
	} catch {
		return { error: "Invalid input" };
	}
}).handler(createSsrRpc("c66295356ee1bed9dcd6acc6996417714105d1c255d6dc117cb348c4624a9cfa"));
var register = createServerFn({ method: "POST" }).validator((data) => {
	try {
		return RegisterSchema.parse(data);
	} catch {
		return { error: "Invalid input" };
	}
}).handler(createSsrRpc("90c0569f8b22ccf890bd2d7f48cf7357d79e9dc19f53a36f84a9d9e02c742da3"));
var verifyRegistration = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("d29a005c860c714dec6c5bd484b506e260c9de537d30c90f3c57ba86a74c4616"));
var forgotPasswordStep1 = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("e115dfa96332c62252ce32bd9e95e2485d456ec1fcfcfdebaf7cbb177eb94505"));
var resetPassword = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("d60d9929a45a03358828443d0c65048100e702d698952d29ef6b8e311f48fd6a"));
var getGoogleAuthUrl = createServerFn({ method: "GET" }).handler(createSsrRpc("e70b0a25bcfa6b3ff6264b88442e709990ed486a5773d88ff9d9850b3c49302c"));
var loginWithGoogle = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("6baab00c3c53ba591670028b68e38dbf591ae6338ec670d2e8bcea794780a3cd"));
var logout = createServerFn({ method: "POST" }).handler(createSsrRpc("29fdd7534a8fc4cc73a2fc0e6a37abee71570be1256a0cd8b872f6c5140c326e"));
var getCurrentUser = createServerFn({ method: "GET" }).handler(createSsrRpc("04cab093470b32062d3dc577fbb85096ba73e976b4b9baf559bccf5d7ac33553"));
var productsApi = {
	listProducts: async (filters) => {
		return await listProducts({ data: filters || {} });
	},
	getProduct: async (slug) => {
		const data = await getProduct({ data: slug });
		return data ? data : null;
	},
	getFeatured: async () => {
		return await getFeatured();
	},
	createProduct: async (data) => {
		return await createProduct({ data });
	}
};
var authApi = {
	login: async (credentials) => {
		return await login({ data: credentials });
	},
	register: async (data) => {
		return await register({ data });
	},
	verifyRegistration: async (data) => {
		return await verifyRegistration({ data });
	},
	forgotPasswordStep1: async (email) => {
		return await forgotPasswordStep1({ data: { email } });
	},
	resetPassword: async (data) => {
		return await resetPassword({ data });
	},
	loginWithOAuth: async (provider) => {
		if (provider === "google") {
			const { url } = await getGoogleAuthUrl();
			window.location.href = url;
		}
	},
	loginWithGoogle: async (data) => {
		return await loginWithGoogle({ data });
	},
	getCurrentUser: async () => {
		const user = await getCurrentUser();
		return user ? user : null;
	},
	logout: async () => {
		await logout();
	}
};
var ReviewSchema = object({
	productId: number().int(),
	rating: number().int().min(1).max(5),
	comment: string().min(1).max(1e3)
});
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set");
var getReviews = createServerFn({ method: "GET" }).validator((productId) => productId).handler(createSsrRpc("55fa4b34afc759b8dbb5caeba482c36bac96e301899dccd9a952042c0affbb17"));
var createReview = createServerFn({ method: "POST" }).validator((data) => {
	try {
		return ReviewSchema.parse(data);
	} catch {
		return { error: "Invalid input" };
	}
}).handler(createSsrRpc("632bf91abf658b2254285f9bef0ccdfb006fbd68786b9dcc83d15846db6ef26c"));
var reviewsApi = {
	getReviews: async (productId) => {
		return await getReviews({ data: productId });
	},
	createReview: async (data) => {
		return await createReview({ data });
	}
};
var PasswordSchema = object({
	currentPassword: string().min(1),
	newPassword: string().min(6)
});
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set");
var updateProfile = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("457662bb1a744021ed49b2bec554453c666e682396f4dfc1159d1753d5d37098"));
var updatePassword = createServerFn({ method: "POST" }).validator((data) => {
	try {
		return PasswordSchema.parse(data);
	} catch {
		return { error: "Invalid input" };
	}
}).handler(createSsrRpc("8ee5d321fad9ffed022ad5db7a3fd369840ab704fdd4d4cde7691b92cf2ebb3f"));
var settingsApi = {
	updateProfile: async (data) => {
		return await updateProfile({ data });
	},
	updatePassword: async (data) => {
		return await updatePassword({ data });
	}
};
//#endregion
export { settingsApi as a, reviewsApi as i, getCurrentUser as n, productsApi as r, authApi as t };
