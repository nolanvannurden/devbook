module.exports = {

  getAllUsers: async (req, res) => {
    const db = req.app.get('db');

    try{
    const getUsers = await db.get_all_users()
    res.status(200).send(getUsers)
    }
    catch(err){
      console.log('could not get all users', err)
      res.status(500).send('its not you its me')
    }
  }

}