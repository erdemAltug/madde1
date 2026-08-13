"use client";

import { AuthModal } from "@/components/auth/AuthModal";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registeredLimit?: number;
};

/** Geriye uyum: lansman AuthModal. */
export function SignupUnlockDialog({ open, onOpenChange }: Props) {
  return <AuthModal open={open} onOpenChange={onOpenChange} />;
}
