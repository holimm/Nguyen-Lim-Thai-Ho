# Messy React
## Issues
<b>a. Missing Type</b>
<ul>
  <li>The `WalletBalance` interface does not include the `blockchain` property, but it's being used as if it does. This will cause TypeScript errors.</li>
</ul>
<b>b. Unused Variable</b>
<ul>
  <li>The children variable was extracted from props but never used.</li>
</ul>
<b>c. Repeated Computation</b>
<ul>
  <li>The `getPriority` function is called multiple times within the same memoized callback, which can be inefficient.</li>
</ul>
<b>d. Incorrect Filtering Logic</b>
<ul>
  <li>The filtering logic in `sortedBalances` seems to filter out balances with non-positive amounts, which is likely incorrect logic.</li>
</ul>
<b>e. Switch cases</b>
<ul>
  <li>In `getPriority` function, `Zilliqa` and `Neo` have the same priority value. It should be combined.</li>
</ul>
<b>f. Redundant Mapping</b>
<ul>
  <li>The `formattedBalances` array is created but never used.</li>
</ul>
<b>g. Unnecessary useMemo dependency</b>
<ul>
  <li>The dependencies for `useMemo` include `prices`, which are not used within the memoized function. This causes unnecessary recalculations when `prices` change.</li>
</ul>
<b>h. Inheritance violations</b>
<ul>
  <li>The interface `Props` inherits from `BoxProps` but it doesn't have any additional attributes or functions. Therefore it was unnecessary. </li>
</ul>

## Refactored code
```ts
interface BlockChainType {
  blockchain: "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";
} // Added missing blockchain type

interface WalletBalance extends BlockChainType {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string; // currency and amount properties existed in WalletBalance, just need to extend
}

const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
  const { ...rest } = props; // Removed unused `children` variable
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: BlockChainType): number => {
    //Added type for blockchain param
    switch (blockchain as unknown) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
      case "Neo":
        return 20; // Combined cases with the same priority value
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount >= 0
        // Assumed lhsPriority was balancePriority as it wasn't found in the whole scope
        // Optimize filtering logic, balance.amount was <= 0 which might be incorrect logic
      )
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain); //Optimize sorting logic
      });
  }, [balances]); // Removed unnecessary dependency

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted.toFixed()} //Removed formattedBalances function and formatted directly
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

```
## Explain
In this refactored version, I've done these changes to correct and make it efficent.<br><br>
<b>a. Added Missing Type</b>
<ul>
  <li>Added `BlockChainType` and had it extends by WalletBalance. By doing this, I can add type for `blockchain` param in `getPriority` function.</li>
  <li>Removed existing type in `FormattedWalletBalance` and had it extends by `WalletBalance`.</li>
</ul>
<b>b. Unused Variable</b>
<ul>
  <li>Removed `children` variable when destructuring from `props`.</li>
</ul>
<b>c. Switch cases</b>
<ul>
  <li>Combined cases with the same priority value.</li>
</ul>
<b>d. Filtering Logic</b>
<ul>
  <li>Assumed `lhsPriority` was `balancePriority` as it wasn't found in the whole scope.</li>
  <li>Optimized filtering logic, change condition of balance.amount to >= 0 because balance.amount <= 0 might be incorrect</li>
</ul>
<b>e. useMemo dependency</b>
<ul>
  <li>Removed unnecessary `prices` dependency</li>
</ul>
<b>f. formattedBalances</b>
<ul>
  <li>Removed `formattedBalances` function and format it directly in FormattedAmount props of WalletRow</li>
</ul>
