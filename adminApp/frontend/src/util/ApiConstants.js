export class ApiConstants {
  static port = 5050;
  static mainUrl = `http://localhost:${this.port}/admin`;
  static getAllUser = `${this.mainUrl}/getAllUser`;
  static login = `${this.mainUrl}/login`;
  static signup = `${this.mainUrl}/signUp`;
  static getBooks = `${this.mainUrl}/search`;
  static getBookCopies = `${this.mainUrl}/getCopies`;
  static issueBookCopy = `${this.mainUrl}/issueBook`;
  static fetchUserHistory = `${this.mainUrl}/fetchUserHistory`;
  static forgotPassword = `${this.mainUrl}/forgotPassword`;
}
