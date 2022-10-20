const parse = (formData: FormData) => {
  const object: { [x: string]: any } = {};

  // @see https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json
  formData.forEach((value, key) => {
    // Reflect.has in favor of: object.hasOwnProperty(key)
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });

  return object;
};

export const FormDataManager = {
  parse,
};
