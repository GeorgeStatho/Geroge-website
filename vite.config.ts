import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const token = (env.VITE_GITHUB_TOKEN ?? "").trim().replace(/;$/, "");

    return {
        server: {
            proxy: {
                "/api/github/graphql": {
                    target: "https://api.github.com",
                    changeOrigin: true,
                    rewrite: () => "/graphql",
                    secure: true,
                    proxyTimeout: 15000,
                    configure(proxy) {
                        proxy.on("proxyReq", (_proxyReq, req) => {
                            console.log(
                                `[vite-proxy] ${req.method ?? "GET"} ${req.url ?? "/api/github/graphql"} -> https://api.github.com/graphql`
                            );
                        });

                        proxy.on("proxyRes", (proxyRes, req) => {
                            console.log(
                                `[vite-proxy] upstream responded ${proxyRes.statusCode ?? "unknown"} for ${req.method ?? "GET"} ${req.url ?? "/api/github/graphql"}`
                            );
                        });

                        proxy.on("error", (error, req) => {
                            const message = error instanceof Error ? error.message : String(error);
                            console.error(
                                `[vite-proxy] upstream error for ${req.method ?? "GET"} ${req.url ?? "/api/github/graphql"}: ${message}`
                            );
                        });
                    },
                    headers: token
                        ? {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/vnd.github+json",
                            "User-Agent": "Geroge-website-dev",
                            "X-GitHub-Api-Version": "2022-11-28",
                        }
                        : undefined,
                },
            },
        },
    };
});
