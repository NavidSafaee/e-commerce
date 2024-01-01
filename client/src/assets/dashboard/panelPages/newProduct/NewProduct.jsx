import "./NewProduct.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { products } from "../../datas";
import { xAxisData } from "../../datas";

export default function NewProduct() {
  const [productsData, setProductsData] = useState(products);
  const [xAxisDataData, setxAxisDataData] = useState(xAxisData);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },

    // {
    //   field: "avatar",
    //   headerName: "Product",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <Link to={`/product/${params.row.id}`} className="link">
    //         <div className="userListUser">
    //           <img src={params.row.avatar} className="userListImg" />
    //         </div>
    //       </Link>
    //     );
    //   },
    // },
    {
      field: "title",
      headerName: "Name",
      width: 80,
    },
    {
      field: "received",
      headerName: "Received",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "price",
      headerName: "TotalPrice",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin-panel/user/${params.row.id}`} className="link">
              <button className="userListEdit">More</button>
            </Link>
            {/* <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => userDelete(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="customerOrdersList">
        <div className="customerOrdersListBottom">
          <div className="customerOrdersListOrders">
            <DataGrid
              rows={productsData}
              columns={columns}
              disableSelectionOnClick
              pageSize={3}
            />
          </div>
        </div>
      </div>
      {document
            .querySelectorAll(".MuiDataGrid-cellContent")
            .forEach((div) => {
              if (div.innerHTML == "false") {
                div.style.fontSize = "18px";
                div.style.fontWeight = "600";
                div.style.color = "rgb(255, 31, 31)";
                // div.style.textShadow = "1px 1px 10px rgb(255, 31, 31)";
              } else if (div.innerHTML == "true") {
                div.style.fontSize = "18px";
                div.style.fontWeight = "600";
                div.style.color = "#3bb077";
                // div.style.textShadow = "1px 1px 1px #3bb077";

              }
            })}

      {/* <div className="form">
        <form>
          <input
            type="text"
            className="todo-input"
            maxLength="40"
          />
          <button className="todo-button" type="submit">
            <i className="fas fa-plus-square"></i>
          </button>
          <div className="select">
           
          </div>
        </form>
      </div> */}
    </>
  );
}
