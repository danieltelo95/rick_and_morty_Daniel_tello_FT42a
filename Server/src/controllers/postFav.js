const { Favorite } = require('../DB_connection')

module.exports = async (req, res) => {
    const { id, name, origin, status, image, species, gender } = req.body

    if(![id, name, origin, status, image, species,
    gender].every(Boolean)) return res.status(401).
    send("Faltan datos")

    
    try {
        await Favorite.findOrCreate({
            where: {
                id, name, origin, status, image, species, gender
            }
        })
        const allFavs = await Favorite.findAll()

        return res.status(200).json({allFavs})

    } catch (error) {
        res.status(500).json({error: error.message})
    }

}