const router = require('express').Router();
const {Review} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
    Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    Review.update(req.body, {
        where: { id: req.params.id }, 
        returning: true
    })
    .spread((rows, updatedReview) => res.json(updatedReview))
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
