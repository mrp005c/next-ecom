import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonProduct = () => {
  let a = "rakibismynamer";
  const array = Array.from(a);
  return (
      <div className="flex-center flex-wrap gap-5 ">
        {array.map((e, ind) => (
          <div key={ind} className="flex flex-col space-y-3 w-[350px]">
            <Skeleton className="h-[225px] w-[350px] bg-gray-200 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4  bg-gray-200" />
              <Skeleton className="h-6 w-3/5  bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
  );
};

export default SkeletonProduct;
