import { QueryConfig } from "@/hooks/useQueryConfig";
import { Category } from "@/types/category.type";
import { NoUndefinedField } from "@/types/utils.type";
import { Schema, schema } from "@/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputNumber from "../InputNumber";
import Button from "../Button";
import RatingStars from "../RatingStars";
import { ProductListConfig } from "@/types/product.type";

interface Props {
  queryConfig: ProductListConfig;
  categories: Category[];
}

type FormData = NoUndefinedField<Pick<Schema, "price_max" | "price_min">>;
/**
 * Rule validate
 * Nếu có price_min và price_max thì price_max >= price_min
 * Còn không thì có price_min thì không có price_max và ngược lại
 */

const priceSchema = schema.pick(["price_min", "price_max"]);

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { t } = useTranslation("home");
  const { category } = queryConfig;
  const router = useRouter();
  const { query } = router;
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      price_min: "",
      price_max: "",
    },
    resolver: yupResolver(priceSchema),
  });
  const onSubmit = handleSubmit((data) => {
    router.push({
      pathname: "/products",
      query: {
        ...query,
        price_max: data.price_max,
        price_min: data.price_min,
      },
    });
  });

  return (
    <div className="py-4">
      <Link
        href={"/"}
        className={classNames("flex items-center font-bold", {
          "text-orange": !category,
        })}
      >
        <svg viewBox="0 0 12 10" className="w-3 h-4 mr-3 fill-current">
          <g fillRule="evenodd" stroke="none" strokeWidth={1}>
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        {/* {t("aside filter.all categories")} */}
        Tất cả danh mục
      </Link>
      <div className="my-4 h-[1px] bg-gray-300" />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id;
          return (
            <div className="py-2 pl-2" key={categoryItem._id}>
              <Link
                href={{
                  pathname: "/products",
                  query: { ...query, category: categoryItem._id },
                }}
                className={classNames("relative px-2", {
                  "font-semibold text-orange": isActive,
                })}
              >
                {isActive && (
                  <svg
                    viewBox="0 0 4 7"
                    className="absolute top-1 left-[-10px] h-2 w-2 fill-orange"
                  >
                    <polygon points="4 3.5 0 0 0 7" />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </div>
          );
        })}
      </ul>
      <Link href={"/"} className="flex items-center mt-4 font-bold uppercase">
        <svg
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x={0}
          y={0}
          className="w-3 h-4 mr-3 fill-current stroke-current"
        >
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        {/* {t("aside filter.filter search")} */}
        Bộ lọc tìm kiếm
      </Link>
      <div className="my-4 h-[1px] bg-gray-300" />
      <div className="my-5">
        <div>Khoảng giá</div>
        <form className="mt-2" onSubmit={onSubmit}>
          <div className="flex items-start">
            <Controller
              control={control}
              name="price_min"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    className="grow"
                    placeholder="₫ TỪ"
                    classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                    classNameError="hidden"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("price_max");
                    }}
                  />
                );
              }}
            />
            {/* <InputV2
              control={control}
              name='price_min'
              type='number'
              className='grow'
              placeholder='₫ TỪ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              classNameError='hidden'
              onChange={() => {
                trigger('price_max')
              }}
            /> */}

            <div className="mx-2 mt-2 shrink-0">-</div>
            <Controller
              control={control}
              name="price_max"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    className="grow"
                    placeholder="₫ ĐẾN"
                    classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                    classNameError="hidden"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("price_min");
                    }}
                  />
                );
              }}
            />
          </div>
          <div className="mt-1 min-h-[1.25rem] text-center text-sm text-red-600">
            {errors.price_min?.message}
          </div>
          <Button className="flex items-center justify-center w-full p-2 text-sm text-white uppercase bg-orange hover:bg-orange/80">
            Áp dụng
          </Button>
        </form>
      </div>
      <div className="my-4 h-[1px] bg-gray-300" />
      <div className="text-sm">Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className="my-4 h-[1px] bg-gray-300" />
      <button
        onClick={() => {
          router.push("/products", undefined, { shallow: true });
        }}
        className="flex items-center justify-center w-full p-2 text-sm text-white uppercase bg-orange hover:bg-orange/80"
      >
        Xóa tất cả
      </button>
    </div>
  );
}
