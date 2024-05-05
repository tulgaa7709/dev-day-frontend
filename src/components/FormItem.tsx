import { ReactNode } from "react";

export const FormItem = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => (
  <div className="grid gap-3">
    <label>{label}</label>
    {children}
  </div>
);
