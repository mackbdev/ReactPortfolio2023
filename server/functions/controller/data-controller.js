const HttpError = require("../models/http-error");
const SkillsFormat = require("../models/skills")
const db = require('../core/db');

const hello = async (req, res, next) => {
    try {

        res.set('Cache-Control', 'public, max-age=60, s-maxage=60');

        res.json({ message: 'Hello!' });

    } catch (err) {
        const error = new HttpError(
            err,
            500
        );
        return next(error);
    }
}

const skills = async (req, res, next) => {
    try {

        // get all docs in a collection
        const data = await db.collection('skills').get();

        let result = {};

        // map over each doc in collection
        data.docs.forEach(doc => {
            let id = doc.id;
            let docData = doc.data();
            result[`${id}`] = { ...docData }
        });

        res.set('Cache-Control', 'public, max-age=60, s-maxage=60');

        res.json({ message: 'Got skills!', result });

    } catch (err) {
        const error = new HttpError(
            err,
            500
        );
        return next(error);
    }
}

const updateSkills = async (req, res, next) => {
    try {

        let object = req.body;
        console.log({ object, req })
        // initiate batch
        const batch = db.batch();

        // loop over object
        for (const skill in object) {
            // pointer to doc id in collection
            const dataRef = db.collection('skills').doc(`${skill}`);

            // add update to batch
            batch.set(dataRef, object[`${skill}`]);

        }

        // save update to db
        await batch.commit()

        // get all docs in a collection
        const data = await db.collection('skills').get();

        let result = {};

        // map over each doc in collection
        data.docs.forEach(doc => {
            let id = doc.id;
            let docData = doc.data();
            result[`${id}`] = { ...docData }
        });

        res.set('Cache-Control', 'public, max-age=60, s-maxage=60');

        res.json({ message: 'Updated skills!', result });

    } catch (err) {
        const error = new HttpError(
            err,
            500
        );
        return next(error);
    }
}

exports.hello = hello;
exports.skills = skills;
exports.updateSkills = updateSkills;
