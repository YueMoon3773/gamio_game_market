const db = require('../db/queries');

const checkHealth = async (req, res, next) => {
    await db.checkHealth();
    res.status(200).json({ ok: true, msg: 'Server and DB are OK.' });
};

module.exports = { checkHealth };
