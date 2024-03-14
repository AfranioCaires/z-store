import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  imageSrc: string[];
  name: string;
  price: number;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <>
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-primary-foreground lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={props.imageSrc[0]}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              <Link to={`/products/${props.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {props.name}
              </Link>
            </h3>
          </div>
          <p className="text-sm font-medium">R$ {props.price}</p>
        </div>
      </div>
    </>
  );
}
