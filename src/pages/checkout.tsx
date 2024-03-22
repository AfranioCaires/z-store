import { useContext } from "react";
import { CartContext } from "@/hooks/cart";
import { client } from "@/network/api";
import { Product } from "../interfaces/product";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormikProvider, useFormik } from "formik";
const response = await client.get<Product[]>("products");
const products = response.data;
import { useAuth } from "@/hooks/auth";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(10, "O nome no cartão deve conter no mínimo 10 caracteres")
    .max(30, "O nome no cartão deve conter no mínimo 30 caracteres")
    .required("O nome no cartão é obrigatório"),
  cvv: Yup.string()
    .matches(/^[0-9]+$/, "O CVV deve conter apenas números")
    .required("O CVV é obrigatório"),
  creditExpiry: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "A data de validade deve estar no formato MM/AA"
    )
    .required("A data de validade é obrigatória"),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "O número do cartão deve conter 16 dígitos")
    .required("O número do cartão é obrigatório"),
});

export function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const cart = useContext(CartContext);
  const cartProducts = products.filter((product) =>
    cart.items.some((item) => item.id === product.id)
  );

  const form = useFormik({
    initialValues: {
      creditExpiry: "",
      cardNumber: "",
      cvv: "",
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const order = {
        values,
        user,
        cartProducts,
      };
      console.log(order);
      navigate("/");
      cart.items.forEach((item) => {
        cart.deleteFromCart(item.id);
      });

      toast.success("Pedido realizado com sucesso!");
    },
  });
  return (
    <>
      {cartProducts.length ? (
        <FormikProvider value={form}>
          <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 container pt-8">
            <div className="px-4">
              <p className="text-xl font-medium">Resumo do pedido</p>
              <p className="text-muted-foreground">
                Verifique seus itens. E selecione um método de envio adequado.
              </p>
              {cartProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="mt-8 space-y-3 rounded-lg border px-2 py-4 sm:px-6"
                >
                  <div className="flex flex-col rounded-lg sm:flex-row">
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={product.imageSrc[0]}
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">{product.name}</span>
                      <span className="float-right text-muted-foreground">
                        Cor: {cart.getProductData(product.id)?.color}
                      </span>
                      <span className="float-right text-muted-foreground">
                        Tamanho: {cart.getProductData(product.id)?.size}
                      </span>
                      <p className="text-lg font-bold">R$ {product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 border h-fit rounded-md px-4 pt-8 lg:mt-0">
              <p className="text-xl font-medium">Detalhes do pagamento</p>
              <p className="text-muted-foreground">
                Complete seu pedido fornecendo os detalhes do pagamento.
              </p>
              <div>
                <Label
                  htmlFor="name"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Nome no cartão
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Seu nome no cartão de crédito"
                />
                <Label className="mt-4 mb-2 block text-sm font-medium">
                  Detalhes do cartão
                </Label>
                <div className="mt-4 mb-2 block text-sm font-medium">
                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder="4123 3456 7890 1234"
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <div className="w-full">
                    <Input
                      type="text"
                      name="creditExpiry"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div className="w-full">
                    <Input type="text" name="cvv" placeholder="CVV" />
                  </div>
                </div>

                <Separator className="w-full my-4" />
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium">Total</p>
                  <p className="text-2xl font-semibold">
                    R$ {cart.getTotalCost()}
                  </p>
                </div>
              </div>
              <Button
                onClick={form.submitForm}
                className="mt-4 mb-8 w-full rounded-md px-6 py-3 font-medium"
              >
                Fazer pedido
              </Button>
            </div>
          </div>
        </FormikProvider>
      ) : (
        <>
          <div className="flex flex-col h-[70vh] items-center container justify-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight">
              Seu carrinho está vazio.
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button onClick={() => navigate("/")}>Página inicial</Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
