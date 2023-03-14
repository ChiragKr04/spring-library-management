export class ApiConstants {
  static port = 5001;
  static localUrl = `http://localhost:${this.port}`;
  static deployedUrl = "https://spring-library-management-production.up.railway.app";
  static mainUrl = `${this.deployedUrl}/demo`;
  static getAllUser = `${this.mainUrl}/getAllUser`;
  static login = `${this.mainUrl}/login`;
  static signup = `${this.mainUrl}/signUp`;
  static getBooks = `${this.mainUrl}/search`;
  static getBookCopies = `${this.mainUrl}/getCopies`;
  static issueBookCopy = `${this.mainUrl}/issueBook`;
  static fetchUserHistory = `${this.mainUrl}/fetchUserHistory`;
  static forgotPassword = `${this.mainUrl}/forgotPassword`;
}
