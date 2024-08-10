import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import monkey, { cdn } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: "src/main.tsx",
      userscript: {
        name: "Better Bookwalker",
        icon: "https://vitejs.dev/logo.svg",
        namespace: "https://github.com/MarvNC",
        match: ["https://*.bookwalker.jp/*"],
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr("React", "umd/react.production.min.js"),
          "react-dom": cdn.jsdelivr(
            "ReactDOM",
            "umd/react-dom.production.min.js",
          ),
        },
      },
    }),
  ],
});
