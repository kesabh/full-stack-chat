import bcrypt from "bcryptjs";
(async () => {
  const hashedPass = await bcrypt.hash("demo1234", 10);
  console.log(hashedPass);

  const original = await bcrypt.compare("demo1234", hashedPass);
  console.log(original);
})();
