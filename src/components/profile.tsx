import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogIn, LogOut, User, UserRoundPlus, SquareUser } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/auth";
import { Link } from "react-router-dom";

export function Profile() {
  const { user, signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <User className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center">
          <User className="size-4 mr-2" />{" "}
          {user ? "Minha conta" : "Autenticação"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!user && (
          <>
            <DropdownMenuItem>
              <Link className="flex items" to={"/signup"}>
                <UserRoundPlus className="size-4 mr-2" /> Criar conta
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items" to={"/signin"}>
                <LogIn className="size-4 mr-2" /> Fazer login
              </Link>
            </DropdownMenuItem>
          </>
        )}
        {user && (
          <>
            <DropdownMenuItem><SquareUser className="size-4 mr-2" /> Perfil</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="flex items-center"
            >
              <LogOut className="size-4 mr-2" />
              Log-out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
