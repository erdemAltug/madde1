import { redirect } from "next/navigation";

export default function KayitPage() {
  redirect("/giris?kayit=1");
}
