import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTopSellers = () => {
  return (
    <li className="author_list" style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
      <Skeleton circle height={50} width={50} />
      <div style={{ flexGrow: 1 }}>
        <Skeleton width={120} height={15} />
      </div>
      <div style={{ textAlign: "right" }}>
        <Skeleton width={50} height={15} />
      </div>
    </li>
  );
};

export default SkeletonTopSellers;
