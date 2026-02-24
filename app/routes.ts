import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/landing.tsx"),
    route("/admin", "routes/admin.tsx"),
] satisfies RouteConfig;