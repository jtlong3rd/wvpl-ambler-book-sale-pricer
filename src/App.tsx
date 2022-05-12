import { ReactNode, useState } from 'react';

import { Item } from './Item';

import './App.css';

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
    key: 'adult-nonfiction',
    name: 'General Adult Nonfiction',
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
    pricingRule: count => Math.floor(count / 3) + (count % 3 * 0.75)
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

function App() {
  const [itemCounts, setItemCounts] = useState(
    () => itemSpecs.reduce(
      (memo, itemSpec) => {
        memo[itemSpec.key] = 0;

        return memo;
      }, {} as Record<string, number>
    )
  );

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
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
