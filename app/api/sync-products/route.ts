import { getProducts } from "@/lib/fourthwall";
import algoliasearch from "algoliasearch";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(request: Request) {
  const products = await getProducts();

  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY,
  );

  const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

  const allProducts = [];

  products.forEach((product) => {
    product.variants.forEach((variant) => {
      allProducts.push({
        id: variant.id,
        slug: product.slug,
        name: product.name,
        description: product.description,
        image: variant.images[0].url,
      });
    });
  });

  try {
    await index.saveObjects(allProducts, {
      autoGenerateObjectIDIfNotExist: true,
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
