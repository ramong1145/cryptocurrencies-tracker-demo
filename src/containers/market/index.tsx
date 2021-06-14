import React from "react";
import useAxios from "axios-hooks";
import { TimeFilters } from "enums/TimeFilters";

export type TimeStamp = number;
export type Price = number;

export interface GetMarketChartResponse {
  prices?: [TimeStamp, Price][];
}

const MARKET_CHART_ID = "bitcoin";

const Market = () => {
  const [timeFilter, setTimeFilter] = React.useState<string>(TimeFilters.P1D);

  const [{ data, loading, error }] = useAxios<GetMarketChartResponse | null>({
    url: `https://api.coingecko.com/api/v3/coins/${MARKET_CHART_ID}/market_chart?vs_currency=usd&days=${timeFilter}`,
    method: "GET",
  });

  const mappedData: DataProps[] = React.useMemo(() => {
    return data?.prices
      ? data.prices.map((ele) => ({
          date: new Date(ele[0]),
          price: ele[1],
        }))
      : [];
  }, [data]);

  return (
    <>
      {mappedData?.length ? (
        <>
          <PrimaryChart
            data={mappedData}
            height={200}
            width={600}
            margin={{
              top: 16,
              right: 16,
              bottom: 40,
              left: 48,
            }}
          />
        </>
      ) : null}
    </>
  );
};

export default Market;