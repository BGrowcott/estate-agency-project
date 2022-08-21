import { useMutation } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { IMAGE_UPLOAD } from "../../utils/mutations";
import { v4 as uuidv4 } from "uuid";

function FileUpload() {
  const { id } = useParams();
  const [imageUpload, { error }] = useMutation(IMAGE_UPLOAD);

  async function addPhoto(e) {
    e.preventDefault();

    const files = document.getElementById("imageUpload").files;
    const file = files[0];
    if (!files.length) {
      return alert("Please choose a file to upload first.");
    }
    if (files.length > 1) {
      return alert("Please choose just one file.");
    }
    let extn = file.name.split(".").pop();
    if (extn !== "jpg" && extn !== "png" && extn !== "gif") {
      return alert("Please choose an image file");
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async function () {
      const request = {
        imageFile: reader.result,
        extn: extn,
        fileName: uuidv4(),
        propertyId: id,
      };

      console.log(request);

      imageUpload({
        variables: {
          imageFile: request.imageFile,
          fileName: request.fileName,
          fileExtension: request.extn,
          propertyId: request.propertyId,
        },
      });
    };
  }

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="imageUpload" className="form-label">
          Add new image
        </label>
        <div className="d-flex align-items-center">
          <input className="form-control" type="file" id="imageUpload" />
          <button className="btn btn-primary" onClick={addPhoto}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
