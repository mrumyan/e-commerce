import React from "react";

import Button from "@components/Button";

type CustomErrorProps = {
  onClick: Function;
};

const CustomError: React.FC<CustomErrorProps> = ({ onClick }) => {
  return (
    <>
      <h1>Произошла ошибка, повторите попытку</h1>
      <Button style={{ width: "30%" }} onClick={onClick()}>
        Попробовать снова
      </Button>
    </>
  );
};

export default CustomError;
