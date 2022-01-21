const notFound = (req,res) => res.status(404).send('Route does bot exist')

module.exports = notFound