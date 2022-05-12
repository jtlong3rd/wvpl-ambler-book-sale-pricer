import { ReactNode } from 'react';

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
              count={0}
              onDecrement={() => {}}
              onIncrement={() => {}}
            />
          )
        )
      }
    </div>
  );
}

export default App;
