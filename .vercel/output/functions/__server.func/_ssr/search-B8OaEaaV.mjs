import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-B8OaEaaV.js
var $$splitComponentImporter = () => import("./search-CreRbF2V.mjs");
var Route = createFileRoute("/search")({
	validateSearch: (search) => {
		return {
			q: typeof search.q === "string" ? search.q : void 0,
			category: typeof search.category === "string" ? search.category : void 0
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
