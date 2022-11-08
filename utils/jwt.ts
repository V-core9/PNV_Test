
import { UserBase } from '../';
const jwt = require('jsonwebtoken');

// jwt.sign(data, secret, options);

function generateAccessToken(user: UserBase) {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      isAdmin: user.isAdmin || false
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: '10m',
    }
  );
}

function generateRefreshToken(user: UserBase, jti: string) {
  return jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin || false,
      username: user.username,
      jti
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '6h',
    }
  );
}

function generateTokens(user: UserBase, jti: string) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

const jwtUtil = {
  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken,
  generateTokens: generateTokens
};


module.exports = jwtUtil;
module.exports.default = jwtUtil;

export default jwtUtil;
