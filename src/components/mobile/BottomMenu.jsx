import React, { useContext } from "react";
import home from "../../assets/img/home.png";
import titok from "../../assets/img/titokWhite.svg";
import "../../assets/css/footer.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { GameContext } from "../../contexts/GameContext";
import all from "../../assets/img/all.png";
import slot from "../../assets/img/slotL.png";
import casino from "../../assets/img/casinoL.png";
import { AuthContext } from "../../contexts/AuthContext";
const BottomMenu = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { content } = useContext(LanguageContext);
  const { types, providers, updateType } = useContext(GameContext);

  // Helper function to determine if a link is active
  const isActive = (path, typeId = null, tabParam = null) => {
    const pathMatch = location.pathname === path;
    const typeMatch = typeId ? searchParams.get("type") === typeId : true;
    const tabMatch = tabParam ? searchParams.get("tab") === tabParam : true;

    return pathMatch && typeMatch && tabMatch;
  };

  // Get icon color class based on active state
  const getIconClass = (path, typeId = null, tabParam = null) => {
    return `fixedBottomIcon ${
      isActive(path, typeId, tabParam) ? "activeColor" : ""
    }`;
  };
  const baseImg = [
    "/images/Final_All/Home/Home Icon.png",
    "/images/Final_All/Message/Message.png",
    "/images/Final_All/Money/Money.png",
    "/images/Final_All/Video ADs/Video Ads.png"
  ];

  const activeImg = [
    "/images/Final_All/Home/APNG Home 2/APNG Home 2.png",
    "/images/Final_All/Message/Message APNG/Message APNG.png",
    "/images/Final_All/Money/Money APNG/Money APNG.png",
   "/images/Final_All/Video ADs/Video ADS PNG/Video ADS PNG.png"
  ];

  return (
    user && (
      <>
        <div className="bottomMenu  bg-warning ">
          <div className="d-flex justify-content-around bottomMenu text-dark provider_list overflow-x-auto">
            <div className="text-center">
              <Link to="/?type=all">
                <img
                  src={isActive("/", "all") ? activeImg[0] : baseImg[0]}
                  width={40}
                  height={40}
                  className={getIconClass("/", "all")}
                />
              </Link>
            </div>

            {/*<div className="text-center">*/}
            {/*  <Link to="/ads-video?tab=AdsVideo">*/}
            {/*    <img*/}
            {/*      src={*/}
            {/*        isActive("/ads-video", null, "AdsVideo")*/}
            {/*          ? activeImg[3]*/}
            {/*          : baseImg[3]*/}
            {/*      }*/}
            {/*      width={40}*/}
            {/*      height={40}*/}
            {/*      className={getIconClass("/AdsVideo")}*/}
            {/*    />*/}
            {/*  </Link>*/}
            {/*</div>*/}

               <div className="text-center">
              <Link to="/Promotion?tab=Promotion">
                <img
                  src={"/images/Final_All/Promotion/APNG Promotion/APNG Promotion.png"}
                  width={40}
                  height={40}
                  className={getIconClass("/Contact")}
                />
              </Link>
            </div>


            <div className="text-center">
              <Link to="/information?tab=transfer">
                <img
                  src={
                    isActive("/information", null) &&
                    searchParams.get("tab") === "transfer"
                      ? activeImg[2]
                      : baseImg[2]
                  }
                  width={40}
                  height={40}
                  className={getIconClass("/information")}
                />
              </Link>

            </div>

                        <div className="text-center">
              <Link to="/Contact?tab=Contact">
                <img
                  src={
                    isActive("/Contact", null, "Contact")
                      ? activeImg[1]
                      : baseImg[1]
                  }
                  width={40}
                  height={40}
                  className={getIconClass("/Contact")}
                />
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default BottomMenu;
