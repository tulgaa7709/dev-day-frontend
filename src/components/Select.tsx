import classNames from "classnames";
import React, { useMemo, useState } from "react";
import { AngleIcon } from "./svg";

export type SelectProps = {
  value?: string;
  placeholder?: string;
  onSelect: (value: string) => void;
  items: { text: string; value: string }[];
};

export const Select = ({
  value,
  items,
  placeholder,
  onSelect,
}: SelectProps) => {
  const [show, setShow] = useState(false);
  const selectedText = useMemo(
    () => items?.find((a) => a.value === value)?.text,
    [items, value]
  );
  return (
    <div className="cursor-pointer relative bg-[#333333] border border-gray-500 rounded-xl">
      <div
        className="h-[60px] px-5 flex items-center justify-between"
        onClick={() => setShow(!show)}
      >
        {value ? (
          selectedText
        ) : (
          <span className="text-[#939393]">{placeholder}</span>
        )}
        <AngleIcon />
      </div>
      {show && (
        <div className={classNames("absolute pt-2 w-full")}>
          <div
            className={classNames(
              "bg-[#000000] border border-[#939393] rounded-xl w-full max-h-[200px] overflow-y-auto"
            )}
          >
            {items?.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  onSelect(item.value);
                  setShow(false);
                }}
                className="px-5 py-3 hover:bg-[#33333370]"
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
