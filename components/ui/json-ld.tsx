/** Emits one schema.org block. The "<" is escaped so page text can never close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}

type ProductData = {
  name: string;
  description: string;
  image?: string | null;
  path: string;
};

/** schema.org Product markup for a list of products (punch list SW-15). */
export function productsJsonLd(products: ProductData[], absolute: (path: string) => string) {
  return products.map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.image ? { image: absolute(product.image) } : {}),
    url: absolute(product.path),
    brand: { "@type": "Brand", name: "MEGA-TEC" },
  }));
}
