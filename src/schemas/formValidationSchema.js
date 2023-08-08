import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .matches(
      /^[A-Za-z][A-Za-z\s]*$/,
      "Title must contain only letters and spaces",
    )
    .min(3, "Title must be at least 3 characters")
    .max(40, "Title must be at most 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters")
    .max(100, "Description must be at most 100 characters"),
  date: Yup.string()
    .required("Date is required")
    .matches(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
      "Invalid date format (MM/DD/YYYY)",
    ),
  time: Yup.string().required("Time is required"),
  location: Yup.string()
    .required("Location is required")
    .min(3, "Location must be at least 3 characters")
    .max(40, "Location must be at most 100 characters"),
  theme: Yup.string().required("Category is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Invalid file format", (value, context) => {
      if (!value || context.originalValue?.secure_url) return true;

      const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
      return allowedFormats.includes(value.type);
    })
    .test("fileSize", "Image size is too large", (value, context) => {
      if (!value || context.originalValue?.secure_url) return true;
      const maxSize = 10 * 1024 * 1024;
      return value.size <= maxSize;
    }),
  priority: Yup.string().required("Priority is required"),
});
