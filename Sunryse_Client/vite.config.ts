import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import {sentryVitePlugin} from "@sentry/vite-plugin";

export default ({mode}) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  let viteConfiguration = {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    plugins: [react()],
    build: {
      sourcemap: true,
    },
    server: {
      port: parseInt(process.env.VITE_DEV_PORT || "3000"),
    },
  };

  if (process.env.VITE_NODE_ENV === "production") {
    const sentryPlugin = sentryVitePlugin({
      org: "Sunryse",
      project: "EHR",
      authToken: process.env.VITE_PROD_SENTRY_AUTH_TOKEN,
      telemetry: false,
    });
    viteConfiguration.plugins.push(sentryPlugin);
  }

  return defineConfig(viteConfiguration);
};
