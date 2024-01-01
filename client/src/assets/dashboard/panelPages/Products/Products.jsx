import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { products } from "../../datas";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./Products.css";
import SearchIcon from "@mui/icons-material/Search";

var productIdPage = null;

export default function Products() {
  const [productsData, setProductsData] = useState(products);

  const productDelete = (productID) => {
    setProductsData(productsData.filter((product) => product.id != productID));
  };

  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 90,
    // },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      renderCell: (params) => {
        return (
          <Link to={`/productInfo/${params.row.id}`} className="link">
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
      width: 120,
    },
   
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "date",
      headerName: "Date",
      width: 180,
    },
    {
      field: "received",
      headerName: "Received",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        productIdPage = params.row.id;

        return (
          <>
            <Link to={`/admin-panel/productInfo/${params.row.id}`} className="link">
              <button className="userListEdit">Edit</button>
            </Link>

            {/* <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => productDelete(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="userList">
        <div className="productNavigationBar">
          <div className="categoryButtons">
            <button className="categoryBtns">Sofa</button>
            <button className="categoryBtns">chairLavender</button>
            <button className="categoryBtns">cabinet Console</button>
            <button className="categoryBtns">Ceiling</button>
            <button className="categoryBtns">Lamp shades</button>
          </div>
          <div className="topbarSearchContainer">
            <input
              type="text"
              className="searchInputAdminPanel"
              placeholder="Search"
            />
            <SearchIcon className="SearchIconAdmin" />
          </div>
        </div>
        <DataGrid className="DataGridTable"
          rows={productsData}
          columns={columns}
          disableSelectionOnClick
          pageSize={3}
          // checkboxSelection
        />
      </div>
    </>
  );
}
export { productIdPage };
