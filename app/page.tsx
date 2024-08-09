import { SignIn } from "@/components/signin";
import { TShirtCard } from "@/components/tshirt-card";
import { UserAvatar } from "@/components/user-avatar";
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
    variants: Array<{
      id: string;
      name: string;
      unitPrice: {
        value: number;
        currency: string;
      };
    }>;
  };
}) {
  return <TShirtCard product={product} />;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Products</h1>

      <UserAvatar />
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <SignIn />
    </main>
  );
}
