import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/SkeletonCard"; // Usa tu SkeletonCard

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => {
        setSellers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching top sellers:", err);
      });
  }, []);

  return (
    <section className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Top Sellers</h2>
            <div className="small-border"></div>
          </div>
        </div>

        {loading
          ? [...Array(12)].map((_, index) => (
              <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4" key={index}>
                <Skeleton width="100%" height="80px" />
              </div>
            ))
          : sellers.map((seller, index) => (
              <div
                className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4 d-flex align-items-center gap-3"
                key={index}
              >
                <Link to={`/author/${seller.authorId}`} className="author_list_pp">
                  <img className="lazy" src={seller.authorImage} alt={seller.authorName} />
                  <i className="fa fa-check"></i>
                </Link>
                <div>
                  <Link to={`/author/${seller.authorId}`}>
                    <h5 className="mb-0">{seller.authorName}</h5>
                  </Link>
                  <p className="mb-0">{seller.price.toFixed(1)} ETH</p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default TopSellers;
