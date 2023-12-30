import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "./User.css";

import { products } from "../../datas";

export default function Product() {
  const [productsData, setProductsData] = useState(products);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },

    {
      field: "avatar",
      headerName: "Product",
      width: 150,
      renderCell: (params) => {
        return (
          <Link to={`/product/${params.row.id}`} className="link">
            <div className="userListUser">
              <img src={params.row.avatar} className="userListImg" />
            </div>
          </Link>
        );
      },
    },
    {
      field: "title",
      headerName: "Name",
      width: 80,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
  ];

  return (
    <div className="user">
      <div className="productTitleContainer">
        <h1 className="productTitle">user info</h1>
      </div>

      <div className="userTop">
        <div className="userInfiTop">
          <div className="userInfiTopLeft">
            <div className="userInfoItemRow">
              <div className="productInfoKey">ID: </div>
              <div className="productInfoValue">132</div>
            </div>
            <div className="userInfoItemRow">
              <div className="productInfoKey">Name: </div>
              <div className="productInfoValue">Sehya</div>
            </div>
            <div className="userInfoItemRow">
              <div className="productInfoKey">Email: </div>
              <div className="productInfoValue">Sehya@gmail.com</div>
            </div>
          </div>

          <div className="userTopRight">
            <div className="userInfoItemRow">
              <div className="productInfoKey">Address: </div>
              <div className="productInfoValue">Tebriz</div>
            </div>
            <div className="userInfoItemRow">
              <div className="productInfoKey"> Gender: </div>
              <div className="productInfoValue">female</div>
            </div>
            <div className="userInfoItemRow">
              <div className="productInfoKey"> Gender: </div>
              <div className="productInfoValue">female</div>
            </div>
            <div className="blockBtn">
              <button className="block">block</button>
              <button className="unblock">unblock</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>users orders</h1>
      </div>

      <div className="userBottom">
        <div className="userOrders">
          <DataGrid
            rows={productsData}
            columns={columns}
            disableSelectionOnClick
            pageSize={3}
          />
        </div>

        <div className="userComments"></div>
      </div>
    </div>
  );
}
