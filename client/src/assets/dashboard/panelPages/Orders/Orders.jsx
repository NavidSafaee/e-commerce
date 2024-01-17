import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { products } from "../../datas";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "./Orders.css";

export default function Orders() {

  const [isContentReady, setIsContentReady] = useState(false)
  const [productsData, setProductsData] = useState(products)

  const [isVisible, setIsVisible] = useState(false);
  const [BtnName, setBtnName] = useState("Create");
  const [BtnColor, setBtnColor] = useState({ backgroundColor: "#06a99d" });

  const productDelete = async (productID) => {
    await setIsVisible(true);
    setBtnName("Discord");
    setBtnColor({ backgroundColor: "red" });
    productsData.forEach((pro) => {
      if (pro.id == productID) {
        document.querySelector("#todo-input-title").value = pro.title;
        document.querySelector("#todo-input-price").value = pro.price;
        document.querySelector("#todo-input-date").value = pro.date;
      }
    });

    setProductsData(productsData.filter((product) => product.id != productID));
  }

  const addTodo = (event) => {
    event.preventDefault();
    let productID;
    productsData.forEach((pro) => {
      if (pro.id === productsData.length + 1) {
        productID = productsData.length + 2;
      } else {
        productID = productsData.length + 1;
      }
    });

    const newPro = {
      id: productID,
      title: document.querySelector("#todo-input-title").value,
      avatar: "images/acer.jpg",
      price: document.querySelector("#todo-input-price").value,
      date: document.querySelector("#todo-input-date").value,
      received: true,
    };

    const newItems = [...productsData, newPro];
    setProductsData(newItems);
    document.querySelector("#todo-input-title").value = "";
    document.querySelector("#todo-input-price").value = "";
    document.querySelector("#todo-input-date").value = "";
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "producterN",
      headerName: "producter-Name",
      width: 150,
    },
    {
      field: "re",
      headerName: "Received",
      width: 90,
      renderCell: () => {
        return (
          <div id="chekingChekeBox">
            <input
              type="checkbox"
              className="userListChecked"
              onClick={(event) => check(event)}
            />
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <Link to={`/product/${params.row.id}`} className="link">
            <div className="userListUser">{params.row.title}</div>
          </Link>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin-panel/product/${params.row.id}`} className="link">
              <button className="disabled" disabled>
                Add Product
              </button>
            </Link>
            <ModeEditIcon
              className="userListDelete"
              onClick={() => productDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ]

  const check = (event) => {

    document.querySelectorAll(".disabled").forEach((btn) => {
      if (
        btn.getBoundingClientRect().top < event.clientY + 20 &&
        btn.getBoundingClientRect().top > event.clientY - 20
      ) {
        btn.style.opacity = 1;
        btn.disabled = false;
      }
    })
  }

  const createNewOrderDisplay = () => {
    setIsVisible(!isVisible)
    if (BtnName == "Create") {
      setBtnName("Discord");
      setBtnColor({ backgroundColor: "red" });
    } else {
      setBtnName("Create");
      setBtnColor({ backgroundColor: "#3bb077" });
    }
  };

  return (
    <div className="userList">
      <div className="createBtn">
        <button
          id="productAddButton"
          onClick={createNewOrderDisplay}
          style={BtnColor}
        >
          {BtnName}
        </button>
      </div>

      {isVisible && (
        <div className="OrderFormContainer">
          <form onSubmit={addTodo} className="OrderForm">
            <div className="formRightInputs">
              <input
                type="text"
                id="todo-input-title"
                maxLength="40"
                placeholder="Enter products title"
              />
              <input
                type="text"
                id="todo-input-producterN"
                placeholder="Enter producer name"
              />
            </div>
            <input
              type="number"
              id="todo-input-producterN"
              placeholder="Enter  count"
            />
            <input
              type="text"
              id="todo-input-price"
              maxLength="40"
              placeholder="Enter the price "
            />
            <input type="date" id="todo-input-date" maxLength="40" />
            <div className="formBtn">
              <button className="todo-button" type="submit">
                Done
                <i className="fas fa-plus-square"></i>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
