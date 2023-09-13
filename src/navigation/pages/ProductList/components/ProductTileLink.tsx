import { TProduct } from "../../../../api/products";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "../../..";
import { useState } from "react";

export const ProductTileLink = (props: { data: TProduct }) => {
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const linkPath = `/${ROUTER_PATH.PRODUCT_DETAILS}/${props.data.id}/${props.data.title}`;
  return (
    <Link
      to={linkPath}
      className={`transition-opacity duration-300 ease-linear ${
        !isImgLoaded && "opacity-0"
      }`}
    >
      <div className="mx-auto flex aspect-[4/5] h-[20rem] flex-col gap-1 rounded-xl bg-slate-100 p-3 transition-colors duration-300 ease-out hover:bg-slate-200 ">
        <div className="flex-none basis-3/4 overflow-hidden rounded-xl bg-white">
          <img
            loading="lazy"
            alt={props.data.title}
            onLoad={() => setIsImgLoaded(true)}
            className={`h-full w-full object-contain p-3`}
            src={props.data.image}
          />
        </div>
        <div className="flex basis-1/4 flex-col justify-between">
          <span className="text-md line-clamp-2 ">{props.data.title}</span>
          <div className="flex justify-between">
            <span>${props.data.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
