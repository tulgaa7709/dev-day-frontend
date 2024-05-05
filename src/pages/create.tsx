import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

import { Select } from "@/components/Select";
import { CheckIcon } from "@/components/svg";
import { Loading } from "@/components/Loading";
import { FormItem } from "@/components/FormItem";
import { LeftArrowIcon } from "@/components/svg/LeftArrowIcon";

import sdk from "@/sdk";
import { CreateBlogInput } from "@/graphql";

const CreatePostPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control } = useForm<CreateBlogInput>();

  const { data: categories, isLoading } = useQuery({
    queryKey: "getCategoryList",
    queryFn: () => sdk.getCategoryList(),
  });

  const submit = (formData: CreateBlogInput) => {
    setLoading(true);
    sdk
      .createBlog({
        blog: {
          title: formData.title,
          summary: formData.summary,
          category: formData.category,
        },
      })
      .then((res) => {
        if (res.createBlog) {
          toast.success("Successfully");
          router.push("/" + formData.category);
        } else {
          toast.success("Failed");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="pb-20">
      <h1 className="text-center font-bold text-7xl my-20">Create blog</h1>
      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-[750px] mx-auto grid gap-5 relative"
      >
        {loading || (isLoading && <Loading />)}
        {/* CATEGORY */}
        <FormItem label="Category">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onSelect={(_value) => field.onChange(_value)}
                placeholder="Choose category"
                items={(categories?.getCategoryList ?? []).map((category) => ({
                  text: category?.name ?? "",
                  value: category?._id ?? "",
                }))}
              />
            )}
          />
        </FormItem>
        {/* POST TITLE */}
        <FormItem label="Post title">
          <input
            {...register("title")}
            className="bg-[#333333] border border-gray-500 rounded-xl leading-[60px] px-5"
          />
        </FormItem>
        {/* SUMMARY */}
        <FormItem label="Summary">
          <textarea
            rows={10}
            {...register("summary")}
            className="bg-[#333333] border border-gray-500 rounded-xl px-5 py-2"
          />
        </FormItem>
        {/*  BUTTONS */}
        <div className="flex justify-between">
          <Link href="/all">
            <button
              className="primary_button bg-[#333] text-white"
              type="submit"
            >
              <LeftArrowIcon />
              Back to list
            </button>
          </Link>
          <button className="primary_button" type="submit">
            <CheckIcon />
            Save
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreatePostPage;
