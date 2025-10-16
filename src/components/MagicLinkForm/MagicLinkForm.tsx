"use client";
import { useMagicLinkForm } from "@/hooks/useMagicLinkForm/useMagicLinkForm";

export const MagicLinkForm = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useMagicLinkForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col items-center gap-8 "
    >
      <input
        type="email"
        autoComplete="email"
        placeholder="Write your email here..."
        {...register("email")}
        className="w-full lg:w-1/4 rounded-lg 
           border border-[--color-border] p-4
           placeholder:text-slate-400  focus:placeholder:text-transparent
           focus:outline-none focus:ring-2 focus:ring-[--brand] text-center"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "email-error" : undefined}
      />
      {errors.email && (
        <p
          role="alert"
          className="text-red-500"
        >
          {errors.email.message}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full lg:w-1/4 rounded-lg text-white py-2 px-4  lg:py-4 lg:px-6 bg-white/20 hover:bg-[--brand-hover] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-[--brand] font-semibold border  border-[var(--brand)] lg:text-2xl"
      >
        {isSubmitting ? (
          <p className="flex justify-center items-center gap-4">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 motion-safe:animate-spin"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span>Sending…</span>
            <span className="sr-only">Sending verification email</span>
          </p>
        ) : (
          <span>Send Code</span>
        )}
      </button>
    </form>
  );
};
