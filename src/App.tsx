import {
  CSSProperties,
  ReactNode,
  useMemo,
  useState
} from 'react';

import { Item } from './Item';
import { ResetButton } from './ResetButton';
import { Total } from './Total';

export const baseButtonStyling: CSSProperties = {
  margin: '0 1em',
  border: 'none',
  borderRadius: '2em',
  background: 'black',
  color: 'white',
  fontWeight: 'bold',
};

interface ItemSpec {
  key: string;
  name: ReactNode;
  pricingRule: (count: number) => number; 
}

const itemSpecs: ItemSpec[] = [
  {
    key: 'coffee-table',
    name: 'Coffee Table Books',
    pricingRule: count => count * 2
  },
  {
    key: 'adult-hardcover-nonfiction',
    name: 'General Adult Hardcover and Nonfiction',
    pricingRule: count => count
  },
  {
    key: 'movies',
    name: 'Movies / Music / Video Games',
    pricingRule: count => count
  },
  {
    key: 'trade-paperback',
    name: 'Trade Paperback',
    pricingRule: count => Math.floor(count / 3) * 2 + (count % 3 * 0.75)
  },
  {
    key: 'adult-paperback',
    name: 'General Adult Paperback',
    pricingRule: count => count * 0.5
  },
  {
    key: 'childrens-teens-books',
    name: 'Children\'s / Teen\'s Books',
    pricingRule: count => count * 0.5
  }
];

const initialCounts = itemSpecs.reduce(
  (memo, itemSpec) => {
    memo[itemSpec.key] = 0;

    return memo;
  }, {} as Record<string, number>
);

function App() {
  const [itemCounts, setItemCounts] = useState(initialCounts);

  const total = useMemo(
    () => itemSpecs.reduce(
      (memo, { key, pricingRule }) =>
        memo + pricingRule(itemCounts[key] ?? 0),
      0
    ).toFixed(2),
    [itemCounts]
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          marginBottom: '1em',
          padding: '1em 0',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          borderBottom: '1px solid black',
          zIndex: 1,
          backgroundColor: '#CCC',
        }}
      >
        <Total total={total} />
        <ResetButton
          onReset={() => {
            setItemCounts(initialCounts);
          }}
        />
      </header>
      {
        itemSpecs.map(
          itemSpec => (
            <Item
              key={itemSpec.key}
              name={itemSpec.name}
              count={itemCounts[itemSpec.key]}
              onDecrement={() => setItemCounts(itemCounts => ({
                ...itemCounts,
                [itemSpec.key]: Math.max(
                  itemCounts[itemSpec.key] - 1,
                  0
                )
              }))}
              onIncrement={() => setItemCounts(itemCounts => ({
                ...itemCounts,
                [itemSpec.key]:
                  itemCounts[itemSpec.key] + 1,
              }))}
            />
          )
        )
      }
    </div>
  );
}

export default App;
