import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { a as useQueryClient, o as require_jsx_runtime, r as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as settingsApi, t as authApi } from "./api-DYwpfXbe.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-sbLI9m8P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountSettings() {
	const queryClient = useQueryClient();
	const { data: user } = useQuery({
		queryKey: ["auth-user"],
		queryFn: () => authApi.getCurrentUser()
	});
	const [profileData, setProfileData] = (0, import_react.useState)({
		name: "",
		email: ""
	});
	(0, import_react.useEffect)(() => {
		if (user) setProfileData({
			name: user.firstName || "",
			email: user.email || ""
		});
	}, [user]);
	const [passwordData, setPasswordData] = (0, import_react.useState)({
		current: "",
		new: "",
		confirm: ""
	});
	const profileMutation = useMutation({
		mutationFn: () => settingsApi.updateProfile({
			name: profileData.name,
			email: profileData.email
		}),
		onSuccess: (data) => {
			queryClient.setQueryData(["auth-user"], data.user);
			toast.success("Profile updated successfully.");
		},
		onError: (err) => {
			toast.error(err.message || "Failed to update profile.");
		}
	});
	const passwordMutation = useMutation({
		mutationFn: () => settingsApi.updatePassword({
			currentPassword: passwordData.current,
			newPassword: passwordData.new
		}),
		onSuccess: () => {
			setPasswordData({
				current: "",
				new: "",
				confirm: ""
			});
			toast.success("Password updated successfully.");
		},
		onError: (err) => {
			toast.error(err.message || "Failed to update password.");
		}
	});
	const handleSaveProfile = (e) => {
		e.preventDefault();
		if (!profileData.name || !profileData.email) return toast.error("Name and email are required.");
		profileMutation.mutate();
	};
	const handleUpdatePassword = () => {
		if (!passwordData.current || !passwordData.new || !passwordData.confirm) return toast.error("All password fields are required.");
		if (passwordData.new !== passwordData.confirm) return toast.error("New passwords do not match.");
		if (passwordData.new.length < 6) return toast.error("New password must be at least 6 characters.");
		passwordMutation.mutate();
	};
	const handleSavePreferences = (e) => {
		e.preventDefault();
		toast.success("Preferences saved successfully.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 md:p-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 pb-6 border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Account Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-1",
				children: "Manage your profile, password, and preferences."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl space-y-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSaveProfile,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold mb-4",
							children: "Profile Information"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-foreground",
										children: "Full Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: profileData.name,
										onChange: (e) => setProfileData({
											...profileData,
											name: e.target.value
										}),
										className: "w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-foreground",
										children: "Email Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: profileData.email,
										onChange: (e) => setProfileData({
											...profileData,
											email: e.target.value
										}),
										className: "w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: profileMutation.isPending,
							className: "mt-4 text-sm font-medium bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
							children: profileMutation.isPending ? "Saving..." : "Save Profile"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-8 border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold mb-4",
							children: "Change Password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-foreground",
										children: "Current Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										value: passwordData.current,
										onChange: (e) => setPasswordData({
											...passwordData,
											current: e.target.value
										}),
										placeholder: "••••••••",
										className: "w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-foreground",
										children: "New Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										value: passwordData.new,
										onChange: (e) => setPasswordData({
											...passwordData,
											new: e.target.value
										}),
										placeholder: "••••••••",
										className: "w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-foreground",
										children: "Confirm New Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										value: passwordData.confirm,
										onChange: (e) => setPasswordData({
											...passwordData,
											confirm: e.target.value
										}),
										placeholder: "••••••••",
										className: "w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleUpdatePassword,
							disabled: passwordMutation.isPending,
							className: "mt-4 text-sm font-medium border border-border bg-background px-6 py-2.5 rounded-lg hover:bg-secondary transition-colors disabled:opacity-50",
							children: passwordMutation.isPending ? "Updating..." : "Update Password"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSavePreferences,
					className: "pt-8 border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold mb-4",
							children: "Notification Preferences"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											defaultChecked: true,
											className: "w-4 h-4 text-primary focus:ring-primary border-border rounded bg-background accent-primary"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: "Order Updates"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Receive emails about your order status, shipping, and delivery."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											defaultChecked: true,
											className: "w-4 h-4 text-primary focus:ring-primary border-border rounded bg-background accent-primary"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: "Exclusive Offers"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Get early access to sales, new drops, and personalized recommendations."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: "w-4 h-4 text-primary focus:ring-primary border-border rounded bg-background accent-primary"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: "SMS Notifications"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Receive text messages for delivery updates."
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "mt-6 bg-secondary text-foreground border border-border px-8 py-2.5 rounded-xl font-medium hover:bg-secondary/80 transition-colors",
							children: "Save Preferences"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-8 border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold text-destructive mb-4",
							children: "Danger Zone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mb-4",
							children: "Once you delete your account, there is no going back. Please be certain."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toast.error("This action is disabled for demo accounts."),
							className: "text-sm font-medium border border-destructive text-destructive hover:bg-destructive/10 px-4 py-2 rounded-lg transition-colors",
							children: "Delete Account"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { AccountSettings as component };
