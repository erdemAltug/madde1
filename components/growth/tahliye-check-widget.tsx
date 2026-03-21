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

export function TahliyeCheckWidget() {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState("");

  const { messages, sendMessage, setMessages, status, error } = useChat({
    id: "madde1-tahliye-widget",
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
    setMessages([]);
    window.setTimeout(() => {
      void sendMessage({ text: t });
    }, 0);
  };

  return (
    <Card className="border-border/80 bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <FileWarning className="h-4 w-4 text-primary" />
          Tahliye taahhütnamesi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o);
            if (!o) setMessages([]);
          }}
        >
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-full" size="sm">
              Hızlı AI kontrolü
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] gap-4 sm:max-w-lg">
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
            <ScrollArea className="max-h-[220px] rounded-md border border-border/80 p-3">
              {out ? (
                <StreamingMarkdown content={out} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sonuçlar burada akacak.
                </p>
              )}
            </ScrollArea>
            <p className="text-center text-[10px] text-muted-foreground">
              Powered by Madde1.tr — Yapay Zeka Hukuk Asistanı
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
      </CardContent>
    </Card>
  );
}
