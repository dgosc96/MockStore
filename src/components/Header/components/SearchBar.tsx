import { useEffect, useRef, useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { Oval as LoadingSpinner } from 'react-loader-spinner';
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useProductList, useCategories } from '../../../adapters/products';
import { ROUTER_PATH } from '../../../navigation';
import { processSearchTerm, searchProducts } from '../../../lib/search/search';

export const SearchBar = () => {
  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleBlur = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  const handleSearchBtn = () => {
    const searchTerm = processSearchTerm(value);
    if (value.trim() === '') {
      return;
    }
    const URLSearchParams = createSearchParams({
      search: searchTerm.join(' '),
    });

    navigate({
      pathname: ROUTER_PATH.PRODUCT_LIST,
      search: `?${URLSearchParams.toString()}`,
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleBlur);
    return () => document.removeEventListener('mousedown', handleBlur);
  }, [searchBarRef]);

  useEffect(() => setIsFocused(false), [location]);

  return (
    <div
      ref={searchBarRef}
      onMouseDown={handleFocus}
      className={`relative flex h-10 w-1 max-w-md flex-1 items-center rounded-2xl border-neutral-500 bg-white/50 text-neutral-600 ${isFocused && 'rounded-b-none bg-neutral-100/50 outline outline-2 outline-neutral-400'}`}
    >
      <input
        type='text'
        ref={inputRef}
        placeholder='Search MockStore'
        onChange={(e) => setValue(e.target.value)}
        className={`ml-3 h-full w-1 flex-1 bg-transparent outline-none transition-all placeholder:text-neutral-500`}
      />
      <button
        type='button'
        onClick={handleSearchBtn}
        className={`h-full w-9 flex-none rounded-r-2xl transition-colors hover:bg-neutral-600/10 ${isFocused && ' rounded-br-none'}`}
      >
        <CgSearch size='1.5rem' className='ml-1 text-neutral-600  ' />
      </button>
      {isFocused && <SearchSuggestions searchTerm={value} />}
    </div>
  );
};

type SearchSuggestionsProps = {
  searchTerm: string;
  onHover?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const SearchSuggestions = (props: SearchSuggestionsProps) => {
  const processedSearchTerm = processSearchTerm(props.searchTerm);

  return (
    <div
      onMouseDown={props.onHover}
      className='absolute top-10 w-full rounded-b-md bg-neutral-100 px-2 outline outline-2 outline-inherit backdrop-blur-3xl'
    >
      {processedSearchTerm.length === 0 ? (
        <CategorySuggestions />
      ) : (
        <ProductSuggestions processedSearchTerm={processedSearchTerm} />
      )}
    </div>
  );
};

const CategorySuggestions = () => {
  const { data: categories, status: categoriesStatus } = useCategories();

  return (
    <ul>
      {categoriesStatus === 'pending' && (
        <LoadingSpinner strokeWidth={6} wrapperClass='child:m-auto child:h-8' />
      )}
      {categoriesStatus === 'success' &&
        categories.map((category, index) => (
          <li key={`category-${index}`}>{category}</li>
        ))}
    </ul>
  );
};

const ProductSuggestions = (props: { processedSearchTerm: string[] }) => {
  const { data: products, status: productsStatus } = useProductList();

  if (productsStatus === 'pending')
    return (
      <LoadingSpinner strokeWidth={6} wrapperClass='child:m-auto child:h-8' />
    );

  if (productsStatus === 'error') return <div>Oops! Something went wrong</div>;

  if (productsStatus === 'success') {
    const searchResult = searchProducts(products, props.processedSearchTerm);

    return (
      <ul>
        {searchResult.length === 0 ? (
          <li>No results for given phrase</li>
        ) : (
          <>
            {searchResult.slice(0, 5).map((product) => (
              <li className='' key={'filteredProduct_' + product.id}>
                <Link
                  className=' my-2 line-clamp-1'
                  to={`${ROUTER_PATH.PRODUCT_DETAILS}/${product.id}`}
                >
                  {product.title}
                </Link>
              </li>
            ))}
            {searchResult.length > 5 && (
              <li>{`${searchResult.length - 5} more items...`}</li>
            )}
          </>
        )}
      </ul>
    );
  }
};
