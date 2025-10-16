"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { emailSchema, type EmailInput } from "@/utils/schema/auth";
import { useAuthActions } from "@/hooks/useAuthActions/useAuthActions";

export function useMagicLinkForm() {
  const { sendMagicLink, error } = useAuthActions();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: EmailInput) => {
    const ok = await sendMagicLink(email);
    if (ok) {
      toast.success("Link to log in sent. Check your inbox.");
    } else {
      toast.error(error ?? "Something went wrong");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
