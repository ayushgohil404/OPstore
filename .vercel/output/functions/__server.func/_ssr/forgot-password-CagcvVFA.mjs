import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { H as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as authApi } from "./api-Cjn8KwVa.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-CagcvVFA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPassword() {
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(1);
	const [email, setEmail] = (0, import_react.useState)("");
	const [otp, setOtp] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const handleStep1Submit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const formEmail = new FormData(e.target).get("email");
		try {
			await authApi.forgotPasswordStep1(formEmail);
			setEmail(formEmail);
			setStep(2);
			toast.success("If an account exists, an OTP was sent to " + formEmail);
		} catch (error) {
			toast.error(error.message || "Failed to send OTP");
		} finally {
			setIsLoading(false);
		}
	};
	const handleStep2Submit = async (e) => {
		e.preventDefault();
		setOtp(new FormData(e.target).get("otp"));
		setStep(3);
	};
	const handleStep3Submit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const formData = new FormData(e.target);
		const password = formData.get("password");
		if (password !== formData.get("confirmPassword")) {
			toast.error("Passwords do not match");
			setIsLoading(false);
			return;
		}
		try {
			await authApi.resetPassword({
				email,
				otp,
				password
			});
			toast.success("Password reset successfully. Please sign in.");
			navigate({ to: "/login" });
		} catch (error) {
			toast.error(error.message || "Failed to reset password. OTP may be invalid.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md w-full space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-3xl font-bold tracking-tight text-foreground",
						children: [
							step === 1 && "Reset Password",
							step === 2 && "Enter Security Code",
							step === 3 && "Create New Password"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted-foreground",
						children: [
							step === 1 && "Enter your email address and we will send you a 6-digit code to reset your password.",
							step === 2 && `Enter the 6-digit code we sent to ${email}`,
							step === 3 && "Choose a strong new password for your account."
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-6",
						onSubmit: step === 1 ? handleStep1Submit : step === 2 ? handleStep2Submit : handleStep3Submit,
						children: [
							step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "email",
									name: "email",
									type: "email",
									required: true,
									placeholder: " ",
									className: "block w-full px-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all peer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "email",
									className: "absolute left-4 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs",
									children: "Email address"
								})]
							}),
							step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative group",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "otp",
										name: "otp",
										type: "text",
										required: true,
										maxLength: 6,
										placeholder: " ",
										className: "block w-full px-4 py-4 text-center text-2xl tracking-[1em] font-mono border border-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all peer"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setStep(1),
									className: "text-sm text-primary hover:underline",
									children: "Use a different email"
								})]
							}),
							step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "password",
										name: "password",
										type: "password",
										required: true,
										placeholder: " ",
										className: "block w-full px-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all peer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "password",
										className: "absolute left-4 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs",
										children: "New Password"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "confirmPassword",
										name: "confirmPassword",
										type: "password",
										required: true,
										placeholder: " ",
										className: "block w-full px-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all peer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "confirmPassword",
										className: "absolute left-4 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs",
										children: "Confirm Password"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: isLoading,
								className: "group relative w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed",
								children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									step === 1 && "Send Code",
									step === 2 && "Verify Code",
									step === 3 && "Reset Password",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "absolute right-6 h-5 w-5 text-primary-foreground group-hover:translate-x-1 transition-transform" })
								] })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-sm font-medium text-primary hover:text-primary/80 transition-colors",
							children: "Back to sign in"
						})
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden lg:flex w-1/2 relative bg-zinc-900 border-l border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
					alt: "Fashion models",
					className: "absolute inset-0 w-full h-full object-cover opacity-80"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-12 right-12 z-20 max-w-md text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-3xl font-bold tracking-tighter text-white mb-6 block",
						children: "OPStore"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-zinc-300",
						children: "Forgot your password? No worries. Securely reset it and get back to shopping the latest drops."
					})]
				})
			]
		})]
	});
}
//#endregion
export { ForgotPassword as component };
