const router = require('express').Router();
const {Review} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
    Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.post('/', (req, res, next) => {
    Review.create(req.body)
    .then(newReview => res.json(newReview))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Review.destroy({
        where: {
            id: req.params.id
        }
    })
})
