import jwt from "jsonwebtoken";
import cookie from "cookie";

export const createAccessToken = (res, token) => {
  const refreshToken = jwt.sign(token, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  const accessToken = jwt.sign(token, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const access = cookie.serialize("auth_u", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 15,
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

  return { ok: true, accessToken, refreshToken };
};

export const logoutToken = (res, token = { username: "dummy" }) => {
  const refreshToken = jwt.sign(token, process.env.JWT_REFRESH_SECRET, {
    expiresIn: 1,
  });

  const accessToken = jwt.sign(token, process.env.JWT_SECRET, {
    expiresIn: 1,
  });

  const access = cookie.serialize("auth_u", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1,
    path: "/",
  });

  const refresh = cookie.serialize("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1, // 3600 = 1hour, count in second (60s = 1min)
    path: "/",
  });

  res.setHeader("Set-Cookie", [access, refresh]);

  return { ok: true, accessToken, refreshToken };
};
