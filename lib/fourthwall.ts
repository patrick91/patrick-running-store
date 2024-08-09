type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  state: {
    type: "AVAILABLE" | string; // Add other possible states if known
  };
  access: {
    type: "PUBLIC" | string; // Add other possible access types if known
  };
  images: Image[];
  variants: Variant[];
  createdAt: string;
  updatedAt: string;
};

type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type Variant = {
  id: string;
  name: string;
  sku: string;
  unitPrice: {
    value: number;
    currency: string;
  };
  attributes: {
    description: string;
    color: {
      name: string;
      swatch: string;
    };
    size: {
      name: string;
    };
  };
  stock: {
    type: "UNLIMITED" | string; // Add other possible stock types if known
  };
  weight: {
    value: number;
    unit: string;
  };
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  images: Image[];
};

export async function getProducts() {
  const username = process.env.FOURTHWALL_USERNAME;
  const password = process.env.FOURTHWALL_PASSWORD;

  const response = await fetch(
    "https://api.fourthwall.com/open-api/v1.0/products",
    {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
      },
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products with status ${response.status}`);
  }

  const products = await response.json();

  return products.results as Product[];
}
