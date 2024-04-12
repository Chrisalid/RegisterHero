import Hero from '../models/Hero.js'

export const getHeroes = async (id) => {
    try {
        let heroes

        if (id)
            heroes = await Hero.findById(id).exec()
        else
            heroes = await Hero.find().exec()

        return typeof(heroes) == Array ? heroes : [heroes]

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

export const updateHero = async (id, hero) => {
    try {
        const theHero = await Hero.findById(id).exec()

        theHero.name = hero.name
        theHero.secretName = hero.secretName
        theHero.gender = hero.gender
        theHero.birthDate = hero.birthDate
        theHero.superPowers = hero.superPowers

        theHero.save()

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
        await new Hero.findByIdAndDelete(id).exec()
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

export default getHeroes