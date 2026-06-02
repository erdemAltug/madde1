"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
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
import { trackContactLeadSubmitted } from "@/lib/analytics/contact-lead";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  source?: string;
};

export function EnterpriseContactDialog({
  open,
  onOpenChange,
  source = "enterprise",
}: Props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setCompany("");
    setError(null);
    setSent(false);
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) window.setTimeout(resetForm, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          source,
          company,
        }),
      });
      const data = (await res.json()) as { error?: string; success?: boolean };

      if (!res.ok) {
        setError(data.error ?? "Gönderilemedi. Lütfen tekrar deneyin.");
        return;
      }

      trackContactLeadSubmitted({ name, email, message, source });
      setSent(true);
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border border-slate-200/60 bg-white sm:max-w-md">
        {sent ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h3 className="mt-4 text-lg font-bold text-deep-navy">
              Mesajınız alındı
            </h3>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Ekibimiz en kısa sürede{" "}
              <span className="font-semibold text-slate-800">{email}</span>{" "}
              adresine dönüş yapacak.
            </p>
            <Button
              type="button"
              className="mt-6 w-full font-semibold"
              onClick={() => handleOpenChange(false)}
            >
              Tamam
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-deep-navy">
                Bizimle iletişime geçin
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-slate-600">
                Kurumsal çözümler veya geri bildirim için formu doldurun; size
                e-posta ile dönelim.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid gap-3 py-2">
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />

              <div className="grid gap-1.5">
                <Label htmlFor="ent-name" className="font-medium">
                  Ad / unvan
                </Label>
                <Input
                  id="ent-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn. ACME A.Ş."
                  className="font-medium"
                  required
                  minLength={2}
                  disabled={busy}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="ent-email" className="font-medium">
                  E-posta
                </Label>
                <Input
                  id="ent-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kurumsal@ornek.com"
                  className="font-medium"
                  required
                  disabled={busy}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="ent-msg" className="font-medium">
                  Mesaj
                </Label>
                <textarea
                  id="ent-msg"
                  className="min-h-[100px] rounded-md border border-slate-200/60 bg-slate-50 px-3 py-2 text-sm font-medium focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ekip büyüklüğü, entegrasyon ihtiyacı, tahmini hacim…"
                  required
                  minLength={10}
                  disabled={busy}
                />
              </div>

              {error ? (
                <p className="text-sm font-medium text-red-600" role="alert">
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                className="mt-1 w-full font-bold btn-gradient-primary"
                disabled={busy}
              >
                {busy ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Gönder
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
