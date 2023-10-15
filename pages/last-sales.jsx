import { transformObjToArr } from "@/functions/Helpers";
import { useEffect, useState } from "react";
import useSWR from "swr";

const api = process.env.NEXT_DB_URL + "sales.json";
const fetcher = (...args) =>
  fetch(...args)
    .then(res => res.json())
    .then(data => transformObjToArr(data));

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  const { data, err, isLoading } = useSWR(api, fetcher);
  useEffect(() => data && setSales(data), [data]);

  if (!sales && err) return <h1>{err}</h1>;
  if (!sales && isLoading) return <h1>Loading...</h1>;

  return (
    <ul>
      {sales.map(sale => (
        <li key={sale.id}>
          {sale.username} bought <b>${sale.volume}</b> worth of volumes
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(api);
  const data = await response.json;
  const dataArr = transformObjToArr(data);

  return { props: { sales: dataArr } };
}
