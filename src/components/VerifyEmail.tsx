"use client";

import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface IVerifyEmail {
  token: string;
}

const VerifyEmail = ({ token }: IVerifyEmail) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="w-4 h-4 text-red-600" />
        <h3 className="text-lg font-semibold">There was a problem</h3>
        <p className="text-sm text-muted-foreground">
          This token is not valid or might be expired. Please try agin
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/hippo-email-sent.png" alt="the email was send" fill />
        </div>
        <h3 className="text-3xl font-semibold">You&apos;re all set</h3>
        <p className="text-center mt-1 text-muted-foreground">
          Thank you for verifying your email
        </p>
        <Link href="/sign-in" className={buttonVariants({ className: "mt-4" })}>
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-6 h-6 text-zinc-300 animate-spin" />
        <h3 className="text-lg font-semibold">Verifying...</h3>
        <p className="text-sm text-muted-foreground">
          This won&apos;t take long.
        </p>
      </div>
    );
  }
  return <div></div>;
};

export default VerifyEmail;
