import { Fragment } from "react";

// Render prerendered data from props
export default function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) return <p>Loading...</p>;

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

// Read dummy data file
import fs from "fs/promises";
import path from "path";

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

// Set dynamic paths for which to prerender data in a specific format
// fallback true allows to save resources for not the most important paths
export async function getStaticPaths() {
  const data = await getData();
  const paths = data.products.map(product => ({
    params: { pid: product.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

// Prerender data for each specific dynamic path
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();
  const product = data.products.find(product => product.id === productId);

  if (!product) return { notFound: true };

  return {
    props: { loadedProduct: product },
  };
}
