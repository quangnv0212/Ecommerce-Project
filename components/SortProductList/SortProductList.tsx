import { QueryConfig } from "@/hooks/useQueryConfig";
import { sortBy, order as orderConstant } from "@/constants/product";
import { ProductListConfig } from "@/types/product.type";
import classNames from "classnames";
import omit from "lodash/omit";
import { useRouter } from "next/router";
import Link from "next/link";
interface Props {
  queryConfig: ProductListConfig;
  pageSize: number;
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page) || 1;
  const { sort_by = sortBy.createdAt, order } = queryConfig;
  const router = useRouter();

  const isActiveSortBy = (
    sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
  ) => {
    return sort_by === sortByValue;
  };

  const handleSort = (
    sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
  ) => {
    router.push(
      {
        pathname: "/products",

        query: omit(
          {
            ...router.query,
            sort_by: sortByValue,
          },
          ["order"]
        ),
      },
      undefined,
      { shallow: true }
    );
  };

  const handlePriceOrder = (
    orderValue: Exclude<ProductListConfig["order"], undefined>
  ) => {
    router.push(
      {
        pathname: "/products",
        query: {
          ...router.query,
          sort_by: sortBy.price,
          order: orderValue,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="px-3 py-4 bg-gray-300/40">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div>Sắp xếp theo</div>
          <button
            className={classNames("h-8 px-4 text-center text-sm capitalize ", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy(
                sortBy.view
              ),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy(
                sortBy.view
              ),
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames("h-8 px-4 text-center text-sm capitalize ", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy(
                sortBy.createdAt
              ),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy(
                sortBy.createdAt
              ),
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames("h-8 px-4 text-center text-sm capitalize ", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy(
                sortBy.sold
              ),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy(
                sortBy.sold
              ),
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames(
              "h-8  px-4 text-left text-sm capitalize  outline-none ",
              {
                "bg-orange text-white hover:bg-orange/80": isActiveSortBy(
                  sortBy.price
                ),
                "bg-white text-black hover:bg-slate-100": !isActiveSortBy(
                  sortBy.price
                ),
              }
            )}
            value={order || ""}
            onChange={(event) =>
              handlePriceOrder(
                event.target.value as Exclude<
                  ProductListConfig["order"],
                  undefined
                >
              )
            }
          >
            <option value="" disabled className="text-black bg-white">
              Giá
            </option>
            <option value={orderConstant.asc} className="text-black bg-white">
              Giá: Thấp đến cao
            </option>
            <option value={orderConstant.desc} className="text-black bg-white">
              Giá: Cao đến thấp
            </option>
          </select>
        </div>

        <div className="flex items-center">
          <div>
            <span className="text-orange">{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className="flex ml-2">
            {page === 1 ? (
              <span className="flex items-center justify-center h-8 rounded-tl-sm rounded-bl-sm shadow cursor-not-allowed w-9 bg-white/60 hover:bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </span>
            ) : (
              <Link
                href={{
                  pathname: "/products",
                  query: { ...router.query, page: Number(page - 1).toString() },
                }}
                className="flex items-center justify-center h-8 bg-white rounded-tl-sm rounded-bl-sm shadow w-9 hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className="flex items-center justify-center h-8 rounded-tl-sm rounded-bl-sm shadow cursor-not-allowed w-9 bg-white/60 hover:bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            ) : (
              <Link
                href={{
                  pathname: "/products",
                  query: {
                    ...router.query,
                    page: (page + 1).toString(),
                  },
                }}
                className="flex items-center justify-center h-8 bg-white rounded-tl-sm rounded-bl-sm shadow w-9 hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
