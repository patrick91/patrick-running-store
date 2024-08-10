import { getProducts } from "@/lib/fourthwall";
import algoliasearch from "algoliasearch";

export const dynamic = "force-dynamic";

const getMinRun = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const steps = ["50", "42.2", "21.1", "10", "5", "3", "1"];

  for (const step of steps) {
    if (
      name.toLowerCase().includes(`${step} km`) ||
      description.toLowerCase().includes(`${step} km`)
    ) {
      return +step;
    }
  }

  return 0;
};

export async function GET(request: Request) {
  const products = await getProducts();

  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID!,
    process.env.ALGOLIA_API_KEY!,
  );

  const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME!);

  const allProducts = products.flatMap((product) =>
    product.variants.flatMap((variant) => ({
      id: variant.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      image: variant.images[0].url,
      minRun: getMinRun(product),
      price: variant.unitPrice.value,
    })),
  );

  try {
    await index.saveObjects(allProducts, {
      autoGenerateObjectIDIfNotExist: true,
    });
  } catch (error) {
    // @ts-ignore
    return new Response(error.message, { status: 500 });
  }

  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
