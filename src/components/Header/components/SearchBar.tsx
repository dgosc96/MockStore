import { useEffect, useRef, useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { Oval as LoadingSpinner } from 'react-loader-spinner';
import { IoIosArrowForward as ArrowForwardIcon } from 'react-icons/io';
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useProductList, useCategories } from '../../../adapters/products';
import { ROUTER_PATH } from '../../../routes';
import { processSearchTerm, searchProducts } from '../../../lib/search/search';

export const SearchBar = () => {
  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(true);
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
      className='relative max-w-md flex-1 outline-neutral-400'
    >
      <div
        onMouseDown={handleFocus}
        className={`flex h-10 items-center overflow-hidden rounded-[1.25rem] bg-white/50 text-neutral-600 ${isFocused && 'rounded-b-none outline outline-1 outline-inherit '}`}
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
          className={`h-full w-10 flex-none transition-colors hover:bg-neutral-200`}
        >
          <CgSearch size='1.5rem' className='ml-1 text-neutral-600  ' />
        </button>
      </div>
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
      className='absolute top-10 w-full overflow-hidden rounded-b-[1.25rem] bg-neutral-100 outline outline-1 outline-inherit backdrop-blur-3xl'
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
    <ul className='py-1'>
      <p className='px-2 py-1 text-xs font-medium text-neutral-400'>
        Categories:
      </p>
      {categoriesStatus === 'pending' && <SearchBarLoadingIndicator />}
      {categoriesStatus === 'success' &&
        categories.map((category, index) => (
          <li key={`category-${index}`} className='hover:bg-neutral-200'>
            <Link
              to={ROUTER_PATH.PRODUCT_LIST}
              className='line-clamp-1 flex items-center justify-between px-3 py-1 '
            >
              {/* Make first letter uppercase */}
              {category.charAt(0).toUpperCase() + category.slice(1)}
              <ArrowForwardIcon size={20} className='min-w-fit' />
            </Link>
          </li>
        ))}
    </ul>
  );
};

const ProductSuggestions = (props: { processedSearchTerm: string[] }) => {
  const initialListLimit = 5;
  const [listLimit, setListLimit] = useState<number>(initialListLimit);
  const { data: products, status: productsStatus } = useProductList();

  const handleShowMore = () => setListLimit((prev) => prev + 5);
  const handleShowLess = () => setListLimit((prev) => prev - 5);

  if (productsStatus === 'pending') return <SearchBarLoadingIndicator />;

  if (productsStatus === 'error') return <div>Oops! Something went wrong</div>;

  if (productsStatus === 'success') {
    const searchResult = searchProducts(products, props.processedSearchTerm);

    return (
      <ul className='py-1'>
        {searchResult.length === 0 ? (
          <li className='text-center'>No results</li>
        ) : (
          <>
            <p className='px-2 py-1 text-xs font-medium text-neutral-400'>
              {`Search result: (${searchResult.length} item${searchResult.length > 1 ? 's' : ''})`}
            </p>
            {searchResult.slice(0, listLimit).map((product) => (
              <li
                key={'filteredProduct_' + product.id}
                className='hover:bg-neutral-200'
              >
                <Link
                  className=' flex items-center justify-between px-3 py-1'
                  to={`${ROUTER_PATH.PRODUCT_DETAILS}/${product.id}`}
                >
                  <span className='line-clamp-1'>{product.title}</span>
                  <ArrowForwardIcon size={20} className='min-w-fit' />
                </Link>
              </li>
            ))}
            {searchResult.length > initialListLimit && (
              <li className='flex justify-between px-5 py-1 text-sm text-neutral-400 underline-offset-2'>
                <div>
                  {listLimit > initialListLimit && (
                    <button
                      className='hover:underline'
                      onClick={handleShowLess}
                    >{`show less`}</button>
                  )}
                </div>
                {searchResult.length > listLimit && (
                  <button
                    className='hover:underline'
                    onClick={handleShowMore}
                  >{`show more`}</button>
                )}
              </li>
            )}
          </>
        )}
      </ul>
    );
  }
};

const SearchBarLoadingIndicator = () => {
  return (
    <LoadingSpinner
      strokeWidth={6}
      color='#a3a3a3'
      secondaryColor='#a3a3a3'
      wrapperClass='child:m-auto m-2 child:h-8'
    />
  );
};
