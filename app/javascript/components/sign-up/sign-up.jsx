import React, { useContext, useEffect, useState } from "react";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import UserContext from "../../helpers/user-context";
import { Footer } from "../footer";
import { SignUpLogin } from "../sign-up-login";
import { SignUpName } from "../sign-up-name";
import { SignUpPhoto } from "../sign-up-photo";
import { SignUpShare } from "../sign-up-share";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(``);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFormNotEmpty, setIsFormNotEmpty] = useState(false);
  const [photo, setPhoto] = useState({ file: "", imagePreviewUrl: "" });
  const { user } = useContext(UserContext);
  const { currentChild, setCurrentChild } = useContext(ChildContext);

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

    value.length >= 2 ? setIsDisabled(false) : setIsDisabled(true);
    setName(value);
  };

  useEffect(() => {
    if (photo.file) {
      if (!user) {
        goNext();
        setStep(3);
      } else {
        handlePostData();
      }
    }
  }, [photo]);

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

    try {
      const {
        data: { entry },
      } = await api.post(`/entries`, data);
      setCurrentChild(entry);
      setStep(4);
    } catch (e) {
      console.log("error");
    }
  };

  const renderSignScreen = (idStep) => {
    switch (idStep) {
      case 1:
        return (
          <SignUpName
            email={name}
            handleChange={handleChangeName}
            goNext={goNext}
            isButtonDisabled={isDisabled}
            isFormNotEmpty={isFormNotEmpty}
          />
        );
      case 2:
        return <SignUpPhoto handleChange={handleChangePhoto} name={name} />;
      case 3:
        return (
          <SignUpLogin
            imagePreviewUrl={photo.imagePreviewUrl}
            handleLoginWhileSignUp={handleLoginWhileSignUp}
          />
        );
      case 4:
        return (
          <SignUpShare
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

export default SignUp;
