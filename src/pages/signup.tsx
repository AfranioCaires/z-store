import { Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { FormikProvider, useFormik } from "formik";
import { toast } from "sonner";
import { useAuth } from "@/hooks/auth";
import * as Yup from "yup";
import { UserSignUp } from "@/interfaces/userSignUp";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Digite seu nome.")
    .min(10, "O nome completo deve conter no mínimo 10 caracteres.")
    .max(50, "O nome completo deve ter no máximo 50 caracteres."),
  email: Yup.string()
    .required("Digite o seu email.")
    .email()
    .max(50, "O email deve conter no máximo 50 caracteres."),
  password: Yup.string()
    .required("Digite sua senha.")
    .min(8, "A senha deve conter no mínimo 8 caracteres.")
    .max(50, "A senha deve ter no máximo 50 caracteres."),
  birthDate: Yup.date().required("Digite a sua data de nascimento."),
  street: Yup.string()
    .min(5, "A rua deve conter no mínimo 5 caracteres")
    .required("Digite a rua."),
  zipcode: Yup.string()
    .matches(/^[0-9]{8}$/, "O CEP deve conter 8 números")
    .required("Digite o CEP.")
    .typeError("Digite somente números."),
  neighborhood: Yup.string()
    .min(5, "O bairro deve conter no mínimo 5 caracteres")
    .required("Digite o bairro."),
  country: Yup.string()
    .min(5, "O país deve conter no mínimo 5 caracteres")
    .required("Digite o país."),
  number: Yup.string()
    .min(1, "O número deve conter pelo menos 1 caractere")
    .max(4, "O número deve conter no máximo 4 caracteres")
    .required("Digite o número da sua casa."),
});

export function SignUp() {
  const navigate = useNavigate();

  const { signUp } = useAuth();

  const form = useFormik<UserSignUp>({
    initialValues: {
      email: "",
      password: "",
      birthDate: "",
      street: "",
      number: "",
      country: "",
      zipcode: "",
      neighborhood: "",
      name: "",
    },
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        await signUp(values);
        navigate("/");
        toast.success("Cadastro realizado com sucesso!");
      } catch (ex) {
        alert(ex);
        setFieldError("password", "Usuário inválido");
      }
    },
  });
  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="md:mx-auto w- md:w-full md:max-w-md">
          <Zap className="h-10 w-10 text-primary mx-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight font-heading">
            Criar uma conta
          </h2>
        </div>

        <div className="mt-10 md:mx-auto md:w-full md:max-w-md">
          <FormikProvider value={form}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <div className="mt-2">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Insira seu nome"
                    autoComplete="name"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between md:space-x-2">
                <div className="w-full md:w-1/2">
                  <Label htmlFor="email">Endereço de email</Label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <div>
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <div className="mt-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Senha"
                      autoComplete="current-password"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="birthDate">Data de nascimento</Label>
                <div className="mt-2">
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="text"
                    placeholder="Digite seu estado"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between md:space-x-2">
                <div className="w-full md:w-1/2">
                  <Label htmlFor="street">Rua</Label>
                  <div className="mt-2">
                    <Input
                      id="street"
                      name="street"
                      type="text"
                      placeholder="Digite sua rua"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <div>
                    <Label htmlFor="number">Número</Label>
                  </div>
                  <div className="mt-2">
                    <Input
                      id="number"
                      name="number"
                      type="text"
                      placeholder="Digite nº da sua casa"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="neighborhood">Bairro</Label>
                <div className="mt-2">
                  <Input
                    id="neighborhood"
                    name="neighborhood"
                    type="text"
                    placeholder="Digite seu bairro"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between md:space-x-2">
                <div className="w-full md:w-1/2">
                  <Label htmlFor="country">País</Label>
                  <div className="mt-2">
                    <Input
                      id="country"
                      name="country"
                      type="text"
                      placeholder="Digite seu país"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <div>
                    <Label htmlFor="zipcode">Código postal</Label>
                  </div>
                  <div className="mt-2">
                    <Input
                      id="zipcode"
                      name="zipcode"
                      type="text"
                      placeholder="Digite seu CEP"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  onClick={form.submitForm}
                  className="flex w-full justify-center"
                >
                  Criar conta
                </Button>
              </div>
            </div>
          </FormikProvider>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <Link to="/signin" className="font-semibold text-primary">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
