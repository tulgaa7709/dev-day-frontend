import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import { BlogCard } from "@/components/BlogCard";
import { CategoryItem } from "@/components/CategoryItem";
import { CategoryIcon, PlusIcon } from "@/components/svg";

import sdk from "@/sdk";

export default function PostListPage() {
  const router = useRouter();
  const { categoryId } = router.query;

  const { data: categories } = useQuery({
    queryKey: "getCategoryList",
    queryFn: () => sdk.getCategoryList(),
  });

  const { data: blogList, isLoading } = useQuery({
    queryKey: ["getBlogList", categoryId],
    queryFn: () => sdk.getBlogList({ categoryId: categoryId?.toString() }),
  });

  const selectedCategory = useMemo(() => {
    if (categoryId === "all") {
      return "all";
    } else {
      return categories?.getCategoryList?.find((a) => a._id === categoryId)
        ?._id;
    }
  }, [categoryId, categories]);

  return (
    <main className="max-w-[1280px] mx-auto px-10 pb-20">
      <Head>
        <title>Blog</title>
      </Head>
      <h1 className="text-center font-bold text-7xl my-20">Our blogs</h1>
      <div className="grid grid-cols-4 gap-10">
        {/* CATEGORY LIST */}
        <section className="">
          <h3 className="text-[#939393] flex items-center gap-2">
            <CategoryIcon />
            Category
          </h3>
          <div className="grid gap-2 mt-9">
            <CategoryItem
              url="/all"
              text="All post"
              isSelected={selectedCategory === "all"}
            />
            {categories?.getCategoryList?.map((category) => (
              <CategoryItem
                key={category._id}
                url={`/${category._id}`}
                text={category?.name ?? "No title"}
                isSelected={!!(category._id === selectedCategory)}
              />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-3 col-span-3 gap-5">
          {/* BLOG LIST HEADER */}
          <div className="flex justify-between col-span-3">
            <h1 className="text-2xl font-semibold">All Posts</h1>
            <Link href="/create">
              <button className="primary_button">
                <PlusIcon />
                Create
              </button>
            </Link>
          </div>
          {/* BLOG LIST */}
          {isLoading && <>Loading...</>}
          {blogList?.getBlogList?.map((blog) => (
            <BlogCard
              key={blog?._id}
              categoryUrl={`/${blog?.category._id}`}
              url={"/post/" + blog?._id}
              category={blog?.category.name ?? "-"}
              title={blog?.title ?? "-"}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
