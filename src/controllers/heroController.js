import Hero from '../models/Hero.js'

export const getHeroes = async (id) => {
    try {
        let heroes

        if (id)
            heroes = await Hero.find({name: "Christopher"})
        else
            heroes = await Hero.find()

        return heroes

    } catch (error) {
        throw error
    }
}

export const postHero = async (hero) => {
    try {
        const theHero = await new Hero(hero).save()

        return theHero

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

export const deleteHero = async (id) => {
    try {
        await new Hero.findByIdAndDelete(id)
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

export default getHeroes