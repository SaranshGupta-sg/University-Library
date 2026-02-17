import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Props } from "recharts/types/container/Surface";

// interface Props<T extends FieldValues> {
//   schema: ZodType<T>;
//   defaultValues: T;
//   onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
//   type: "SIGN_IN" | "SIGN_UP";
// }

const AuthForm = ({ type, schema, defaultValues, onSubmit }: Props) => {
  return <div></div>;
};

export default AuthForm;
