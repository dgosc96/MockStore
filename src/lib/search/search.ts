import type { TProduct } from '../../adapters/products';

export const processSearchTerm = (searchTerm: string) =>
  searchTerm
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .split(' ')
    .filter((val) => val != '');

export const searchProducts = (
  products: TProduct[],
  processedSearchTerm: string[],
) => {
  console.log('processedSearchTerm: ' + processedSearchTerm);
  return products.filter((prod) => {
    const prodCombinedText = `${prod.title} ${prod.category} ${prod.description}`;
    return processedSearchTerm.some((searchWord) =>
      prodCombinedText.toLowerCase().includes(searchWord),
    );
  });
};
