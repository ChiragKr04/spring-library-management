import axios from "axios";

export class RestApiService {
  static get = async (url, headers) => {
    var data = [];
    var requestOptions = {
      headers: headers,
    };
    await axios
      .get(url, requestOptions)
      .then((result) => {
        //console.log(result);
        data = result;
      })
      .catch((error) => console.log("error[get]", error));
    return data;
  };

  static post = async (url, headers, body) => {
    var data = [];
    var newheaders = {
      "Content-Type": "application/json",
      ...headers,
    };
    var requestOptions = {
      headers: newheaders,
    };

    await axios
      .post(url, body, requestOptions)
      .then((result) => {
        // console.log(result)
        data = result;
      })
      .catch((error) => console.log("error[post]", error));
    return data;
  };
}
