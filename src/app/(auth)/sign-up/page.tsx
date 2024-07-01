"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialValidator,
  TAuthCredentialValidator,
} from "@/lib/validators/account-creadentials-validator";
import { trpc } from "@/trpc/client";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialValidator>({
    resolver: zodResolver(AuthCredentialValidator),
  });

  const { data } = trpc.anyApiRoute.useQuery();
  console.log(data);

  const onSubmit = ({ email, password }: TAuthCredentialValidator) => {};

  return (
    <>
      <div className="container relative flex flex-col items-center justify-center pt-20">
        <div className="w-full flex flex-col justify-center mx-auto space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center text-center space-y-2">
            <Icons.logo className="w-20 h-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>

            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Already have an account? sign in
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    placeholder="you@example.com"
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                  />
                </div>

                <div className="grid gap-1 py-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    placeholder="Password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                  />
                </div>

                <Button type="submit">Sign in</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;