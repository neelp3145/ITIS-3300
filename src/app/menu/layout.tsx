import { ReactNode } from "react";

export default function MenuLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div className="menu-layout">
      <main>{children}</main>
    </div>
  );
}
