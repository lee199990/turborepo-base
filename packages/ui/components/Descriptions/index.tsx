import React, { FC } from "react";
import Text from "./Text";

type Static = {
  Text: typeof Text;
};

const Description: FC & Static = () => {
  return <></>;
};

Description.Text = Text;

export default Description;
