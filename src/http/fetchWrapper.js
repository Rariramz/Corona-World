export const get = async (url) => {
  fetchWrapper("GET", url);
};
export const post = async (url, obj) => {
  fetchWrapper("GET", url, obj);
};

const fetchWrapper = async (method, url, obj) => {
  try {
    let formData = new FormData();
    let res;
    if (obj) {
      Object.entries(obj).forEach((element) => {
        formData.append(element[0], element[1]);
      });
      // console.log(method, url, formData);
      res = await fetch(url, {
        method,
        body: formData,
        contentType: "multipart/form-data",
      });
    } else {
      // console.log(method, url);
      res = await fetch(url, {
        method,
      });
    }
    if (res.ok) {
      // console.log(res);
      if ([204, 400].includes(res.status)) {
        return { invalid: true };
      }
      const json = await res.json();
      return json;
    }
  } catch (e) {
    // console.error(e);
  }
};
