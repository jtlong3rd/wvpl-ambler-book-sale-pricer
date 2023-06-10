import { baseButtonStyling } from "./App";

interface Props {
  onReset: () => void;
}

export function ResetButton({ onReset }: Props) {
  return (
    <button
      style={{
        ...baseButtonStyling,
        fontSize: "1.1em",
        backgroundColor: "crimson",
        borderRadius: "6px",
        padding: "0.5em 2em",
      }}
      onClick={onReset}
    >
      Reset
    </button>
  );
}
