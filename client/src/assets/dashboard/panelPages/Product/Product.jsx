import { useState } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
// import { productsData } from "../../datas";
import PublishIcon from "@mui/icons-material/Publish";
// import React, { useState } from "react";

export default function Product() {
  const [selectedFile, setselectedFile] = useState(null)
  const [previewUrl, setpreviewUrl] = useState("")
  var filesArray = []

  const selectedPic = (event) => {

    for (let i = 0; i < event.target.files.length; i++) {
      filesArray.push(event.target.files[i].name);
      setselectedFile(event.target.files[i].name);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setpreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[i]);
    }

    // setselectedFile(event.target.files[0].name);
    // const reader = new FileReader();
    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setpreviewUrl(reader.result);
    //   }
    // };
    // reader.readAsDataURL(event.target.files[0]);
  };

  /******************************************************************************************************************/

  /******************************************************************************************************************/

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>

      <div className="productTop">
        <div className="productInfiTop">
          {console.log(filesArray) &&
            filesArray.forEach(() => {
              selectedFile && (
                // console.log(url);
                <div className="productTopLeft">
                  <img src={previewUrl} alt="" className="productInfoImg" />
                  {/* <img src={url} alt="" className="productInfoImg" /> */}
                  {/* <img src={previewUrl} alt="" className="productInfoImg" /> */}
                  {/* <span className="productNmae">Dell laptop</span> */}
                </div>
              );
            })}

          {/* {selectedImage && (
              <View>
                <img
                  source={{ uri: previewUrl }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            )} */}

          <div className="productTopRight">
            <div className="productInfoBottom">
              {/* <div className="productInfoItem">
                <div className="productInfoKey">ID: </div>
                <div className="productInfoValue">132</div>
              </div>
              <div className="productInfoItem">
                <div className="productInfoKey">Name: </div>
                <div className="productInfoValue">Dell laptop</div>
              </div>
              <div className="productInfoItem">
                <div className="productInfoKey">Sales: </div>
                <div className="productInfoValue">$9000</div>
              </div>
              <div className="productInfoItem">
                <div className="productInfoKey">Active: </div>
                <div className="productInfoValue">Yes</div>
              </div>
              <div className="productInfoItem">
                <div className="productInfoKey">In Stock: </div>
                <div className="productInfoValue">Yes</div>
              </div> */}
              <div>
                <input
                  type="file"
                  id="uploadFile"
                  accept="image/*"
                  onChange={selectedPic}
                  multiple
                // onChange={pickImage}
                />

                {/* <div className="productInfoKey">In Stock: </div>
            <div className="productInfoValue">Yes</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            {/* <label>Product ID</label> */}
            <input type="text" placeholder="Dell Laptop" />

            {/* <label>Product Name</label> */}
            <input type="text" placeholder="Dell Laptop" />

            {/* <label>Product Price</label> */}
            <input type="text" placeholder="Dell Laptop" />

            {/* <label>Product stock</label> */}
            <input type="number" placeholder="Dell Laptop" />

            {/* <label>In Stock</label>
                <select id="inStock">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select> */}

            {/* <label>Active</label> */}
            <select id="inStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <div className="productUploader">
              {/* <img src="./images/logoSOFT.png" alt="profile photo" className='productUploaderImg' /> */}
              <label>
                <PublishIcon />
              </label>
              <button className="productUploadButton">Upload (Edit)</button>

              {/* <input type="file" style={{ display: "none" }} /> */}
            </div>
          </div>

          <div className="productFormRight">
            {/* <div className="productUploader"> */}
            {/* <img src="./images/logoSOFT.png" alt="profile photo" className='productUploaderImg' /> */}
            {/* <label> */}
            {/* <PublishIcon /> */}
            {/* </label> */}
            {/* <button className="productUploadButton">Upload (Edit)</button> */}

            {/* <input type="file" style={{ display: "none" }} /> */}
            {/* </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}
