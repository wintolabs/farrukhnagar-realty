// src/app/admin/login/page.tsx

"use client";
import { LoginForm } from "@/components/forms/login-form";

export default function AdminLoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br
                from-slate-50 via-white to-slate-100
                dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                relative overflow-hidden"
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 bg-[size:64px_64px] opacity-20
                  bg-[linear-gradient(to_right,theme(colors.slate.200)_1px,transparent_1px),
                      linear-gradient(to_bottom,theme(colors.slate.200)_1px,transparent_1px)]
                  dark:bg-[linear-gradient(to_right,theme(colors.slate.800)_1px,transparent_1px),
                       linear-gradient(to_bottom,theme(colors.slate.800)_1px,transparent_1px)]"
      />
      {/* blurred blobs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full
                  bg-indigo-300 opacity-40 blur-3xl"
      />
      <div
        className="absolute -bottom-40 right-0 w-[28rem] h-[28rem] rounded-full
                  bg-cyan-200 opacity-40 blur-3xl"
      />

      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
