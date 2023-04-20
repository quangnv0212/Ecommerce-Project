import categoryApi from "@/apis/category.api";
import productApi from "@/apis/product.api";
import AsideFilter from "@/components/AsideFilter";
import Pagination from "@/components/Pagination";
import Product from "@/components/Product";
import SortProductList from "@/components/SortProductList";
import useQueryConfig from "@/hooks/useQueryConfig";
import { ProductListConfig } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

type indexProps = {};
export default function ProductList({ props }: indexProps) {
  const { query } = useRouter();
  const queryConfig: ProductListConfig = query;
  const { data: productsData } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig);
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
  });
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return categoryApi.getCategories();
    },
  });
  console.log(productsData);
  return (
    <div className="py-6 bg-gray-200">
      <Head>
        <title>Trang chủ | Shopee Clone</title>
        <meta name="description" content="Trang chủ dự án Shopee Clone" />
      </Head>
      <div className="container">
        {productsData && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <AsideFilter
                queryConfig={queryConfig}
                categories={categoriesData?.data.data || []}
              />
            </div>
            <div className="col-span-9">
              <SortProductList
                queryConfig={queryConfig}
                pageSize={productsData.data.data.pagination.page_size}
              />
              <div className="grid grid-cols-2 gap-3 mt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {productsData.data.data.products.map((product) => (
                  <div className="col-span-1" key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination
                queryConfig={queryConfig}
                pageSize={productsData.data.data.pagination.page_size}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
