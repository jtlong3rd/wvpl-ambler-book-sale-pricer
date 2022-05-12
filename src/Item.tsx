import { CSSProperties, ReactNode } from 'react';

interface Props {
  name: ReactNode;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const buttonStyling: CSSProperties = {
  border: 'none',
  borderRadius: '2em',
  background: 'black',
  color: 'white',
  fontWeight: 'bold',
  width: '60px',
  height: '60px',
};

export function Item({ name, count, onIncrement, onDecrement }: Props) {
  return (
    <div
      style={{
        fontSize: '1.2em',
        margin: '1em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        {name}
      </div>
      <div
        style={{
          whiteSpace: 'nowrap',
        }}
      >
      <button
        style={buttonStyling}
        onClick={onDecrement}
        type="button"
      ><i className="fa fa-minus fa-fw"></i></button>
      {' '}
      {count}
      {' '}
      <button
        style={buttonStyling}
        onClick={onIncrement}
        type="button"
      ><i className="fa fa-plus fa-fw"></i></button>
      </div>
    </div>
  );
}
