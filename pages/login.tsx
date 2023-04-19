import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="p-10 bg-white rounded shadow-sm"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="text-2xl">Đăng nhập</div>
              <Input
                name="email"
                register={register}
                type="email"
                className="mt-8"
                placeholder="Email"
              />
              <Input
                name="password"
                register={register}
                type="password"
                className="mt-2"
                classNameEye="absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]"
                placeholder="Password"
                autoComplete="on"
              />
              <div className="mt-3">
                <Button
                  type="submit"
                  className="flex items-center justify-center w-full px-2 py-4 text-sm text-white uppercase bg-red-500 hover:bg-red-600"
                >
                  Đăng nhập
                </Button>
              </div>
              <div className="flex items-center justify-center mt-8">
                <span className="text-gray-400">Bạn chưa có tài khoản?</span>
                <Link className="ml-1 text-red-400" href="/register">
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
