import axios from "axios";

export default class PostService {
  static async GetAll(callbackError) {
    try {
      let response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      return response.data;
    } catch (e) {
      callbackError(e);
    }
  }
}
