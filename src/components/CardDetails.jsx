import { PRIORITIES } from "consts";
import { NavLink, useLocation } from "react-router-dom";

export const CardDetails = ({
  id,
  title,
  image,
  description,
  theme,
  location,
  time,
  date,
  priority,
  handleDelete,
}) => {
  const locationPath = useLocation();
  return (
    <div className="card !max-w-full self-center !rounded-lg md:max-w-[688px] md:max-h-[504px] ">
      <div className="md:max-h-[272px] w-full overflow-hidden">
        <img src={image} alt={title} className="w-full" />
      </div>
      <div className="px-4 pt-6 pb-10 bg-white md:px-6">
        <p className="card-description mb-6">{description}</p>
        <div className="flex flex-wrap gap-3 mb-10">
          <p className="card-chip shadow-base text-accent">{theme}</p>
          <p className={`card-chip shadow-base ${PRIORITIES[priority]}`}>
            {priority}
          </p>
          <p className="card-chip shadow-base text-accent">{location}</p>
          <p className="card-chip shadow-base text-accent">
            {date} at {time}
          </p>
        </div>
        <div className="flex justify-between md:justify-end md:gap-4">
          <NavLink
            to={`/edit/${id}`}
            state={{ from: locationPath }}
            className="card-action-button text-accent border border-accent hover:border-hovered-accent hover:text-hovered-accent focus:border-hovered-accent focus:text-hovered-accent"
          >
            Edit
          </NavLink>
          <button
            className="card-action-button text-white bg-accent hover:bg-hovered-accent focus:bg-hovered-accent"
            onClick={handleDelete}
          >
            Delete event
          </button>
        </div>
      </div>
    </div>
  );
};
