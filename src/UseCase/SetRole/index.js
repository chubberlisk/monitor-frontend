export default class SetRole {
  constructor(cookieUserRole) {
    this.cookieUserRole = cookieUserRole
  }

  execute(role) {
    this.cookieUserRole.setUserRole(role);
  }
}
