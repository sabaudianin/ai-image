"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { emailSchema, type EmailInput } from "@/utils/schema/auth";
import { useAuthActions } from "@/hooks/useAuthActions/useAuthActions";

export const MagicLinkForm = () => {
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 flex flex-col items-center gap-4 "
    >
      <input
        type="email"
        placeholder="Write your email here..."
        {...register("email")}
        className="w-full lg:w-1/4 rounded-lg 
           border border-[--color-border] p-4
           placeholder:text-slate-400
           focus:outline-none focus:ring-2 focus:ring-[--brand] text-center"
        aria-invalid={!!errors.email}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full lg:w-1/4 rounded-lg bg-[--brand] text-white py-2 px-4 bg-white/20 hover:bg-[--brand-hover] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-[--brand] font-semibold border  border-[var(--brand)]"
      >
        {isSubmitting ? "Sending" : "Send Code"}
      </button>
    </form>
  );
};
