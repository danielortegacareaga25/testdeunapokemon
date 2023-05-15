import { FC } from "react";
import "./WelcomeScreen.scss";

export const WelcomeScreen: FC<any> = ({ children }) => {
  return (
    <div className="welcome">
      <div className="welcome__form">{children}</div>
    </div>
  );
};
