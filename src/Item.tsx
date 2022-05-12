import { ReactNode } from 'react';

interface Props {
  name: ReactNode;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function Item({ name, count, onIncrement, onDecrement }: Props) {
  return (
    <span
      style={{
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
      <button onClick={onDecrement} type="button">-</button>
      {' '}
      {count}
      {' '}
      <button onClick={onIncrement} type="button">+</button>
      </div>
    </span>
  );
}
