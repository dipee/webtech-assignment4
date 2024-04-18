//carate admin user if not exist
export function createAdminUser() {
  const admin = User.findOne({ username: "admin" });
  if (!admin) {
    User.create({
      username: "admin",
      email: "a@a.a",
      password: "admin",
      isAdmin: true,
    });
  }
}
