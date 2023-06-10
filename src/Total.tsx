import { ReactNode } from "react";

interface Props {
  total: ReactNode;
}

export function Total({ total }: Props) {
  return (
    <span
      style={{
        margin: "0.5em 0.75em",
        fontSize: "1.25em",
        fontWeight: "bold",
        textAlign: "left",
      }}
    >
      Total: ${total}
    </span>
  );
}
