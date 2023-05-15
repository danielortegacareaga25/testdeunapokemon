import { FC } from "react";
import "./PagesScreen.scss";
import { Nabvar } from "../../components/Navbar";
export const PagesScreen: FC<any> = ({ children }) => {
  return (
    <div className="pages">
      <div className="pages__container">
        <Nabvar />
        {children}
      </div>
    </div>
  );
};
