const router = require('express').Router();
const { Score, Quiz, User } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE a score
router.post('/', withAuth, async (req, res) => {
    console.log('POST /api/score route reached');
    try {
      const newScore = await Score.create(req.body);
      res.status(200).json(newScore);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// READ all scores
router.get('/', async (req, res) => {
    try {
      const scores = await Score.findAll();
      res.status(200).json(scores);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// READ score by id
router.get('/:id', async (req, res) => {
    try {
      const scores = await Score.findAll({
        where: { user_id: req.params.id },
        include: [
          { model: User, attributes: ['id', 'username'] },
          { model: Quiz, attributes: ['id'] }
        ],
      });
  
      res.status(200).json(scores); // Send the scores back as a JSON response
    } catch (err) {
      console.error('Error fetching scores:', err);
      res.status(500).json({ error: 'Internal Server Error' }); // Handle errors and send an appropriate response
    }
  });

module.exports = router;