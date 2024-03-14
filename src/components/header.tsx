import { Zap, User } from "lucide-react";
import { Button } from "./ui/button";
import { Cart } from "./cart";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <header className="py-4 border sticky top-0 bg-white z-10 backdrop-filter backdrop-blur-lg bg-opacity-50 border-b ">
        <nav className="container flex justify-between items-center">
          <Link to="/">
            <Button size={"icon"} variant={"ghost"}>
              <Zap className="text-primary" />
            </Button>
          </Link>
          <ul className="flex gap-3">
            <li>
              <Button size={"icon"} variant={"ghost"}>
                <User className="size-5" />
              </Button>
            </li>
            <li>
              <Cart />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
