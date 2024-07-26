const jwt = require('jsonwebtoken');
const secret='ksr@1234'

const createTokenForUser = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    profileImageUrl:user.profileImageUrl,
    role: user.role
  };

  const token = jwt.sign(payload,secret , { expiresIn: '1h' });
  return token;
};

function validateToken(token){
  const payload=jwt.verify(token,secret);
  return payload;
}

module.exports = { createTokenForUser,validateToken };
