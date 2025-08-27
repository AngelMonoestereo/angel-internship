import React, { useEffect, useState } from "react";
import axios from "axios";
import NFTCard from "../components/NFTCard"; // Asegúrate que el path esté bien
import SkeletonCard from "../components/UI/SkeletonCard";


const Explore = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("default");

  const fetchExploreItems = async (filterType = "default") => {
    setLoading(true);
    let apiUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

    if (filterType === "likes") {
      apiUrl += "?filter=likes_high_to_low";
    } else if (filterType === "price_low_to_high") {
      apiUrl += "?filter=price_low_to_high";
    } else if (filterType === "price_high_to_low") {
      apiUrl += "?filter=price_high_to_low";
    }

    try {
      const { data } = await axios.get(apiUrl);
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch Explore items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExploreItems(filter);
  }, [filter]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    setVisibleCount(8); // reset pagination
  };

  return (
    <section id="explore">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-12 d-flex justify-content-start">
            <select className="form-select w-auto" onChange={handleFilterChange}>
              <option value="default">Default</option>
              <option value="price_low_to_high">Price: Low to High</option>
              <option value="price_high_to_low">Price: High to Low</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>
        </div>

        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, idx) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={idx}>
                  <SkeletonCard />
                </div>
              ))
            : items.slice(0, visibleCount).map((item) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item.id}>
                  <NFTCard item={item} />
                </div>
              ))}
        </div>

        {!loading && visibleCount < items.length && (
          <div className="row">
            <div className="col-lg-12 text-center">
              <button onClick={handleLoadMore} className="btn btn-primary">
                Load More
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Explore;
