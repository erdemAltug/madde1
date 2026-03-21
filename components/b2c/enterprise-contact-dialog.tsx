"use client";

import * as React from "react";
import { MessageCircle, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
};

function buildWhatsAppUrl(message: string): string | null {
  const raw =
    typeof process.env.NEXT_PUBLIC_WHATSAPP_E164 === "string"
      ? process.env.NEXT_PUBLIC_WHATSAPP_E164.replace(/\D/g, "")
      : "";
  if (raw.length < 10) return null;
  const text = encodeURIComponent(message.slice(0, 1800));
  return `https://wa.me/${raw}?text=${text}`;
}

export function EnterpriseContactDialog({ open, onOpenChange }: Props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const body = `Kurumsal Clause talebi\nAd: ${name}\nE-posta: ${email}\n\n${message}`;

  const wa = buildWhatsAppUrl(body);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/30 bg-white/95 backdrop-blur-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-madde-ink">
            Bizimle iletişime geçin
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Kurumsal çözümler için ekibimiz size dönüş yapsın. Formu doldurup
            WhatsApp veya e-posta ile gönderebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="ent-name">Ad / unvan</Label>
            <Input
              id="ent-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn. ACME A.Ş."
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ent-email">E-posta</Label>
            <Input
              id="ent-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kurumsal@ornek.com"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ent-msg">Mesaj</Label>
            <textarea
              id="ent-msg"
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ekip büyüklüğü, entegrasyon ihtiyacı, tahmini hacim…"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="font-semibold"
            asChild
          >
            <a
              href={`mailto:kurumsal@tryclause.ai?subject=${encodeURIComponent("Kurumsal Clause talebi")}&body=${encodeURIComponent(body)}`}
            >
              <Send className="mr-2 h-4 w-4" />
              E-posta gönder
            </a>
          </Button>
          {wa ? (
            <Button type="button" className="font-bold" asChild>
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          ) : (
            <p className="text-center text-[11px] text-slate-500 sm:text-right">
              WhatsApp için{" "}
              <code className="rounded bg-slate-100 px-1">
                NEXT_PUBLIC_WHATSAPP_E164
              </code>{" "}
              tanımlayın (örn. 905551234567).
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
