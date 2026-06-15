import { F as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as productsApi } from "./api-zWRieyl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/p._slug-CN6H_mG1.js
var $$splitComponentImporter = () => import("./p._slug-C6mQPi1i.mjs");
var Route = createFileRoute("/p/$slug")({
	loader: async ({ context, params }) => {
		const product = await context.queryClient.ensureQueryData({
			queryKey: [
				"products",
				"detail",
				params.slug
			],
			queryFn: () => productsApi.getProduct(params.slug)
		});
		if (!product) throw notFound();
		return { product };
	},
	head: ({ loaderData }) => {
		const product = loaderData?.product;
		if (!product) return {};
		return { meta: [
			{ title: `${product.name} | OPStore` },
			{
				name: "description",
				content: product.description
			},
			{
				property: "og:title",
				content: `${product.name} | OPStore`
			},
			{
				property: "og:image",
				content: product.images[0]
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
