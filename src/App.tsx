import {
  CSSProperties,
  Fragment,
  ReactNode,
  useEffect,
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
  additionalButtonStyles?: CSSProperties;
  additionalCountStyles?: CSSProperties;
}

const bagSaleItemSpec: ItemSpec<BagSale> = {
  key: 'fill-a-bag',
  name: 'Fill a Bag',
  offer: state => (
    state === 'early-afternoon' ||
    state === 'late-afternoon'
  ),
  renderPricingDescription: state => (
    state === 'early-afternoon'
      ? '$8 / bag'
      : '$5 / bag'
  ),
  pricingRule: (count, state) => (
    state === 'early-afternoon'
      ? count * 8
      : count * 5
  )
};

const itemSpecs: ItemSpec<BagSale>[] = [
  {
    key: 'cds-and-dvds',
    name: 'CDs and DVDs',
    renderPricingDescription: () => '$0.50 each; 3 for $1.00',
    pricingRule: count => Math.floor(count / 3) + count % 3 * 0.50
  },
  {
    key: 'adult-hardcover-nonfiction',
    name: 'Hardcover',
    renderPricingDescription: () => '$1.00 each',
    pricingRule: count => count
  },
  {
    key: 'trade-paperback',
    name: 'Trade Paperback',
    renderPricingDescription: () => '$1.00 each',
    pricingRule: count => count
  },
  {
    key: 'adult-paperback',
    name: 'Adult Paperback',
    renderPricingDescription: () => '$0.50 each',
    pricingRule: count => count * 0.5
  },
  {
    key: 'yellow-green-childrens',
    name: <span style={{ color: 'yellowgreen' }}>Children's (Yellow / Green)</span>,
    renderPricingDescription: () => '$0.25 each',
    pricingRule: count => count,
    additionalButtonStyles: { backgroundColor: 'yellowgreen' },
    additionalCountStyles: { color: 'yellowgreen' }
  },
  {
    key: 'pink-childrens',
    name: <span style={{ color: 'pink' }}>Children's (Pink)</span>,
    renderPricingDescription: () => '$0.50 each',
    pricingRule: count => count,
    additionalButtonStyles: { backgroundColor: 'pink' },
    additionalCountStyles: { color: 'pink' }
  },
  {
    key: 'blue-childrens',
    name: <span style={{ color: 'blue' }}>Children's (Blue)</span>,
    renderPricingDescription: () => '$1.00 each',
    pricingRule: count => count,
    additionalButtonStyles: { backgroundColor: 'blue' },
    additionalCountStyles: { color: 'blue' }
  },
  bagSaleItemSpec
];

type BagSale =
  | 'no-sale'
  | 'early-afternoon'
  | 'late-afternoon';

const initialCounts = itemSpecs.reduce(
  (memo, itemSpec) => {
    memo[itemSpec.key] = 0;

    return memo;
  }, {} as Record<string, number>
);

function getBagSale(): BagSale {
  const time = new Date();

  const day = time.getDay();
  const hour = time.getHours();

  return day !== 6 || hour < 12
    ? 'no-sale'
    : hour < 14
    ? 'early-afternoon'
    : 'late-afternoon';
}

function App() {
  const [itemCounts, setItemCounts] = useState(initialCounts);
  const [bagSale, setBagSale] = useState<BagSale>(getBagSale);

  useEffect(() => {
    function refreshBagSale() {
      setBagSale(getBagSale());
    }

    const secondsToNextMinute = (60 - new Date().getSeconds()) % 60;
    const millisecondToNextMinute = secondsToNextMinute * 1000;

    let interval: NodeJS.Timer;
    const timeout = setTimeout(() => {
      refreshBagSale();

      interval = setInterval(() => {
        refreshBagSale();
      }, 60000);
    }, millisecondToNextMinute);

    return () => {
      clearTimeout(timeout);

      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    if (bagSale === 'no-sale') {
      setItemCounts(itemCounts => ({
        ...itemCounts,
        'fill-a-bag': 0
      }));
    }
  }, [bagSale]);

  const total = useMemo(
    () => itemSpecs.reduce(
      (memo, { key, pricingRule }) =>
        memo + pricingRule(itemCounts[key] ?? 0, bagSale),
      0
    ).toFixed(2),
    [itemCounts, bagSale]
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
          marginBottom: '0.5em',
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
            itemSpec => itemSpec.offer == null || itemSpec.offer(bagSale)
          )
          .map(
            (itemSpec, i) => (
              <Fragment key={itemSpec.key}>
                <div>
                  <Item
                    key={itemSpec.key}
                    name={itemSpec.name}
                    pricingDescription={itemSpec.renderPricingDescription(bagSale)}
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
                    additionalButtonStyles={itemSpec.additionalButtonStyles}
                    additionalCountStyles={itemSpec.additionalCountStyles}
                  />
                  {i < itemSpecs.length - 1 && <hr />}
                </div>
              </Fragment>
            )
        )
      }
    </div>
  );
}

export default App;
