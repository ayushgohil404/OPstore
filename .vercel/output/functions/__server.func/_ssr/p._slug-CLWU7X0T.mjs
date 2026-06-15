import { F as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as productsApi } from "./api-Cjn8KwVa.mjs";
import { t as RouteLoading } from "./RouteLoading-BtaRoUc0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/p._slug-CLWU7X0T.js
var $$splitComponentImporter = () => import("./p._slug-AN1isP_N.mjs");
var $$splitErrorComponentImporter = () => import("./p._slug-Iae8ZW92.mjs");
var Route = createFileRoute("/p/$slug")({
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	pendingComponent: RouteLoading,
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
