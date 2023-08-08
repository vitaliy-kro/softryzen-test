import { useState, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";
import { RxCross2 } from "react-icons/rx";
import { GoChevronDown } from "react-icons/go";
import { FORM_FIELDS } from "../consts";
import { validationSchema } from "../schemas/formValidationSchema";
import { useYupValidationResolver } from "../hooks/useYupValidationResolver";
import { Listbox, Transition } from "@headlessui/react";
import { useDateChanger } from "../hooks/useDateChanger";

export const Form = ({ type, card, onSubmit }) => {
  const [formValues, setFormValues] = useState(card);

  const { dateForForm, dateForDatepicker } = useDateChanger();
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    setValue,
    setFocus,
    trigger,

    formState: { errors },
    handleSubmit,
  } = useForm({
    formValues,
    reValidateMode: "onChange",
    resolver,
    mode: "onBlur",
  });

  useEffect(() => {
    if (card) {
      setFormValues(card);

      Object.keys(card).forEach((key) => {
        setValue(key, card[key]);
      });
    }
  }, [card, setValue]);

  const handleElementChange = (element, value) => {
    let newValue;
    if (element === "date") {
      newValue = dateForForm(value);
    }
    setFormValues((prev) => ({ ...prev, [element]: newValue || value }));
    setValue(element, newValue || value);
  };

  const handleClearField = (element) => {
    setFormValues((prev) => ({ ...prev, [element]: "" }));
    setValue(element, "");
  };

  const handleIconClick = (name) => {
    setFocus(name);
  };

  if (!formValues) {
    return <b>Just a second...</b>;
  }
  const renderInputField = (field) => {
    const value = formValues[field.name];

    if (field.element === "input" && field.name === "date") {
      return (
        <>
          <Datepicker
            useRange={false}
            startWeekOn="mon"
            primaryColor={"violet"}
            placeholder="Select date"
            name={field.name}
            minDate={new Date()}
            maxDate={new Date("2030-01-01")}
            asSingle={true}
            showFooter={true}
            displayFormat={"DD/MM/YYYY"}
            popoverDirection="down"
            value={{
              startDate: value && dateForDatepicker(value),
              endDate: value && dateForDatepicker(value),
            }}
            inputClassName="form-input datepicker"
            toggleClassName="hidden"
            onChange={(value) =>
              handleElementChange(field.name, value.startDate)
            }
            configs={{
              footer: {
                apply: "Choose date",
              },
            }}
          />
        </>
      );
    }
    if (field.type === "file") {
      return (
        <div className="text-center">
          <div className="flex gap-3 items-center text-gray-600">
            <label
              htmlFor={field.name}
              className="flex gap-3 form-input !pr-3 items-center cursor-pointer w-full "
            >
              <span>{value?.name || "Upload a file"}</span>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                {...register(field.name)}
                onBlur={() => trigger(field.name)}
                className="sr-only"
                onChange={(e) => {
                  handleElementChange(field.name, e.target.files[0]);
                  e.target.blur();
                }}
              />
              {!value?.name && (
                <p className="hidden md:block text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              )}
              <GoChevronDown className="icon ml-auto " />
            </label>
          </div>
        </div>
      );
    }
    if (field.element === "select") {
      return (
        <Listbox
          value={value}
          onChange={(value) => handleElementChange(field.name, value)}
        >
          <div className="relative ">
            <Listbox.Button className="form-input relative w-full text-left ">
              <span className="block truncate">
                {value || `Select ${field.name}`}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
              <GoChevronDown className="icon form-input-icon" />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition-all"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-[18px] p-4 max-h-60 w-full overflow-auto rounded-lg bg-white text-lg text-text shadow-base z-20">
                {field.options.map((option, optionIdx) => (
                  <Listbox.Option
                    key={optionIdx}
                    className={`relative cursor-pointer select-none p-4 last:pb-0 border-b last:border-b-0 border-devider last:border-transparent`}
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      );
    }
    if (field.element === "textarea") {
      return (
        <>
          <textarea
            className={`form-input h-[158px] md:h-[164px] lg:h-[156px] resize-none ${
              errors?.[field.name] && "!border-high"
            }`}
            {...register(field.name)}
            maxLength={field.max}
            name={field.name}
            onChange={(e) => handleElementChange(field.name, e.target.value)}
          />
          {value && (
            <RxCross2
              onClick={() => handleClearField(field.name)}
              className="icon absolute right-3 cursor-pointer top-4"
            />
          )}
        </>
      );
    }
    return (
      <>
        <input
          id={field.name}
          className={`form-input ${errors?.[field.name] && "!border-high"}`}
          maxLength={field.max}
          {...register(field.name)}
          type={field.type}
          onChange={(e) => handleElementChange(field.name, e.target.value)}
        />
        {field.name !== "time" && value && (
          <RxCross2
            onClick={() => handleClearField(field.name)}
            className="icon form-input-icon"
          />
        )}
        {field.name === "time" && (
          <GoChevronDown
            className="icon form-input-icon"
            onClick={() => handleIconClick(field.name)}
          />
        )}
      </>
    );
  };

  return (
    <div>
      <h1 className="title">{type} event</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-10 bg-white flex flex-col gap-10 justify-between rounded-xl shadow-base w-full md:gap-0 xl:h-[490px] xl:max-w-screen-xl"
      >
        <div className="flex flex-col gap-y-5 md:flex-wrap md:gap-x-6  md:h-[550px] xl:h-[300px]">
          {FORM_FIELDS.map((field) => (
            <div className="block md:w-auto xl:min-w-[300px]" key={field.name}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              <div
                className={`relative ${
                  errors?.[field.name] ? "text-high" : "text-accent"
                }`}
              >
                {renderInputField(field)}
                {
                  <span className="absolute -bottom-4 right-0 font-poppins text-[12px] leading-[1.33] text-high">
                    {errors?.[field.name]?.message}
                  </span>
                }
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={
            Object.keys(errors).length ||
            Object.values(formValues).some((value) => !value)
          }
          className=" w-full disabled:bg-devider disabled:cursor-not-allowed md:w-[193px] md:self-end font-poppins p-4 font-medium rounded-lg text-white bg-accent hover:bg-hovered-accent focus:bg-hovered-accent"
        >
          {type === "Edit" ? "Save" : "Add event"}
        </button>
      </form>
    </div>
  );
};
