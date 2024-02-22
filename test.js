function trimValues(values, ...ignored) {
  console.log("values", values);
  console.log("ignored", ignored);
  return Object.entries(values).reduce((acc, [name, value]) => ({
      ...acc,
      [name]: ignored.includes(name) ? value : value?.trim(),
  }), {});
}

function main() {
  const values = {"options": {"autoSignIn": true, "userAttributes": {"email": "ilie.lupu+5@thinslices.com"}}, "password": "12345678", "username": "ilie.lupu+5@thinslices.com"};
  const ignored = ["password"];

  const result = trimValues(values, ...ignored);
  console.log(result);
}
main();