import axios from "axios";

export default class PostService {
  static async GetAll(callbackError) {
    try {
      let response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      let test = [];

      for (let i = 0; i < 750; ++i)
        test.push({
          id: i + 1,
          title: "Javascript " + (i + 1),
          body: "Description " + (i + 1),
        });

      return response.data;
    } catch (e) {
      callbackError(e);
    }
  }
}
