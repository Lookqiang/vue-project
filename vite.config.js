import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { viteMockServe } from "vite-plugin-mock";
import i18n from "./plugins/vite-plugins-i18n";

const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteMockServe({}), i18n],
});
