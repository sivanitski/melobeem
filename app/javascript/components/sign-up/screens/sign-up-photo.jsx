import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

import signUpImg from "../../../images/sign-up.png";
import signUpImg2x from "../../../images/sign-up@2x.png";

const SignUpPhoto = ({
  handleChange,
  name,
  photo,
  setImageTransformations,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaSaved, setCroppedAreaSaved] = useState({});
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

  const SetupTransformations = () => {
    setImageTransformations(croppedAreaSaved);
  };

  const OnCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaSaved(croppedAreaPixels);
  };

  useEffect(() => {
    if (photo.file) {
      setIsPhotoUploaded(true);
    }
  }, [photo]);

  return (
    <div className="form form-img">
      <div className="form__progress progress">
        <div className="progress__line progress__line--bright" />
        <div className="progress__line progress__line--bright" />
        <div className="progress__line" />
      </div>
      {isPhotoUploaded ? (
        <div className="cropper-container-main">
          <div className="crop-container">
            <Cropper
              image={photo.imagePreviewUrl}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={OnCropComplete}
            />
          </div>

          <div
            className="form-img__wrapper form__button"
            onClick={SetupTransformations}
          >
            <label
              htmlFor="form-img__file"
              className="button form-img__file-button"
            >
              Crop photo
            </label>
          </div>
        </div>
      ) : (
        <div>
          <div className="form-img__upload">
            <img
              src={signUpImg}
              srcSet={`${signUpImg2x} 2x`}
              alt="Sign up with photo"
              className="form-img__picture"
            />
            <div className="form-img__title headline--medium">Add a photo</div>
            <div className="form-img__text text-grey">
              Choose the cutest {name} photo you want to show to your friends
            </div>
          </div>
          <div
            className="form-img__wrapper form__button"
            onChange={handleChange}
          >
            <input
              name="file"
              type="file"
              id="form-img__file"
              className="input form-img__file"
            />
            <label
              htmlFor="form-img__file"
              className="button form-img__file-button"
            >
              Add photo
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

SignUpPhoto.propTypes = {
  handleChange: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  photo: propTypes.object.isRequired,
  setImageTransformations: propTypes.func.isRequired,
};

export default SignUpPhoto;
