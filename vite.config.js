import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // RenewTrack will be hosted at:
  // https://akleung1511.github.io/renewtrack/
  base: "/renewtrack/",
});