"use client";

import * as React from "react";
import { AlertTriangle, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

type Flag = { level: "ok" | "warn" | "risk"; text: string };

function daysBetween(a: string, b: string): number | null {
  if (!a || !b) return null;
  const d1 = new Date(a);
  const d2 = new Date(b);
  if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return null;
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

/** Tarih / imza çelişkisi ön kontrolü — AI taramanın ön adımı */
export function TahliyeValidityChecklist({
  embedded,
}: {
  embedded?: boolean;
} = {}) {
  const [contractDate, setContractDate] = React.useState("");
  const [commitmentDate, setCommitmentDate] = React.useState("");
  const [moveInDate, setMoveInDate] = React.useState("");
  const [signedBlank, setSignedBlank] = React.useState(false);
  const [sameDayAsContract, setSameDayAsContract] = React.useState(false);
  const tracked = React.useRef(false);

  const track = () => {
    if (tracked.current) return;
    tracked.current = true;
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: "tahliye_validity_page",
      surface: embedded ? "embed" : "tool_page",
    });
  };

  const flags = React.useMemo((): Flag[] => {
    const out: Flag[] = [];
    const gapCommitContract = daysBetween(contractDate, commitmentDate);
    const gapMoveCommit = daysBetween(moveInDate, commitmentDate);

    if (signedBlank) {
      out.push({
        level: "risk",
        text: "Boş tarihli / sonradan doldurulmuş taahhüt iddiası sık görülür; belgeyi AI ile ve mümkünse avukatla doğrulayın.",
      });
    }
    if (sameDayAsContract) {
      out.push({
        level: "warn",
        text: "Kira sözleşmesi ile aynı gün imzalanan tahliye taahhüdü uygulamada sıkça tartışılır; irade sakatlanmış sayılabilir.",
      });
    }
    if (gapCommitContract !== null && gapCommitContract < 0) {
      out.push({
        level: "risk",
        text: "Taahhüt tarihi, sözleşme tarihinden önce görünüyor — tarih çelişkisi güçlü bir red bayrağıdır.",
      });
    }
    if (
      gapCommitContract !== null &&
      gapCommitContract >= 0 &&
      gapCommitContract < 30
    ) {
      out.push({
        level: "warn",
        text: `Taahhüt, sözleşmeden yalnızca ~${gapCommitContract} gün sonra. Yakın tarihli taahhütler sıkça ihtilaflıdır.`,
      });
    }
    if (gapMoveCommit !== null && gapMoveCommit < 0) {
      out.push({
        level: "warn",
        text: "Taahhüt tarihi taşınma / teslim tarihinden önce — fiili oturum başlamadan verilen taahhüt tartışılabilir.",
      });
    }
    if (
      !out.length &&
      (contractDate || commitmentDate || moveInDate)
    ) {
      out.push({
        level: "ok",
        text: "Girilen tarihlerde bariz çelişki yok; yine de imza, noter ve metin içeriğini AI ile tarayın.",
      });
    }
    return out;
  }, [
    contractDate,
    commitmentDate,
    moveInDate,
    signedBlank,
    sameDayAsContract,
  ]);

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
          <CalendarCheck className="h-5 w-5 text-[#005BEA]" />
          Tarih &amp; imza çelişkisi ön kontrolü
        </CardTitle>
        <p className="text-xs leading-relaxed text-slate-500">
          Tahliye taahhüdünün geçerliliğinde sık görülen usul sorunlarını
          saniyeler içinde tarayın.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="tv-contract">Kira sözleşmesi tarihi</Label>
            <Input
              id="tv-contract"
              type="date"
              value={contractDate}
              onChange={(e) => {
                setContractDate(e.target.value);
                track();
              }}
              className="h-11 rounded-xl border-2 border-slate-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tv-commit">Tahliye taahhüdü tarihi</Label>
            <Input
              id="tv-commit"
              type="date"
              value={commitmentDate}
              onChange={(e) => {
                setCommitmentDate(e.target.value);
                track();
              }}
              className="h-11 rounded-xl border-2 border-slate-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tv-move">Taşınma / teslim tarihi</Label>
            <Input
              id="tv-move"
              type="date"
              value={moveInDate}
              onChange={(e) => {
                setMoveInDate(e.target.value);
                track();
              }}
              className="h-11 rounded-xl border-2 border-slate-200"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={sameDayAsContract}
              onChange={(e) => {
                setSameDayAsContract(e.target.checked);
                track();
              }}
              className="rounded border-slate-300"
            />
            Sözleşme ile aynı gün imzalandı
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={signedBlank}
              onChange={(e) => {
                setSignedBlank(e.target.checked);
                track();
              }}
              className="rounded border-slate-300"
            />
            Tarih sonradan dolduruldu / boştu
          </label>
        </div>

        {flags.length > 0 ? (
          <ul className="space-y-2">
            {flags.map((f) => (
              <li
                key={f.text}
                className={cn(
                  "flex gap-2 rounded-xl border px-3 py-2.5 text-sm leading-relaxed",
                  f.level === "risk" && "border-red-200 bg-red-50/80 text-red-900",
                  f.level === "warn" &&
                    "border-amber-200 bg-amber-50/80 text-amber-950",
                  f.level === "ok" &&
                    "border-emerald-200 bg-emerald-50/80 text-emerald-900",
                )}
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                {f.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-500">
            Tarihleri girin veya kutuları işaretleyin; çelişki bayrakları burada
            görünür.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
