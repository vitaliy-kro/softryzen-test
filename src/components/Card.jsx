import { NavLink, useLocation } from "react-router-dom";
import { PRIORITIES } from "../consts";
import { useDateChanger } from "../hooks/useDateChanger";

export const Card = ({
  id,
  title,
  description,
  theme,
  location,
  priority,
  time,
  image,
  date,
}) => {
  const locationPath = useLocation();
  const { dateToDisplay } = useDateChanger();
  return (
    <li className="group">
      <NavLink
        to={`/${id}`}
        state={{ from: locationPath }}
        className="card md:max-w-[332px] h-[480px] cursor-pointer"
      >
        <div className="relative ">
          <div className="absolute flex gap-3 top-3 left-3">
            <p className="card-chip text-accent">{theme}</p>
            <p className={`card-chip ${PRIORITIES[priority]}`}>{priority}</p>
          </div>
          <img src={image} alt={title} className="h-auto max-w-full" />
          <div className="absolute bottom-0 w-full flex justify-between px-4 py-2 bg-white bg-opacity-80 shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.25)]">
            <p className="card-data-location">
              {dateToDisplay(date)} at {time}
            </p>
            <p className="card-data-location">{location}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-white grow overflow-hidden  ">
          <h2 className="font-poppins text-lg font-medium leading-normal text-[#1C1B1F]">
            {title}
          </h2>
          <p className="card-description grow ">{description}</p>
          <button className=" bg-accent cursor-pointer w-[114px] self-end text-base leading-[1.42] font-medium text-white p-[10px] rounded-lg -translate-y-1/3 pointer-events-none opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus:translate-y-0 group-focus:opacity-100 group-focus:pointer-events-auto transition-all">
            More info
          </button>
        </div>
      </NavLink>
    </li>
  );
};
