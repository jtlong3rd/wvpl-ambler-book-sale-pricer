import { CSSProperties, ReactNode } from "react";

import { baseButtonStyling } from "./App";

interface Props {
  name: ReactNode;
  pricingDescription: ReactNode;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  additionalButtonStyles?: CSSProperties;
  additionalCountStyles?: CSSProperties;
}

export function Item({
  name,
  pricingDescription,
  count,
  onIncrement,
  onDecrement,
  additionalButtonStyles,
  additionalCountStyles,
}: Props) {
  return (
    <div className="mx-4 my-2 max-w-[1000px] flex justify-between items-center">
      <div
        style={{
          fontWeight: "bold",
        }}
      >
        {name}
        <br />
        <span
          style={{
            fontSize: "0.8em",
            color: "gray",
            whiteSpace: "nowrap",
          }}
        >
          {pricingDescription}
        </span>
      </div>
      <div
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <button
          style={{
            ...baseButtonStyling,
            width: "48px",
            height: "48px",
            ...additionalButtonStyles,
          }}
          onClick={onDecrement}
          type="button"
        >
          <i className="fa fa-minus fa-fw"></i>
        </button>{" "}
        <div
          style={{
            display: "inline-block",
            textAlign: "center",
            width: "27.5px",
            fontSize: "1.25em",
            ...additionalCountStyles,
          }}
        >
          {count}
        </div>{" "}
        <button
          style={{
            ...baseButtonStyling,
            width: "48px",
            height: "48px",
            ...additionalButtonStyles,
          }}
          onClick={onIncrement}
          type="button"
        >
          <i className="fa fa-plus fa-fw"></i>
        </button>
      </div>
    </div>
  );
}
