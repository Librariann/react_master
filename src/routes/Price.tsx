import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";

const Table = styled.table`
  width: 440px;
`;
const Thead = styled.thead``;
const Tbody = styled.tbody``;

const Tr = styled.tr`
  padding: 20px 0 20px 0;
`;
const Th = styled.th`
  padding: 10px 0 10px 0;
  border: 1px solid whitesmoke;
  color: red;
`;
const Td = styled.td`
  padding: 10px 0 10px 4px;
  border: 1px solid whitesmoke;
`;
interface IPrice {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price() {
  const { coinId } = useParams() as unknown as IPrice;
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "price loading.."
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>time_close</Th>
              <Th>close</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td>{`${new Date(item.time_close).getFullYear()}-${
                    new Date(item.time_close).getMonth() + 1
                  }-${new Date(item.time_close).getDate()}`}</Td>
                  <Td>{item.close}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </div>
  );
}

export default Price;
