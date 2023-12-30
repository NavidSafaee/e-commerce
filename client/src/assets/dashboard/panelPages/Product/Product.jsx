import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import PublishIcon from "@mui/icons-material/Publish";

export default function Product() {
  const [selectedFile, setselectedFile] = useState(null);
  const [previewUrl, setpreviewUrl] = useState("");
  const [selectedFileLenght, setselectedFileLenghtl] = useState(null);
  var filesArray = [];

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
  };

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
            filesArray.forEach((url) => {
              selectedFile && (
                <div className="productTopLeft">
                  <img src={previewUrl} alt="" className="productInfoImg" />
                </div>
              );
            })}

          <div className="productTopRight">
            <div className="productInfoBottom">
              <div>
                <input
                  type="file"
                  id="uploadFile"
                  accept="image/*"
                  onChange={selectedPic}
                  multiple
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <input type="text" placeholder="Dell Laptop" />

            <input type="text" placeholder="Dell Laptop" />

            <input type="text" placeholder="Dell Laptop" />

            <input type="number" placeholder="Dell Laptop" />

            <select id="inStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <div className="productUploader">
              <label className="myLabel">
                <PublishIcon />
              </label>
              <button className="productUploadButton">Upload (Edit)</button>
            </div>
          </div>

          <div className="productFormRight"></div>
        </form>
      </div>
    </div>
  );
}
