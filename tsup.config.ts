import { defineConfig } from "tsup";
import { copyFile, mkdir } from "fs/promises";
import path from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
  onSuccess: async () => {
    const outDir = "dist";
    const stylesDir = path.join(outDir, "styles");
    await mkdir(stylesDir, { recursive: true });
    await copyFile(
      path.join("src", "styles", "globals.css"),
      path.join(stylesDir, "globals.css")
    );
  },
});
