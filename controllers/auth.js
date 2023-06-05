const {pool} = require("../database/pool");
// const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");


function createTokens(user) {
    // TODO: Change The expiry time
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}


// const createTokens = (user) => {
//     const accessToken = sign(
//       { username: user.username, id: user.id },
//       "jwtsecretplschange"
//     );
  
//     return accessToken;
//   };


  const login = async (req , res )=>{
    return res.status(200).send({message : "hi"})
    const { username, password } = req.body;

    const user = await pool.query("SELECT * FROM Users WHERE username=$1;" ,username )
    // const user = await pool;.findOne({ where: { username: username } });
    if(user.rowCount === 0){
        return res.status(400).json({ error: "User Doesn't Exist" });
    }
    const dbPassword = user.rows[0].password;
    if(dbPassword !== password){
        return res
          .status(400)
          .json({ error: "Wrong Username and Password Combination!" });
    }
    // bcrypt.compare(password, dbPassword).then(async(match) => {
    //   if (!match) {
    //     return res
    //       .status(400)
    //       .json({ error: "Wrong Username and Password Combination!" });
    //   } else {
        const accessToken = createTokens(user);

        await pool.query("UPDATE users SET accesstoken = $1 WHERE username=$2;" , [accessToken , username])

        return res.status(200).send({
            accessToken : accessToken
        })
        // res.cookie("access-token", accessToken, {
        //   maxAge: 60 * 60 * 24 * 30 * 1000,
        //   httpOnly: true,
        // });
  
        // res.json("LOGGED IN");
    // });
  }

  module.exports = {
    login
  }