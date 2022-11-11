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

interface ItemSpec<T> {
  key: string;
  name: ReactNode;
  offer?: (state: T) => boolean;
  renderPricingDescription: (state: T) => ReactNode;
  pricingRule: (count: number, state: T) => number;
}

const itemSpecs: ItemSpec<TimeOfSale>[] = [
  {
    key: 'coffee-table',
    name: 'Coffee Table Books',
    renderPricingDescription: () => '$1.00 each',
    pricingRule: count => count
  },
  {
    key: 'adult-hardcover-nonfiction',
    name: 'General Adult Hardcover and Nonfiction',
    renderPricingDescription: () => '$1.00 each',
    pricingRule: count => count
  },
  {
    key: 'movies',
    name: 'Movies / Music / Video Games',
    renderPricingDescription: () => '$1.00 each',
    pricingRule: count => count
  },
  {
    key: 'trade-paperback',
    name: 'Trade Paperback',
    renderPricingDescription: () => '$0.75 each',
    pricingRule: count => count * 0.75
  },
  {
    key: 'adult-paperback',
    name: 'General Adult Paperback',
    renderPricingDescription: () => '$0.50 each',
    pricingRule: count => count * 0.5
  },
  {
    key: 'childrens-teens-books',
    name: 'Children\'s / Teen\'s Books',
    renderPricingDescription: () => '$0.50 each',
    pricingRule: count => count * 0.5
  },
  {
    key: 'fill-a-bag',
    name: 'Fill a Bag',
    offer: state => (
      state === 'saturday-early-afternoon' ||
      state === 'saturday-late-afternoon'
    ),
    renderPricingDescription: state => (
      state === 'saturday-early-afternoon'
        ? '$8 / bag'
        : '$5 / bag'
    ),
    pricingRule: (count, state) => (
      state === 'saturday-early-afternoon'
        ? count * 8
        : count * 5
    )
  },
];

type TimeOfSale =
  | 'friday'
  | 'saturday-morning'
  | 'saturday-early-afternoon'
  | 'saturday-late-afternoon';

const initialCounts = itemSpecs.reduce(
  (memo, itemSpec) => {
    memo[itemSpec.key] = 0;

    return memo;
  }, {} as Record<string, number>
);

function getTimeOfSale(): TimeOfSale {
  const time = new Date();

  const day = time.getDay();
  const hour = time.getHours();

  return day !== 6
    ? 'friday'
    : hour < 12
    ? 'saturday-morning'
    : hour < 14
    ? 'saturday-early-afternoon'
    : 'saturday-late-afternoon';
}

function App() {
  const [itemCounts, setItemCounts] = useState(initialCounts);
  const [timeOfSale, setTimeOfSale] = useState<TimeOfSale>(() => getTimeOfSale());

  const total = useMemo(
    () => itemSpecs.reduce(
      (memo, { key, pricingRule }) =>
        memo + pricingRule(itemCounts[key] ?? 0, timeOfSale),
      0
    ).toFixed(2),
    [itemCounts, timeOfSale]
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
          boxShadow: '0 1px 1px #00000066',
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
        itemSpecs
          .filter(
            itemSpec => itemSpec.offer == null || itemSpec.offer(timeOfSale)
          )
          .map(
            itemSpec => (
              <Item
                key={itemSpec.key}
                name={itemSpec.name}
                pricingDescription={itemSpec.renderPricingDescription(timeOfSale)}
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
