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

const WalletPage: React.FC<Props> = (props: BoxProps) => {
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
        return 20; // Combined cases with the same return value
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount > 0 // Optimize sorting logic, balance.amount was < 0 which might be incorrect logic
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
