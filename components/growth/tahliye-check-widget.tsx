"use client";

import * as React from "react";
import { FileWarning } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StreamingMarkdown } from "@/components/analysis/streaming-markdown";
import { getAssistantText } from "@/lib/message-text";
import { cn } from "@/lib/utils";
import { maskSensitiveText } from "@/lib/security/mask-sensitive";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { SITE_HOST } from "@/lib/seo/site";

export function TahliyeCheckWidget({
  cardClassName,
  embedded,
}: {
  cardClassName?: string;
  embedded?: boolean;
} = {}) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState("");

  const { messages, sendMessage, setMessages, status, error } = useChat({
    id: "clause-tahliye-widget",
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { mode: "tahliye" },
    }),
  });

  const busy = status === "submitted" || status === "streaming";
  const out = getAssistantText(messages);

  const run = () => {
    const t = draft.trim();
    if (!t) return;
    const { text: safe, replacementCount } = maskSensitiveText(t);
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: "tahliye_check",
      surface: embedded ? "bento" : "standalone",
    });
    if (replacementCount > 0) {
      captureEvent(AnalyticsEvents.PRIVACY_MASKING_TOGGLED, {
        context: "tahliye_widget_send",
        replacement_count: replacementCount,
      });
    }
    captureEvent(AnalyticsEvents.ANALYSIS_STARTED, {
      source: "tahliye_widget",
      embedded,
      text_length: t.length,
    });
    setMessages([]);
    window.setTimeout(() => {
      void sendMessage({ text: safe });
    }, 0);
  };

  const dialogBlock = (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setMessages([]);
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="w-full"
          size="sm"
          data-tahliye-trigger=""
          type="button"
        >
          Hemen dene
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] gap-4 border-slate-200 bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Taahhütname check-up</DialogTitle>
          <DialogDescription>
            Metninizi yapıştırın; yapay zeka tipik risk ve eksikliklere dair
            ön bir kontrol listesi üretir.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={busy}
          placeholder="Tahliye taahhütnamesi metniniz…"
          className="min-h-[140px]"
        />
        {error ? (
          <p className="text-sm text-destructive">{error.message}</p>
        ) : null}
        <ScrollArea className="max-h-[220px] rounded-md border border-slate-200 bg-slate-50/50 p-3">
          {out ? (
            <StreamingMarkdown content={out} variant="light" />
          ) : (
            <p className="text-sm text-slate-600">Sonuçlar burada akacak.</p>
          )}
        </ScrollArea>
        <p className="text-center text-[10px] text-slate-500">
          Powered by {SITE_HOST} — Yapay Zeka Hukuk Asistanı
        </p>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Kapat
          </Button>
          <Button type="button" onClick={run} disabled={busy || !draft.trim()}>
            {busy ? "İnceleniyor…" : "Kontrol et"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (embedded) {
    return (
      <div className={cn("space-y-3", cardClassName)}>{dialogBlock}</div>
    );
  }

  return (
    <Card
      className={cn(
        "border-slate-200 bg-white shadow-sm",
        cardClassName,
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
          <FileWarning className="h-4 w-4 text-blue-700" />
          Tahliye taahhütnamesi
        </CardTitle>
        <p className="text-sm text-slate-600">
          AI ile tipik eksiklik ve usul uyarılarını hızlıca tarayın.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">{dialogBlock}</CardContent>
    </Card>
  );
}
