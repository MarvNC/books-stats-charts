import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import monkey, { cdn } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: "src/main.tsx",
      userscript: {
        name: "Better Bookwalker",
        author: "Marv",
        icon: "https://avatars.githubusercontent.com/u/17340496",
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
          // https://cdn.jsdelivr.net/npm/react-copy-to-clipboard@5.1.0/build/react-copy-to-clipboard.min.js
          "react-copy-to-clipboard": cdn.jsdelivr(
            "CopyToClipboard",
            "build/react-copy-to-clipboard.min.js",
          ),
          // https://cdn.jsdelivr.net/npm/@nivo/core@0.87.0/dist/nivo-core.cjs.js
          // "@nivo/core": cdn.jsdelivr("nivoCore", "dist/nivo-core.cjs.js"),
          // https://cdn.jsdelivr.net/npm/@radix-ui/react-collapsible@1.1.0/dist/index.min.js
          // "@radix-ui/react-collapsible": cdn.jsdelivr(
          //   "ReactCollapsible",
          //   "dist/index.min.js",
          // ),
          // https://cdn.jsdelivr.net/npm/class-variance-authority@0.7.0/dist/index.min.js
          // "class-variance-authority": cdn.jsdelivr(
          //   "classVarianceAuthority",
          //   "dist/index.min.js",
          // ),
          // https://cdn.jsdelivr.net/npm/clsx@2.1.1/dist/clsx.min.js
          clsx: cdn.jsdelivr("clsx", "dist/clsx.min.js"),
          // https://cdn.jsdelivr.net/npm/react-toastify@10.0.5/dist/react-toastify.umd.min.js
          // "react-toastify": cdn.jsdelivr(
          //   "reactToastify",
          //   "dist/react-toastify.umd.min.js",
          // ),
        },
        // externalResource: {
        //   // https://cdn.jsdelivr.net/npm/react-toastify@10.0.5/dist/ReactToastify.min.css
        //   "ReactToastify.min.css": cdn.jsdelivr(),
        // }
        // https://cdn.jsdelivr.net/npm/tailwind-merge@2.5.2/dist/bundle-cjs.min.js
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
