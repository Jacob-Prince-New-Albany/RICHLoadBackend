import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import db from './models'

const app = express()
const PORT = process.env.PORT || 80
const uri = "mongodb+srv://jacob_prince_slu:richload1@cluster0.jmwjl.mongodb.net/RICHLoad?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, err => {
    if (err) console.log(err)
    else console.log('Successfully connected to database')
})

async function newUser(req, res, next) {
    console.log(req)
    const { firstName, lastName, email, password, exponentId, phone, parentEmail, school, sport, mainHand, mainLeg, age, sex, experience, position, position2, height, weight, participation6Weeks, participation6Extra, participation12Months, participation12Extra, concussion, concussionDate, concussionActivity, unconscious, memoryLoss, concussionDaysOut, diagnosis, memoryIssues, dizzinessIssues, headacheIssues, injuryYear, injuryDate, injuryActivity, injuryType, injuryArea, injuryTreatment, injuryDaysOut, notHealedInjuries, currentInjuries, currentTreatment, currentConditions, currentConditionsExtra, currentMedications, currentMedicationsExtra, currentSupplements, currentSupplementsExtra, er, erNumber, general, generalNumber, sportMedicine, sportMedicineNumber, surgeon, surgeonNumber, pt, ptNumber, chiropractor, chiropractorNumber, massage, massageNumber, athletic, athleticNumber, mri, mriNumber, ctScan, ctScanNumber, xRay, xRayNumber, otherVisit, other, otherNumber, hospital, hospitalReason, hospitalNights, hospitalSurgery, hospitalSurgeryExtra } = req.body

    const user = new db.User({
        firstName,
        lastName,
        email,
        password,
        exponentId,
        phone,
        parentEmail,
        school,
        sport,
        mainHand,
        mainLeg,
        age,
        sex,
        experience,
        position,
        position2,
        height,
        weight,
        participation6Weeks,
        participation6Extra,
        participation12Months,
        participation12Extra,
        concussion,
        concussionDate,
        concussionActivity,
        unconscious,
        memoryLoss,
        concussionDaysOut,
        diagnosis,
        memoryIssues,
        dizzinessIssues,
        headacheIssues,
        injuryYear,
        injuryDate,
        injuryActivity,
        injuryType,
        injuryArea,
        injuryTreatment,
        injuryDaysOut,
        notHealedInjuries,
        currentInjuries,
        currentTreatment,
        currentConditions,
        currentConditionsExtra,
        currentMedications,
        currentMedicationsExtra,
        currentSupplements,
        currentSupplementsExtra,
        er,
        erNumber,
        general,
        generalNumber,
        sportMedicine,
        sportMedicineNumber,
        surgeon,
        surgeonNumber,
        pt,
        ptNumber,
        chiropractor,
        chiropractorNumber,
        massage,
        massageNumber,
        athletic,
        athleticNumber,
        mri,
        mriNumber,
        ctScan,
        ctScanNumber,
        xRay,
        xRayNumber,
        otherVisit,
        other,
        otherNumber,
        hospital,
        hospitalReason,
        hospitalNights,
        hospitalSurgery,
        hospitalSurgeryExtra
    })

    await user.save()
    res.status(200).json({
        status: 'success',
        message: `Created user ${firstName} ${lastName} with email ${email}`
    })
}

async function newDaily(req, res, next) {
    console.log(req)
    const { practice, practiceIntensity, workout, workoutIntensity, game, gameIntensity } = req.body

    const daily = new db.Daily({
        _user: req.user._id,
        practice,
        practiceIntensity,
        workout,
        workoutIntensity,
        game,
        gameIntensity
    })

    await daily.save()
    res.status(200).json({
        status: 'success',
        message: `Recieved daily survey from ${user.firstName} ${user.lastName}`
    })
}

async function newWeekly(req, res, next) {
    console.log(req)
    const { sleep, pain, painIntensity} = req.body

    const weekly = new db.Weekly({
        _user: req.user._id,
        sleep,
        pain,
        painIntensity
    })

    await weekly.save()
    res.status(200).json({
        status: 'sucess',
        message: `Recived weekly survey from ${user.firstName} ${user.lastName}`
    })
}

async function validateUserMiddleware(req, res, next) {
    const {email, password} = req.body
    const user = await db.User({ email, password })
    if (!user) return res.status(401).json({ message: 'invalid credentials'})

    req.user = user
    next()
}

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/createuser', newUser)
app.post('/dailysurveys', validateUserMiddleware, newDaily)
app.post('/weeklysurvey', validateUserMiddleware, newWeekly)

app.listen(PORT, function() {
    console.log("Server is running on http://localhost:" + PORT);
});