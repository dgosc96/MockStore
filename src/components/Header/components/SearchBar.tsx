import { CgSearch } from 'react-icons/cg';

export const SearchBar = () => {
    return (
        <div className=' box-border max-w-sm justify-items-stretch divide-x-2 flex-auto flex divide-solid bg-white text-slate-500 py-1 px-2.5 rounded-full mx-2'>
            <input
                type='text'
                className='focus:outline-none w-0 flex-grow'
                placeholder='Search for the product'></input>
            <button className='pl-1 '>
                <CgSearch size='1rem' className=' m-auto ' />
            </button>
        </div>
    );
};
