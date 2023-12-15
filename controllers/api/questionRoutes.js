const router = require('express').Router();


router.get('/question/:id', async (req, res) => {
    try {
        const { id } = req.params; // id needs to equal key!
        const questionDisp = await Questions.findOne({ where: { id } });

        if (!questionDisp) {
            res.status(404);
            res.json({ message: 'Question not found' });
        } else {
            res.status(200).json(questionDisp);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/question', async (req, res) => {
    try {
        const questionDisp = await Questions.findAll();

        if (!questionDisp || questionDisp.length === 0) {
            res.status(404);
            res.json({ message: 'No Questions Found' });
        } else {
            res.status(200).json(questionDisp);
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/question', async (req, res) => {


})