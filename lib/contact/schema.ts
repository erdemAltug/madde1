import { z } from "zod";

export const contactInquirySchema = z.object({
  name: z.string().trim().min(2, "Ad en az 2 karakter olmalı").max(120),
  email: z.string().trim().email("Geçerli bir e-posta girin").max(200),
  message: z.string().trim().min(10, "Mesaj en az 10 karakter olmalı").max(4000),
  source: z.string().trim().max(64).optional(),
  /** Bot koruması — boş kalmalı */
  company: z.string().max(0).optional(),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
