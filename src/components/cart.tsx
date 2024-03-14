import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ArrowRight, ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import { client } from "@/network/api";
import { Product } from "../interfaces/product";
import { ScrollArea } from "./ui/scroll-area";

const response = await client.get<Product>("products");
const products = response.data;
export function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <ShoppingCart className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="relative h-full">
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
            <SheetDescription>
              Veja os itens do seu carrinho aqui.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[70vh]">
            <div className="grid gap-4 py-4">
              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y">
                    {Array.isArray(products) &&
                      products.map((product: Product) => (
                        <li key={product.id} className="flex pr-6 py-6">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                            <img
                              src={product.imageSrc[0]}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium">
                                <h3>{product.name}</h3>
                                <p className="text-nowrap ml-4">
                                  R$ {product.price}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-muted-foreground">Qtd: </p>
                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-primary hover:text-primary/70"
                                >
                                  Remover
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <Separator />
            </div>
          </ScrollArea>
          <SheetFooter className="absolute bottom-0">
            <div className="space-y-4 justify-self-end">
              <div className="flex justify-between items-center font-medium">
                <p className="text-sm">Subtotal</p>
                <p>R$ 262,00</p>
              </div>
              <Button className="w-full">Fazer checkout</Button>
              <SheetClose asChild>
                <Button className="w-full" variant={"link"}>
                  Continuar comprando <ArrowRight className="size-4 ml-2" />
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
