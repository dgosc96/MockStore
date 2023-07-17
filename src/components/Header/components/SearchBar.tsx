import { CgSearch } from 'react-icons/cg';

export const SearchBar = () => {
    return (
        <div className='max-w-sm space-x-1 justify-items-stretch divide-x-2 flex-auto flex divide-solid bg-white text-slate-500 py-1 px-4 rounded-full mx-2'>
            <input
                type='text'
                className='focus:outline-none w-0 flex-grow'
                placeholder='Search for the product'></input>
            <button className='pl-1 min-w-[2rem] w-fit'>
                <CgSearch size='20px' className=' m-auto ' />
            </button>
        </div>
    );
};
