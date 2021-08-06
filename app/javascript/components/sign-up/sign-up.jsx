import "./style.less";

import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import ReactPixel from "react-facebook-pixel";
import { useHistory, withRouter } from "react-router";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import { Footer } from "../footer";
import SignUpDouble from "./screens/sign-up-double";
import SignUpLogin from "./screens/sign-up-login";
import SignUpName from "./screens/sign-up-name";
import SignUpPhoto from "./screens/sign-up-photo";
import SignUpShare from "./screens/sign-up-share";

const SignUp = ({ location: { state } }) => {
  const history = useHistory();
  const [step, setStep] = useState(state?.step || 1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFormNotEmpty, setIsFormNotEmpty] = useState(false);
  const [photo, setPhoto] = useState({ file: "", imagePreviewUrl: "" });
  const [imageTransformations, setImageTransformations] = useState({});
  const { user } = useContext(UserContext);
  const { currentChild, setCurrentChild } = useContext(ChildContext);
  const [name, setName] = useState(state?.name || "");

  const goNext = () => {
    setStep(step + 1);
  };

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
      if (!user || state?.id) {
        goNext();
      } else {
        handlePostData();
      }
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

  const handleLoginWhileSignUp = () => {
    handlePostData();
  };

  const handlePostData = async () => {
    const data = new FormData();
    data.append(`entry[name]`, name);
    data.append(`entry[image]`, photo.file);
    data.append(`entry[transformations]`, JSON.stringify(imageTransformations));

    try {
      const {
        data: { entry },
      } = await api.post(`/entries`, data);

      dataLayer.push({ event: "CompleteRegistration" });
      ReactPixel.track("CompleteRegistration");

      setCurrentChild(entry);
      setStep(4);
    } catch (e) {
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
            setImageTransformations={setImageTransformations}
          />
        );
      case 3:
        return (
          <SignUpLogin
            imagePreviewUrl={photo.imagePreviewUrl}
            handleLoginWhileSignUp={handleLoginWhileSignUp}
            childId={state?.id}
            handlePhotoSave={handlePhotoSave}
          />
        );
      case 4:
        return (
          <SignUpShare
            imagePreviewUrl={photo.imagePreviewUrl}
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
