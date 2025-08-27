import React from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "./UI/CountdownTimer";

const NFTCard = ({ item }) => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator: ${item.author}`}
        >
          <img className="lazy" src={item.authorImage} alt={item.author} />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

      <div className="nft__item_wrap">
        <Link to={`/item-details/${item.id}`}>
          <img
            src={item.nftImage}
            className="lazy nft__item_preview"
            alt={item.title}
          />
        </Link>
      </div>

      <div className="nft__item_info">
        <Link to={`/item-details/${item.id}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price?.toFixed(2)} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
};
export default NFTCard;
