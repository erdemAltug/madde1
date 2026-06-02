"use client";

import * as React from "react";
import { EnterpriseContactDialog } from "@/components/b2c/enterprise-contact-dialog";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  source?: string;
};

export function ContactUsTrigger({ children, className, source }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        className={cn(
          "font-semibold text-indigo-600 underline-offset-2 hover:underline",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      <EnterpriseContactDialog
        open={open}
        onOpenChange={setOpen}
        source={source}
      />
    </>
  );
}
