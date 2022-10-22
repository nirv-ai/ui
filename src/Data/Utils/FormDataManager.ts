export const parseHtmlFormData = (formData: FormData) => {
  const data: Record<string, [] | string | FormDataEntryValue> = {};

  // @see https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json
  formData.forEach((value, key) => {
    // Reflect.has in favor of: object.hasOwnProperty(key)
    if (!Reflect.has(data, key)) {
      data[key] = value;
    } else {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]] as unknown as [];
      }
      (data[key] as FormDataEntryValue[]).push(value);
    }
  });

  return data;
};

export const FormDataManager = {
  parse: parseHtmlFormData,
};
