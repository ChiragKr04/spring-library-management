export class ApiConstants {
  static port = 8080;
  static mainUrl = `http://localhost:${this.port}/demo`;
  static getAllUser = `${this.mainUrl}/getAllUser`;
  static login = `${this.mainUrl}/login`;
  static signup = `${this.mainUrl}/signUp`;
  static getBooks = `${this.mainUrl}/search`;
  static getBookCopies = `${this.mainUrl}/getCopies`;
}
