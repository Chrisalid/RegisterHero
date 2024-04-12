import { Router } from "express";
import { deleteHero, getHeroes, postHero, updateHero } from '../controllers/heroController.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        let id

        if (req.query && req.query.hero_id)
            id = req.query.hero_id

        const heroes = await getHeroes(id)

        return res.status(200).json( heroes.length > 0 ? {
            success: true,
            message: 'This is your hero',
            heroes: heroes
        } : {
            success: true,
            message: 'Don\'t have any heroes found'
        } )

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
})

router.post('/', async (req, res) => {
    try {
        var validate = []

        if (req.body) {
            validate = [
                !!req.body.name ,
                !!req.body.secretName,
                !!req.body.gender,
                !!req.body.birthDate,
                !!req.body.superPowers
            ]
        }

        if (validate.length == 0 || validate.includes(false))
            return res.status(400).json({
                success: false,
                message: 'The JSON is not valid'
            })
        
        let birthDate = req.body.birthDate.toString()
        const [day, month, year] = birthDate.split('/');

        const heroDTO = {
            "name": req.body.name ,
            "secretName": req.body.secretName,
            "gender": req.body.gender.toLowerCase() == "male" ? true : false,
            "birthDate": new Date(year, month - 1, day),
            "superPowers": req.body.superPowers
        }

        const hero = await postHero(heroDTO)

        return res.status(201).json(hero)

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
})

router.put('/', async (req, res) => {
    try {
        
        if (!req.query || !req.query.hero_id) {
            return res.status(400).json({
                success: false,
                message: 'The query statement \'hero_id\' is not found'
            })
        }
        var id = req.query.hero_id

        var validate = []
        if (req.body) {
            validate = [
                !!req.body.name ,
                !!req.body.secretName,
                !!req.body.gender,
                !!req.body.birthDate,
                !!req.body.superPowers
            ]
        }

        if (validate.length == 0 || validate.includes(false)) {
            return res.status(400).json({
                success: false,
                message: 'The JSON is not valid'
            })
        }

        let birthDate = req.body.birthDate.toString()
        const [day, month, year] = birthDate.split('/');
        
        const heroDTO = {
            "name": req.body.name ,
            "secretName": req.body.secretName,
            "gender": req.body.gender.toLowerCase() == "male" ? true : false,
            "birthDate": new Date(year, month - 1, day),
            "superPowers": req.body.superPowers
        }

        const hero = await updateHero(id, heroDTO)

        return res.status(200).json({
            success: true,
            message: 'The hero has been updated',
            hero: hero
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
})

router.delete('/', async (req, res) => {
    try {
        if (!req.query && !req.query.hero_id)
            return res.status(400).json({
                success: false,
                message: "You don't have send a hero_id parameter to delete a hero"
            })

        const id = req.query.hero_id

        await deleteHero(id)

        return res.status(200).json( heroes.length > 0 ? {
            success: true,
            message: 'The hero with id '
        } : {
            success: true,
            message: 'Don\'t have any heroes found'
        } )

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
})

export default router