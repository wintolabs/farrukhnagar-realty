// src/app/api/uploadthing/route.ts

import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {},
});
