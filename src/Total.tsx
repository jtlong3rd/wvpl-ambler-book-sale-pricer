interface Props {
  total: number;
}

export function Total({ total }: Props) {
  return (
    <span
      style={{
        margin: '0.5em',
        fontSize: '1.5em',
        fontWeight: 'bold',
        textAlign: 'left'
      }}
    >
      Total:
      ${total}
    </span>
  );
}
