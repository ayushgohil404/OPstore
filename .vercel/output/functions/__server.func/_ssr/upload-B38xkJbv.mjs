import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as require_cloudinary } from "../_libs/cloudinary+lodash.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload-B38xkJbv.js
var import_cloudinary = require_cloudinary();
import_cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});
var uploadImage_createServerFn_handler = createServerRpc({
	id: "59819dedcbdf25fc7a4d4a12d6684df8aa3cd8fc97d424e4f780637c172ccd14",
	name: "uploadImage",
	filename: "src/server/functions/upload.ts"
}, (opts) => uploadImage.__executeServer(opts));
var uploadImage = createServerFn({ method: "POST" }).validator((formData) => formData).handler(uploadImage_createServerFn_handler, async ({ data }) => {
	const file = data.get("file");
	if (!file) throw new Error("No file provided");
	const arrayBuffer = await file.arrayBuffer();
	const base64String = Buffer.from(arrayBuffer).toString("base64");
	const dataUri = `data:${file.type || "image/jpeg"};base64,${base64String}`;
	try {
		return { url: (await import_cloudinary.v2.uploader.upload(dataUri, { folder: "opstore_products" })).secure_url };
	} catch (error) {
		console.error("Cloudinary upload error:", error);
		throw new Error("Failed to upload image");
	}
});
//#endregion
export { uploadImage_createServerFn_handler };
