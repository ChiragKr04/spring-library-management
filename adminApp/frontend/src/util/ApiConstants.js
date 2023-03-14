export class ApiConstants {
  static port = 5050;
  static localUrl = `http://localhost:${this.port}`;
  static deployedUrl = "spring-library-management-admin-production.up.railway.app";
  static mainUrl = `${this.deployedUrl}/admin`;
  static getAllUser = `${this.mainUrl}/getAllUser`;
  static login = `${this.mainUrl}/login`;
  static signup = `${this.mainUrl}/signUp`;
  static getBooks = `${this.mainUrl}/search`;
  static getBookCopies = `${this.mainUrl}/getCopies`;
  static issueBookCopy = `${this.mainUrl}/issueBook`;
  static fetchUserHistory = `${this.mainUrl}/fetchUserHistory`;
  static forgotPassword = `${this.mainUrl}/forgotPassword`;
  static sseApi = `${this.mainUrl}/borrowRequest`;
  static getAllUserHistory = `${this.mainUrl}/getAllUserHistory`;
  static addBook = `${this.mainUrl}/add-book`;

  static getAllActiveBorrowRequest = `${this.mainUrl}/getBorrowRequest`;
  static approvedRequest = `${this.mainUrl}/approveRequest`;
  static disapprovedRequest = `${this.mainUrl}/disapproveRequest`;
}
