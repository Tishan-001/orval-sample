import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    output: {
      baseUrl: "http://localhost:8080",
      mode: "split",
      target: "src/api/endpoints",
      schemas: "src/api/models",
      client: "react-query",
    },
    input: {
      target: "./swagger.yml",
    },
    hooks: {
      afterAllFilesWrite: "eslint",
    },
  },
});
