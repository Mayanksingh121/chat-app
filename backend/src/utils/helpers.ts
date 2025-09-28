import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    if (hashedpassword) return hashedpassword;
    return null;
  } catch (e) {
    console.log("@error while encrypting the password ", e);
    return null;
  }
};
