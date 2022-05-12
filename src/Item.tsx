import { CSSProperties, ReactNode } from 'react';

interface Props {
  name: ReactNode;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const buttonStyling: CSSProperties = {
  margin: '0 1em',
  padding: '0.5em 2em'
};

export function Item({ name, count, onIncrement, onDecrement }: Props) {
  return (
    <span
      style={{
        fontSize: '1.2em',
        margin: '1em',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div>
        {name}
      </div>
      <div>
      {' '}
      <button
        style={buttonStyling}
        onClick={onDecrement}
        type="button"
      >-</button>
      {' '}
      {count}
      {' '}
      <button
        style={buttonStyling}
        onClick={onIncrement}
        type="button"
      >+</button>
      </div>
    </span>
  );
}
