import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";

interface IChart {
  coinId: string
}

function Chart() {
  const {coinId} = useParams() as unknown as IChart;
  const {isLoading, data} = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return <h1>Chart</h1>;
}

export default Chart;