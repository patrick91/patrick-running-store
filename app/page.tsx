import Image from "next/image";

async function getProducts() {
  const username = process.env.FOURTHWALL_USERNAME;
  const password = process.env.FOURTHWALL_PASSWORD;

  const response = await fetch(
    "https://api.fourthwall.com/open-api/v1.0/products",
    {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products with status ${response.status}`);
  }

  const products = await response.json();

  return products.results;
}

function Product({
  product,
}: {
  product: {
    name: string;
    id: string;
    images: Array<{ url: string; width: number; height: number }>;
  };
}) {
  const image = product.images[0];
  return (
    <div>
      <h2>{product.name}</h2>

      <Image
        src={image.url}
        alt={product.name}
        width={image.width}
        height={image.height}
      />
    </div>
  );
}

export default async function Home() {
  const products = await getProducts();

  console.log(products[0]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Products</h1>

      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}