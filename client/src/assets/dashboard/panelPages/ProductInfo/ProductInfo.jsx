import React, { useState } from "react";
import "./ProductInfo.css";
import { productIdPage } from "../Products/Products";
import { products } from "../../datas";
import { userRows } from "../../datas";


export default function Product() {
  const [userRowsData, setuserRowsData] = useState(userRows);
  const [productsData, setProductsData] = useState(products);
  var productDetailes = {};
  productsData.forEach((product) => {
    if (product.id === productIdPage) {
      productDetailes = JSON.stringify({ ...product });
    }
  });
  productDetailes = JSON.parse(productDetailes);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },

    {
      field: "username",
      headerName: "Name",
      width: 180,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "transaction",
      headerName: "Transaction",
      width: 120,
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 120,
    },
   
  ];

  const editeBtn = (event) => {
    document.querySelectorAll(".productInfoValueInput").forEach(input=>{
      input.disabled=false;
      input.style.border='1px solid red ';
      input.value=''

    })

  };



  const submitEdite=(event=>{

  })

  return (
    <div className="user">
      <div className="productTitleContainer">
        <h1 className="productTitle">product info</h1>
      
      </div>

      <div className="productTop">
        <div className="productInfiTop">
          <img
            id="userImage"
            src={productDetailes.avatar}
            alt=""
            className="productInfoImg"
          />

          <div className="productTopRight">
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <div className="productInfoKey">ID: </div>
                <input
                  className="productInfoValueInput"
                  type="text"
                  placeholder={productDetailes.id}
                  disabled
                />
              </div>
              <div className="productInfoItem">
                <div className="productInfoKey">Name: </div>
                <input
                  className="productInfoValueInput"
                  type="text"
                  placeholder={productDetailes.title}
                  disabled
                />
               
              </div>
              <div className="productInfoItem">
                <div className="productInfoKey">Price: </div>
                <input
                  className="productInfoValueInput"
                  type="text"
                  placeholder={productDetailes.price}
                  disabled
                />
              </div>
              <div className="productInfoItem">
                <div className="productInfoKey">ProducterName: </div>
                <input
                  className="productInfoValueInput"
                  type="text"
                  placeholder={productDetailes.producterN}
                  disabled
                />
              </div>
             
              <div className="blockBtn">
                <button className="block">
                  inactive
                </button>
                <button className="unblock" onClick={editeBtn}>
                  Edite{" "}
                </button>
                <button className="unblock" onClick={submitEdite}>
                  Edite{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}
