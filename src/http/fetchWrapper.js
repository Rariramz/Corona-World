export const get = async (url, callback) => {
  fetchWrapper("GET", url, callback);
};
export const post = async (url, callback, obj) => {
  fetchWrapper("GET", url, callback, obj);
};

const fetchWrapper = async (method, url, callback, obj) => {
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
        callback({ invalid: true });
      }
      const json = await res.json();
      callback(json);
    }
  } catch (e) {
    // console.error(e);
  }
};
