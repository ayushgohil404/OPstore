import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as productsApi } from "./api-DYwpfXbe.mjs";
import { t as RouteLoading } from "./RouteLoading-BtaRoUc0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/c._category-C8YJ7Hoj.js
var $$splitComponentImporter = () => import("./c._category-D9b_lPAZ.mjs");
var $$splitErrorComponentImporter = () => import("./c._category-Cao3N4eO.mjs");
var Route = createFileRoute("/c/$category")({
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	pendingComponent: RouteLoading,
	head: ({ params }) => {
		const title = params.category.charAt(0).toUpperCase() + params.category.slice(1);
		return { meta: [{ title: `${title} | OPStore` }, {
			name: "description",
			content: `Discover our latest ${title} collection. Premium quality, modern aesthetic.`
		}] };
	},
	loader: ({ context, params }) => {
		context.queryClient.ensureQueryData({
			queryKey: [
				"products",
				"category",
				params.category
			],
			queryFn: () => productsApi.listProducts({ categoryId: params.category })
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
