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
    <div
      style={{
        margin: "0.25em 1em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1000px",
      }}
    >
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
            width: "36px",
            height: "36px",
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
            ...additionalCountStyles,
          }}
        >
          {count}
        </div>{" "}
        <button
          style={{
            ...baseButtonStyling,
            width: "36px",
            height: "36px",
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
