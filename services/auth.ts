const v_to_sha256 = require('v_to_sha256');
import db from '../utils/db';

function addRefreshTokenToWhitelist({ jti, refreshToken, userId }: any) {
  return db.refreshToken.create({
    data: {
      //id: jti,
      hashedToken: v_to_sha256.sync(refreshToken),
      userId
    },
  });
}

function findRefreshTokenById(id: string) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

function deleteRefreshToken(id: string) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

function revokeTokens(userId: string) {
  return db.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}

const authService = {
  addRefreshTokenToWhitelist: addRefreshTokenToWhitelist,
  findRefreshTokenById: findRefreshTokenById,
  deleteRefreshToken: deleteRefreshToken,
  revokeTokens: revokeTokens
};

module.exports = authService;
module.exports.default = authService;

export default authService;
