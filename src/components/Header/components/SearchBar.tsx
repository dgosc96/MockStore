import { CgSearch } from "react-icons/cg";

export const SearchBar = () => {
  return (
    <div className=" mx-2 box-border flex max-w-sm flex-auto justify-items-stretch divide-x-2 divide-solid rounded-full bg-white px-2.5 py-1 text-slate-500">
      <input
        type="text"
        className="w-0 flex-grow focus:outline-none"
        placeholder="Search for the product"
      ></input>
      <button className="pl-1 ">
        <CgSearch size="1rem" className=" m-auto " />
      </button>
    </div>
  );
};
