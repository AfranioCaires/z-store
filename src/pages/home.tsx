import { useEffect, useState } from "react"; 
import { client } from "@/network/api";
import ProductCard from "@/components/product-card";
import { Product } from "@/interfaces/product";

export function Home() {
  const [data, setData] = useState<Product[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.get<Product[]>("products");
        setData(response.data); 
      } catch (err) {
        setError("Erro ao buscar produtos."); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts(); 
  }, []);

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>{error}</div>; 

  return (
    <>
      <main className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-primary-foreground pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight">
            Catálogo de produtos <span className="text-primary">.</span>
          </h1>
        </div>
        <div>
          <div className="mx-auto container px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {data.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  imageSrc={product.imageSrc}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
