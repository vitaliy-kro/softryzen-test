export const FiltersDropdown = ({
  title,
  value,
  onChange,
  onSelect,
  fields,
  isOpen,
  isTablet,
  icon: Icon,
}) => {
  return (
    <div
      className={`absolute top-0 left-0 w-2/3 md:top-auto md:w-full h-full z-10 font-poppins font-medium text-lg text-accent rounded-t-lg border-b border-devider bg-white transition-all ${
        isOpen
          ? "opacity-100 translate-y-0 overflow-visible pointer-events-auto"
          : "overflow-hidden opacity-0 translate-y-1 pointer-events-none"
      } `}
      onClick={onChange}
    >
      {!isTablet && (
        <div className="flex gap-1 md:gap-4 p-4 cursor-pointer">
          {title === "Category" && <Icon className="icon " />}
          <p>{title}</p>
          {title === "Sort by" && <Icon className="icon " />}
        </div>
      )}
      <ul className="w-full">
        {fields.map(({ name, icon: FieldIcon, sortOrder = "" }, index) => (
          <p
            key={index}
            className={`font-poppins flex justify-between  leading-normal px-4 py-2 border-b bg-white last:border-b-0 cursor-pointer ${
              value.name === name && value.sortOrder === sortOrder
                ? "text-accent border-accent"
                : "text-devider border-devider"
            }`}
            onClick={() => {
              onSelect(
                value.name === name && value.sortOrder === sortOrder
                  ? ""
                  : { name, sortOrder, icon: FieldIcon },
              );
            }}
          >
            {name}
            {FieldIcon && <FieldIcon className="icon" />}
          </p>
        ))}
      </ul>
    </div>
  );
};
