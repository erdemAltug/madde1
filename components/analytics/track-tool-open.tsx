"use client";

import * as React from "react";
import { captureToolOpened } from "@/lib/analytics/capture";

/** Sunucu bileşeni sayfalarda Tool_Opened göndermek için. */
export function TrackToolOpen({ tool }: { tool: string }) {
  React.useEffect(() => {
    captureToolOpened(tool);
  }, [tool]);
  return null;
}
