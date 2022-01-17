import "./style.less";

import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import ReactPixel from "react-facebook-pixel";
import { useHistory, withRouter } from "react-router";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import Loader from "../animation/loader";
import { Footer } from "../footer";
import SignUpDescription from "./screens/sign-up-description";
import SignUpDouble from "./screens/sign-up-double";
import SignUpLogin from "./screens/sign-up-login";
import SignUpName from "./screens/sign-up-name";
import SignUpPhoto from "./screens/sign-up-photo";
import SignUpShare from "./screens/sign-up-share";

const SignUp = ({ location: { state } }) => {
  const locationParams = new URLSearchParams(location.search);
  const regCampaign = locationParams.get("regCampaign");
  const clickIdentify = locationParams.get("c_id");

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [step, setStep] = useState(state?.step || regCampaign ? 0 : 1);
  const [name, setName] = useState(state?.name || "");
  const [imageTransformations, setImageTransformations] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [photo, setPhoto] = useState({ file: "", imagePreviewUrl: "" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFormNotEmpty, setIsFormNotEmpty] = useState(false);
  const { currentChild, setCurrentChild } = useContext(ChildContext);

  const goNext = () => {
    setStep(step + 1);
  };

  if (clickIdentify) {
    localStorage.setItem("c_id", clickIdentify);
  }

  const handlePutData = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append(`entry[user_id]`, user.id);

    try {
      const {
        data: { entry },
      } = await api.put(`/entries/${localStorage.getItem("entry_id")}`, data);

      localStorage.removeItem("entry_id");
      dataLayer.push({ event: "CompleteRegistration" });
      ReactPixel.track("CompleteRegistration");

      setCurrentChild(entry);

      setStep(4);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      localStorage.removeItem("entry_id");
      if (e.response.status === 422) {
        const {
          data: { entry },
        } = await api.get("/entries/current");
        setCurrentChild(entry);
        setStep(5);
      } else {
        console.error("error");
        alert("Something went wrong, please try again");
      }
    }
  };

  if (user && localStorage.getItem("entry_id") && !isLoading) {
    handlePutData();
  }

  const handleChangeName = (evt) => {
    const { value } = evt.target;
    if (value.length > 0) {
      setIsFormNotEmpty(true);
    } else {
      setIsFormNotEmpty(false);
    }

    value.length >= 2 ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    setName(value);
  };

  useEffect(() => {
    if (photo.file) {
      handlePostData();
    }
  }, [imageTransformations]);

  const handleChangePhoto = (evt) => {
    let reader = new FileReader();
    let file = evt.target.files[0];

    reader.onloadend = () => {
      setPhoto({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handlePostData = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append(`entry[name]`, name);
    data.append(`entry[image]`, photo.file);
    data.append(`entry[transformations]`, JSON.stringify(imageTransformations));
    if (user) {
      data.append(`entry[user_id]`, user.id);
    }

    try {
      const {
        data: { entry },
      } = await api.post(`/entries`, data);

      if (!user) {
        localStorage.setItem("entry_id", entry.id);
        localStorage.setItem("photo_preview", entry.imageUrl);
      } else {
        setCurrentChild(entry);
        dataLayer.push({ event: "CompleteRegistration" });
        ReactPixel.track("CompleteRegistration");
        let c_id = localStorage.getItem("c_id");
        if (c_id) {
          await fetch(`https://www.veneficus.co.uk/tp/?vtcid=${c_id}`);
        }
      }

      setIsLoading(false);
      setStep(user ? 4 : step + 1);
    } catch (e) {
      if (
        e.response.data.message === "Image must be less than 10mb" ||
        e.response.data.message === "Image is not given between dimension"
      ) {
        setPhoto({ file: "", imagePreviewUrl: "" });
        setErrorMessage(e.response.data.message);
        setIsLoading(false);
      } else {
        if (e.response.status === 422) {
          const {
            data: { entry },
          } = await api.get("/entries/current");
          setCurrentChild(entry);
          setStep(5);
        } else {
          console.error("error");
          alert("Something went wrong, please try again");
        }
      }
    }
  };

  const handlePhotoSave = async () => {
    const data = new FormData();
    data.append(`entry[image]`, photo.file);

    const {
      data: { entry },
    } = await api.put(`/users/entries/${state.id}`, data);
    setCurrentChild(entry);
    history.push(`/entry/${state.id}`);
  };

  const renderSignScreen = (idStep) => {
    switch (idStep) {
      case 0:
        return <SignUpDescription goNext={goNext} />;
      case 1:
        return (
          <SignUpName
            name={name}
            handleChange={handleChangeName}
            goNext={goNext}
            isButtonDisabled={isButtonDisabled}
            isFormNotEmpty={isFormNotEmpty}
            childId={state?.id}
          />
        );
      case 2:
        return (
          <SignUpPhoto
            handleChange={handleChangePhoto}
            name={name}
            photo={photo}
            user={user}
            errorMessage={errorMessage}
            setImageTransformations={setImageTransformations}
          />
        );
      case 3:
        return (
          <SignUpLogin
            imagePreviewUrl={localStorage.getItem("photo_preview")}
            childId={state?.id}
            handlePhotoSave={handlePhotoSave}
          />
        );
      case 4:
        return (
          <SignUpShare
            imagePreviewUrl={currentChild.imageUrl}
            childId={currentChild.id}
          />
        );
      case 5:
        return (
          <SignUpDouble
            imagePreviewUrl={photo.imagePreviewUrl}
            childId={currentChild.id}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {renderSignScreen(step)}
      <Footer isEnterButtonSmall={true} />
    </>
  );
};

SignUp.propTypes = {
  location: propTypes.shape({
    state: propTypes.shape({
      id: propTypes.string,
      step: propTypes.number,
      name: propTypes.string,
    }),
  }),
};

export default withRouter(SignUp);
