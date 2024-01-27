import { DataGrid } from "@mui/x-data-grid";
import { products } from "../../datas";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import st from "./Products.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import baseURL from "../../../baseURL";
import {
  calcDiscountedPrice,
  isTokenExpired,
  refreshTokenHandler,
} from "../../../functions";
import AuthContext from "../../../components/Context/AuthContext";
import PreLoader from "../../../components/PreLoader/PreLoader";

var productIdPage = null;

export default function Products() {
  const authContext = useContext(AuthContext);

  const [isContentReady, setIsContentReady] = useState(false);
  const [productsDatas, setProductsDatas] = useState([]);

  const getAllProducts = () => {
    // const userToken = JSON.parse(localStorage.getItem("userToken"));
    // if (isTokenExpired(userToken.accessToken)) {
    //   refreshTokenHandler().then((token) => {
    //     authContext.writeTokenInStorage(token);
    //     getAllProducts();
    //   });
    // } else {
    fetch(`${baseURL}/products`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${userToken.accessToken}`,
      // },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductsDatas(data.products);
        setIsContentReady(true);
      });
    // }
  };

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      {!isContentReady && <PreLoader />}
      {isContentReady && (
        <div className={st.userList}>
          <div className={st.productNavigationBar}>
            <div className={st.categoryButtons}>
              <button className={st.categoryBtns}>Sofa</button>
              <button className={st.categoryBtns}>chairLavender</button>
              <button className={st.categoryBtns}>cabinet Console</button>
              <button className={st.categoryBtns}>Ceiling</button>
              <button className={st.categoryBtns}>Lamp shades</button>
            </div>
            <div className={st.topbarSearchContainer}>
              <input
                type={st.text}
                className={st.searchInputAdminPanel}
                placeholder={st.Search}
              />
              <SearchIcon className={st.SearchIconAdmin} />
            </div>
          </div>

          <table className={st.userListTable}>
            <thead className={st.table_header}>
              <th>id</th>
              <th>title</th>
              <th>category</th>
              <th>price</th>
              <th>rate</th>
              <th>productImage</th>
              <th>Discount</th>
            </thead>
            <tbody className={st.table_body}>
              {productsDatas?.map((product, i) => (
                <tr key={product._id}>
                  <td>{i + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>{calcDiscountedPrice(product)}</td>
                  <td>{product.rate}</td>
                  <td>
                    <img src={product.imageUrl} alt="image " />
                  </td>
                  <td>{product.discount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
export { productIdPage };
