export const SearchBar = () => {
    return (
        <div className='max-w-sm space-x-1 justify-items-stretch divide-x-2 flex-auto flex divide-solid bg-white text-slate-500 py-1 px-4 rounded-full mx-2 '>
            <input
                type='text'
                className='focus:outline-none w-0  flex-grow'></input>
            <button className='pl-1 w-fit'>Search</button>
        </div>
    );
};
