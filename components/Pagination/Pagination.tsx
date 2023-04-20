import { ProductListConfig } from "@/types/product.type";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  queryConfig: ProductListConfig;
  pageSize: number;
}

/**
Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page

[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20

1 2 ... 4 5 [6] 8 9 ... 19 20

1 2 ...13 14 [15] 16 17 ... 19 20


1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
 */

const RANGE = 2;
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page);
  const router = useRouter();

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={index}
            className="px-3 py-2 mx-2 bg-white border rounded shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            key={index}
            className="px-3 py-2 mx-2 bg-white border rounded shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        // Điều kiện để return về ...
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }

        return (
          <Link
            href={{
              pathname: "/products",
              query: {
                ...router.query,
                page: pageNumber.toString(),
              },
            }}
            key={index}
            className={classNames(
              "mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm",
              {
                "border-cyan-500": pageNumber === page,
                "border-transparent": pageNumber !== page,
              }
            )}
          >
            {pageNumber}
          </Link>
        );
      });
  };
  return (
    <div className="flex flex-wrap justify-center mt-6">
      {page === 1 ? (
        <span className="px-3 py-2 mx-2 border rounded shadow-sm cursor-not-allowed bg-white/60">
          Prev
        </span>
      ) : (
        <Link
          href={{
            pathname: "/products",
            query: {
              ...router.query,
              page: Number(page - 1).toString(),
            },
          }}
          className="px-3 py-2 mx-2 bg-white border rounded shadow-sm cursor-pointer"
        >
          Prev
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className="px-3 py-2 mx-2 border rounded shadow-sm cursor-not-allowed bg-white/60">
          Next
        </span>
      ) : (
        <Link
          href={{
            pathname: "/products",
            query: {
              ...router.query,
              page: Number(page + 1).toString(),
            },
          }}
          className="px-3 py-2 mx-2 bg-white border rounded shadow-sm cursor-pointer"
        >
          Next
        </Link>
      )}
    </div>
  );
}
