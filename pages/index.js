export default function HomePage(props) {
  const { products } = props;
  return (
    <div>
      <h1>Home Page</h1>

      <ul>
        {products.map(product => <li key={product.id}>{product.title}</li>)}
      </ul>
    </div>
  )
}

import fs from 'fs/promises';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products
    }
  };
}