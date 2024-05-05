import Link from "next/link";
import classNames from "classnames";

export type CategoryItemProps = {
  text: string;
  url: string;
  isSelected: boolean;
};

export const CategoryItem = ({ url, text, isSelected }: CategoryItemProps) => {
  return (
    <Link
      href={url}
      className={classNames(
        "text-lg leading-10 px-7 py-2 rounded-xl cursor-pointer",
        isSelected
          ? "text-white bg-[#333333]"
          : "text-[#939393] bg-none hover:bg-[#33333350]"
      )}
    >
      {text}
    </Link>
  );
};
