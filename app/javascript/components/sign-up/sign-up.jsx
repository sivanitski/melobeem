import React, { useContext, useState } from "react";

import { createAPI } from "../../api";
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
  const [photo, setPhoto] = useState({ file: "", imagePreviewUrl: "" });
  const { user } = useContext(UserContext);
  const api = createAPI();

  const goNext = () => {
    setStep(step + 1);
  };

  const handleChangeName = (evt) => {
    const { value } = evt.target;
    value.length >= 2 ? setIsDisabled(false) : setIsDisabled(true);
    setName(value);
  };

  const handlePostData = () => {
    api
      .post(`/entries`, {
        name: name,
        image: photo.file,
      })
      .then(() => {
        console.log("ok"); // It will be removed in task to use Context for current baby
      })
      .catch(() => {
        console.log("error");
      });
  };

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

    if (!user) {
      goNext();
    } else {
      handlePostData();
      setStep(4);
    }
  };

  const handleLogin = () => {
    handlePostData();
    goNext();
  };

  const renderSignScreen = (idStep) => {
    switch (idStep) {
      case 1:
        return (
          <SignUpName
            email={name}
            handleChange={handleChangeName}
            goNext={goNext}
            isDisabled={isDisabled}
          />
        );
      case 2:
        return <SignUpPhoto handleChange={handleChangePhoto} name={name} />;
      case 3:
        return (
          <SignUpLogin
            imagePreviewUrl={photo.imagePreviewUrl}
            handleLogin={handleLogin}
          />
        );
      case 4:
        return <SignUpShare imagePreviewUrl={photo.imagePreviewUrl} />;

      default:
        return null;
    }
  };

  return (
    <>
      {renderSignScreen(step)}
      <Footer />
    </>
  );
};

export default SignUp;
