import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Label } from "@/components/ui/label";
import { client } from "@/network/api";
import { Product } from "@/interfaces/product";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Error from "./error";
import { CartContext } from "@/hooks/cart";

export default function Products() {
  const { productId } = useParams<{ productId: string }>();
  const [productData, setProduct] = useState<Product>();

  async function loadProduct() {
    if (productData) {
      return;
    }
    const { data } = await client.get<Product>(`/products/${productId}`);
    setProduct(data);
  }

  const cart = useContext(CartContext);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  return (
    <>
      {productData === undefined ? (
        <Error />
      ) : (
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="lg:col-gap-12 xl:col-gap-16 items-center mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
              <div className="lg:col-span-3 lg:row-end-1">
                <div className="lg:flex lg:items-start">
                  <div className="lg:order-2 lg:ml-5">
                    <div className="max-w-xl overflow-hidden border rounded-lg">
                      <img
                        className="h-full w-full max-w-full object-cover"
                        src={productData.imageSrc[0]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                <h1 className="sm: text-2xl font-bold mb-6 sm:text-3xl">
                  {productData.name}
                </h1>

                <div className="space-y-3">
                  <p className="mt-4 text-gray-500 leading-relaxed">
                    {productData.description}
                  </p>
                  <div className="mt-10 space-y-3">
                    <div>
                      <Label>Escolha uma cor</Label>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Cor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Cores</SelectLabel>
                            {productData.color.map((color) => (
                              <SelectItem key={color} value={color}>
                                {color}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Escolha um tamanho</Label>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Tamanho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tamanhos</SelectLabel>
                            {productData.size.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col lg:items-center justify-between space-y-4 border-t border-b border-primary-foreground py-4 sm:flex-row sm:space-y-0">
                  <div className="flex items-end">
                    <h1 className="text-3xl font-bold">
                      R$ {productData.price}
                    </h1>
                  </div>

                  <Button
                    onClick={() => {
                      cart.addOneToCart(productId!);
                      console.log(cart);
                    }}
                  >
                    Adicionar ao carrinho
                    <ShoppingBag className="size-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mx-auto grid container grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-12 sm:px-6 sm:py-12 lg:grid-cols-2 lg:px-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Detalhes do produto
                </h2>

                <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                  <div className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Origem</dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {productData.details.origin}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Material</dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {productData.details.material}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Dimensões</dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {productData.details.dimensions}
                    </dd>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Acabamento</dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {productData.details.finish}
                    </dd>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Inclui</dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {productData.details.includes}
                    </dd>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Considerações</dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {productData.details.considerations}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                <img
                  src={productData.imageSrc[1]}
                  className="rounded-lg bg-gray-100 size-[280px] aspect-square object-cover object-center"
                />
                <img
                  src={productData.imageSrc[2]}
                  className="rounded-lg bg-gray-100 size-[280px] aspect-square object-cover object-center"
                />

                <img
                  src={productData.imageSrc[3]}
                  className="rounded-lg bg-gray-100 size-[280px] aspect-square
                object-cover object-center "
                />
                <img
                  src={productData.imageSrc[4]}
                  className="rounded-lg bg-gray-100 size-[280px] aspect-square object-cover object-center "
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
