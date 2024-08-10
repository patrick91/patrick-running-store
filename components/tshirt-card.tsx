"use client";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export function TShirtCard({
  product,
}: {
  product: {
    name: string;
    slug: string;
    minRun: number;
    description: string;
    image: string;
    variants: Array<{
      id: string;
      name: string;
      attributes: {
        description: string;
      };
      unitPrice: {
        value: number;
        currency: string;
      };
    }>;
  };
}) {
  const [currentVariant, setCurrentVariant] = useState(null);

  console.log(product);
  const variants = [];

  return (
    <Card className="w-full min-w-[320px] relative">
      {product.minRun > 0 && (
        <div className="absolute top-0 right-0 p-2 bg-accent text-white text-xs font-semibold rounded-bl-lg z-10">
          {product.minRun} km ✨
        </div>
      )}

      <Image
        src={product.image}
        alt={product.name}
        width={800}
        height={800}
        className="w-full rounded-t-lg object-cover  transition-opacity"
      />
      <div className="p-4 pb-6">
        <div className="mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p
            className="text-muted-foreground text-sm"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">TODO: Add price here</div>
          <div className="flex items-center gap-2">
            <Select onValueChange={setCurrentVariant}>
              <SelectTrigger className="w-fit [&>span]:pr-4">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    {variant.attributes.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm">🛒</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
