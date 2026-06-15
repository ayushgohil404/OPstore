import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { t as Route } from "./_slug-BIJoiD1a.mjs";
import { R as Calendar, V as ArrowLeft, n as User } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-4Z6WMRwi.js
var import_jsx_runtime = require_jsx_runtime();
function JournalArticlePage() {
	const { slug } = Route.useParams();
	const article = {
		title: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
		category: "Style Guide",
		date: "Sep 15, 2026",
		author: "Elena Rodriguez",
		image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
		content: `
      <p>The concept of a minimalist wardrobe isn't just about owning fewer clothes; it's about owning the right clothes. Pieces that interlock effortlessly, offering maximum versatility with minimal decision fatigue.</p>
      
      <h2>1. The Perfect White Tee</h2>
      <p>It sounds cliché, but the foundation of any wardrobe is a high-quality white t-shirt. Look for mid-weight cotton that drapes elegantly without clinging. It's the ultimate chameleon—wear it under a blazer for a smart-casual office look, or pair it with vintage denim for a weekend coffee run.</p>
      
      <h2>2. Tailored Trousers</h2>
      <p>A pair of perfectly tailored trousers in navy, black, or charcoal can take you anywhere. The modern silhouette leans slightly relaxed with a mid-to-high rise. They should feel as comfortable as sweatpants but look sharp enough for a boardroom.</p>

      <h2>3. The Unstructured Blazer</h2>
      <p>Gone are the days of stiff, padded shoulders. An unstructured blazer in a textured fabric like wool-hopsack or heavy linen adds instant polish to any outfit without feeling stuffy.</p>
      
      <h2>4. Classic Denim</h2>
      <p>One pair of well-fitting jeans in a medium or dark wash. Skip the heavy distressing. You want a pair that fades naturally over time, telling the story of the places you've been.</p>
      
      <h2>5. The Versatile Loafer</h2>
      <p>Sneakers are great, but a classic leather loafer bridges the gap between casual and formal perfectly. They slip on effortlessly and instantly elevate even the simplest t-shirt and jeans combination.</p>

      <br/>
      <p><em>Remember, building a wardrobe takes time. Don't rush to buy everything at once. Invest in quality over quantity, and let your personal style evolve naturally.</em></p>
    `
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-[60vh] min-h-[400px] w-full flex items-end justify-center pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: article.image,
					alt: article.title,
					className: "w-full h-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 container mx-auto px-4 max-w-4xl text-center text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/journal",
						className: "inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), " Back to Journal"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full",
							children: article.category
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl md:text-6xl font-bold tracking-tight mb-6",
						children: article.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-6 text-sm text-white/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4" }),
								" ",
								article.date
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4" }),
								" ",
								article.author
							]
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4 mt-16 max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-2xl",
				dangerouslySetInnerHTML: { __html: article.content }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 pt-8 border-t border-border flex flex-col md:flex-row gap-8 items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-xl",
						children: article.author.charAt(0)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold",
						children: article.author
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Editor in Chief"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium transition-colors",
						children: "Share on Twitter"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium transition-colors",
						children: "Share on Facebook"
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { JournalArticlePage as component };
