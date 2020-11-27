import jwt from "jsonwebtoken";
import cookie from "cookie";

export default (req, res) => {
  const { username, id } = JSON.parse(req.body);
  const refreshToken = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  const accessToken = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "1m" }
  );

  const access = cookie.serialize("auth_u", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60,
    path: "/",
  });

  const refresh = cookie.serialize("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3600 * 24 * 7, // 3600 = 1hour, count in second (60s = 1min)
    path: "/",
  });
  res.setHeader("Set-Cookie", [access, refresh]);

  return res.json({ ok: true, accessToken });
};
