import useSWR from "swr";
const api =
  "_DB_URL";
const fetcher = (...args) =>
  fetch(...args)
    .then(res => res.json())
    .then(data => {
      const dataArr = [];
      for (const key in data) {
        dataArr.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      return dataArr;
    });

export default function LastSalesPage() {
  const { data, err, isLoading } = useSWR(api + "sales.json", fetcher);

  if (err) return <h1>{err}</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <ul>
      {data.map(sale => (
        <li key={sale.id}>
          {sale.username} bought <b>${sale.volume}</b> worth of volumes
        </li>
      ))}
    </ul>
  );
}
