import axios from "axios";

export default class PostService {
  static async GetAll(setLoadingStatus, callbackError) {
    try {
      setLoadingStatus(true);

      let response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      // await new Promise((res) => setTimeout(res, 10000));

      // let test = [];

      // for (let i = 0; i < 750; ++i)
      //   test.push({
      //     id: i + 1,
      //     title: "Javascript " + (i + 1),
      //     body: "Description " + (i + 1),
      //   });

      setLoadingStatus(false);

      return response.data;
    } catch (e) {
      callbackError(e);
    }
  }
}
