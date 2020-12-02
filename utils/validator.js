export const fruitValidate = (data) => {
  const errors = {};

  const { name } = data;
  if (!name || name.trim() === "") errors.name = "Name field is required";

  return { errors, valid: Object.keys(errors).length < 1 };
};

export const categoryValidate = (data) => {
  const errors = {};

  const { name } = data;
  if (!name || name.trim() === "") errors.name = "Name field is required";

  return { errors, valid: Object.keys(errors).length < 1 };
};
