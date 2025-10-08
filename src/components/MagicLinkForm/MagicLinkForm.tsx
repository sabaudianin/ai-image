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
      className="space-y-2"
    >
      <input
        type="email"
        placeholder="Write your email here..."
        {...register("email")}
        className="w-full border rounded p-2 bg-yellow-100"
        aria-invalid={!!errors.email}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-blue-200 text-white py-2 disabled:opacity-60"
      >
        {isSubmitting ? "Sending" : "Send magic Link"}
      </button>
    </form>
  );
};
