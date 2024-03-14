export interface Product {
  id: string;
  name: string;
  price: number;
  imageSrc: string[];
  description: string;
  details: Details;
  color: string[],
  size: string[]
}

interface Details {
  origin: string;
  material: string;
  dimensions: string;
  finish: string;
  includes: string;
  considerations: string;
}
