import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

export const ROUTER_KEYS = {
  HOME: "/",
  CARD_INFO: ":id",
  ADD_NEW_CARD: "new-card",
  EDIT_CARD: "edit/:id",
};

export const SCREEN_WIDTHS = {
  mobile: 320,
  tablet: 768,
  desktop: 1280,
};

export const LOCALSTORAGE_KEYS = {
  EVENT_CARDS: "EVENT_CARDS",
};

export const PRIORITIES = {
  Low: "text-low",
  Medium: "text-medium",
  High: "text-high",
};

export const FORM_FIELDS = [
  {
    label: "Title",
    name: "title",
    element: "input",
    type: "text",
    min: 3,
    max: 40,
  },
  {
    label: "Description",
    name: "description",
    element: "textarea",
    type: "text",
    min: 3,
    max: 100,
  },
  { label: "Select date", name: "date", element: "input", type: "text" },
  { label: "Select time", name: "time", element: "input", type: "time" },
  {
    label: "Location",
    name: "location",
    element: "input",
    type: "text",
    min: 3,
    max: 40,
  },
  {
    label: "Category",
    name: "theme",
    element: "select",
    options: [
      "Art",
      "Music",
      "Business",
      "Conference",
      "Workshop",
      "Party",
      "Sport",
    ],
  },
  {
    label: "Add picture",
    name: "image",
    element: "input",
    type: "file",
  },
  {
    label: "Priority",
    name: "priority",
    element: "select",
    options: ["High", "Medium", "Low"],
  },
];

export const CATEGORY_FIELDS = [
  { name: "Art" },
  { name: "Music" },
  { name: "Business" },
  { name: "Conference" },
  { name: "Workshop" },
  { name: "Party" },
  { name: "Sport" },
];

export const SORT_FIELDS = [
  { name: "by name", icon: BsArrowUpShort, sortOrder: "by A-Z" },
  { name: "by name", icon: BsArrowDownShort, sortOrder: "by Z-A" },
  { name: "by data", icon: BsArrowUpShort, sortOrder: "data-newest" },
  { name: "by data", icon: BsArrowDownShort, sortOrder: "data-oldest" },
  { name: "by priority", icon: BsArrowUpShort, sortOrder: "priority-highest" },
  { name: "by priority", icon: BsArrowDownShort, sortOrder: "priority-lowest" },
];
