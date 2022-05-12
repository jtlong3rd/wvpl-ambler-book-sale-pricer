import { ReactNode } from 'react';

import { baseButtonStyling } from './App';

interface Props {
  name: ReactNode;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function Item({ name, count, onIncrement, onDecrement }: Props) {
  return (
    <div
      style={{
        fontSize: '1.2em',
        margin: '1em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1000px',
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
        }}
      >
        {name}
      </div>
      <div
        style={{
          whiteSpace: 'nowrap',
          fontSize: '1.2em'
        }}
      >
        <button
          style={{
            ...baseButtonStyling,
            width: '60px',
            height: '60px',
          }}
          onClick={onDecrement}
          type="button"
        ><i className="fa fa-minus fa-lg fa-fw"></i></button>
        {' '}
        <div
          style={{
            display: 'inline-block',
            textAlign: 'center',
            width: '27.5px'
          }}
        >
          {count}
        </div>
        {' '}
        <button
          style={{
            ...baseButtonStyling,
            width: '60px',
            height: '60px'
          }}
          onClick={onIncrement}
          type="button"
        ><i className="fa fa-plus fa-lg fa-fw"></i></button>
      </div>
    </div>
  );
}
