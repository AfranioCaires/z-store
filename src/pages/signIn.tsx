import { Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { useAuth } from "@/hooks/auth";

interface UserSignIn {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required("Digite o seu email.").email(),
  password: Yup.string().required("Digite sua senha."),
});

export function SignIn() {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const form = useFormik<UserSignIn>({
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
      <div className="flex min-h-[80svh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="md:mx-auto md:w-full md:max-w-md">
          <Zap className="h-10 w-10 mx-auto text-primary" />
          <h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight font-heading">
            Entre na sua conta
          </h2>
        </div>
        <FormikProvider value={form}>
          <div className="mt-10 md:mx-auto md:w-full md:max-w-md">
            <div className="space-y-6">
              <div>
                <Label htmlFor="email">Endereço de email</Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Senha"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  onClick={form.submitForm}
                  className="flex w-full justify-center"
                >
                  Entrar
                </Button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-muted-foreground">
              Não possui uma conta?{" "}
              <Link to="/signup" className="font-semibold text-primary">
                Criar uma conta
              </Link>
            </p>
          </div>
        </FormikProvider>
      </div>
    </>
  );
}
