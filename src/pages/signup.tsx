import { Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { FormikProvider, useFormik } from "formik";
import { toast } from "sonner";
import { useAuth } from "@/hooks/auth";
import * as Yup from "yup";

interface UserSignUp {
  name: string;
  email: string;
  password: string;
  bithDate: string;
  street: string;
  number: string;
  country: string;
  zipcode: string;
  neighborhood: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required("Digite o seu email.").email(),
  password: Yup.string().required("Digite sua senha."),
});

export function SignUp() {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const form = useFormik<UserSignUp>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        await signIn(values);
        navigate("/");
        toast.success("Login realizado com sucesso!");
      } catch (ex) {
        alert(ex);
        setFieldError("password", "Usuário inválido");
      }
    },
  });
  return (
    <>
      {/* min-h-screen */}

      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="md:mx-auto w- md:w-full md:max-w-md">
          <Zap className="h-10 w-10 text-primary mx-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight font-heading">
            Criar uma conta
          </h2>
        </div>

        <div className="mt-10 md:mx-auto md:w-full md:max-w-md">
          <FormikProvider value={form}>
            <form className="space-y-6">
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
                <Label htmlFor="date">Data de nascimento</Label>
                <div className="mt-2">
                  <Input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="Digite seu estado"
                    autoComplete="adress"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between md:space-x-2">
                <div className="w-full md:w-1/2">
                  <Label htmlFor="state">Rua</Label>
                  <div className="mt-2">
                    <Input
                      id="street"
                      name="street"
                      type="text"
                      placeholder="Digite sua rua"
                      autoComplete="street-address"
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
                <Label htmlFor="date">Bairro</Label>
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
                  <Label htmlFor="state">País</Label>
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
                    <Label htmlFor="number">Código postal</Label>
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
                <Button type="submit" className="flex w-full justify-center">
                  Criar conta
                </Button>
              </div>
            </form>
          </FormikProvider>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <Link to="/login" className="font-semibold text-primary">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
