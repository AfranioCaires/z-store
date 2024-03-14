import { Link } from "react-router-dom";
import { Linkedin, Github, Mail, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function Footer() {
  return (
    <>
      <footer className="p-4  sm:p-6">
        <div className="mx-auto max-w-screen-xl">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Zap className="mr-3 h-8" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6">
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">
                  Mapa do site
                </h2>
                <ul className="text-gray-600">
                  <li className="mb-4">
                    <Link to="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:underline">
                      Sobre
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">
                  Redes sociais
                </h2>
                <ul className="text-gray-600">
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/in/afraniocaires"
                      className="hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-primary-foreground sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">
              © {new Date().getFullYear()}{" "}
              <a href="https://flowbite.com" className="hover:underline">
                z Store™
              </a>
              . Todos os direitos reservados.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex justify-center space-x-4 lg:mt-0">
                    <a href={"https://github.com/afraniocaires"}>
                      <Github />
                    </a>
                    <a href={"https://linkedin.com/in/afraniocaires"}>
                      <Linkedin />
                    </a>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-70">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/afraniocaires.png" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@afraniocaires</h4>
                      <p className="text-sm">Desenvolvedor Front-end.</p>
                      <div className="flex items-center pt-2">
                        <Mail className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                          <a href="mailto: afraniomcaires@gmail.com">
                            afraniomcaires@gmail.com
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
