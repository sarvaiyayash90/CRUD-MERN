const mongoose = require('mongoose'); // MongoDb

const express = require('express');  // Express 

const router = express.Router(); // Router 

const student = require('../Models/Student_Model'); // Model import

let path = require('path'); // path

const multer = require('multer'); // Multer one type image upload time call middleware

var fs = require('fs'); // file systems

const fastcsv = require("fast-csv"); // CSV

var PDFDocument = require('pdfkit'); // PDF

// const path = require('path'); //path

// multer photo upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads');
    },
    filename: function (req, file, cb) {
        photo_name = Date.now() + path.extname(file.originalname)
        //cb(null, file.originalname)
        cb(null, photo_name);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// fileFilter: (req, file, cb) => {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//         cb(null, true);
//     } else {
//         cb(null, false);
//         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
// }


/*  +--------------------------+
    |      global Token store  |
    +--------------------------+  */

router.route('/token_data_store/:id').post((req, res) => {
    global.Token_Key = req.params.id
    return res.json({ messgae: "global token call" })
})

/*  +--------------------------+
    |      Creare data         |
    +--------------------------+  */

router.route('/createstudent').post((req, res, next) => {

    let upload = multer({ storage: storage, fileFilter: fileFilter }).single('profile');

    upload(req, res, function (err) {
        const student_new = new student({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email_id: req.body.email_id,
            Department: req.body.Department,
            contact_no: req.body.contact_no,
            address: req.body.address,
            birthday: req.body.birthday,
            graduation_year: req.body.graduation_year,
            profile: photo_name,
            password: req.body.password,
            login_id: req.body.login_id
        })
        console.log("data", student_new);
        student_new.save()
            .then(result => {
                console.log(result);
                res.status(200).json({ "status": "data insert successfully" });
            }).catch(err => {
                console.log(err);
                res.status(400).json({ "status": "data Not insert successfully" });
            })
    })
})

/*  +--------------------------+
    |        List data         |
    +--------------------------+  */
router.route('/liststudent/:id').get((req, res) => {
    const student_data = student.find({ login_id: req.params.id })
    //console.log("data", student_data);
    student_data.exec()
        .then(result => {
            res.status(200).send(result);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
})

/*  +--------------------------+
    |        Delete data       |
    +--------------------------+  */
router.route('/deletestudent/:id').delete((req, res) => {
    const id = req.params.id;
    const delete_img = student.findById({ _id: id })
    delete_img.exec()
        .then(result => {
            fs.unlink("../client/public/uploads/" + result.profile, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        })

    const delete_stu_data = student.remove({ _id: id })
    delete_stu_data.exec()
        .then(result => {
            //console.log(result);
            res.status(200).json({ status: "Successfully Deleted Image...." })
        }).catch(err => {
            //console.log(err);
            res.status(500).send("ERROR")
        })
})

/*  +--------------------------+
    |     Single data show     |
    +--------------------------+  */

router.route('/viewstudent/:id').get(async (req, res) => {
    try {
        const student_new = await student.findById(req.params.id)
        res.json(student_new)
    } catch (err) {
        res.send('Error' + err)
    }
})

/*  +--------------------------+
    |     Edit data show       |
    +--------------------------+  */
router.route('/Editstudent/:id').get(async (req, res) => {
    try {
        const student_new = await student.findById(req.params.id)
        res.status(200).json(student_new)
    } catch (err) {
        res.status(500).send(err)
    }
})

/*  +--------------------------+
    |        Update Data       |
    +--------------------------+  */
router.route('/UpdateStudent/:id').put((req, res) => {

    //console.log("call");

    let upload = multer({ storage: storage, fileFilter: fileFilter }).single('profile');

    upload(req, res, function (err) {

        //console.log("data", req.body);
        //console.log("file", photo_name);

        if (req.file) {
            const id = req.params.id;
            const delete_img = student.findById({ _id: id })
            delete_img.exec()
                .then((result) => {
                    fs.unlink("../client/public/uploads/" + result.profile, ((err) => {
                        if (err) { console.log(err); }
                        else {
                            student.updateOne({ _id: req.params.id }, {
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                email_id: req.body.email_id,
                                Department: req.body.Department,
                                contact_no: req.body.contact_no,
                                address: req.body.address,
                                birthday: req.body.birthday,
                                graduation_year: req.body.graduation_year,
                                profile: photo_name,
                                password: req.body.password,
                            }, { new: true })
                                .then((result) => {
                                    console.log(result)
                                    //res.status(200).json({ "status": "Successfully Updated...." })
                                }).catch(err => {
                                    console.log(err);
                                    //res.status(500).json({ "status": "unSuccessfully Updated...." })
                                })
                        }
                    }))
                })
        } else {
            student.updateOne({ _id: req.params.id }, {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email_id: req.body.email_id,
                Department: req.body.Department,
                contact_no: req.body.contact_no,
                address: req.body.address,
                birthday: req.body.birthday,
                graduation_year: req.body.graduation_year,
                password: req.body.password,
            }, { new: true })
                .then((result) => {
                    console.log(result)
                    //res.status(200).json({ "status": "Successfully Updated...." })
                }).catch(err => {
                    console.log(err);
                    //res.status(500).json({ "status": "unSuccessfully Updated...." })
                })
        }
    })
})


/*  +--------------------------+
    |        CSV Create        |
    +--------------------------+  */
router.route('/csv/:id').get((req, res) => {
    student.find({ login_id: req.params.id })
        .exec()
        .then(result => {
            //console.log(result)
            const jsonData = JSON.parse(JSON.stringify(result));
            //console.log("jsonData", jsonData);
            var today = new Date();
            const ws = fs.createWriteStream('./CSV/' + 'DATA_INFO' + '_' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + '.csv');
            fastcsv
                .write(jsonData, { headers: true })
                .on("finish", function () {
                    console.log("Write to students.csv successfully!");
                })
                .pipe(ws);
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

/*  +-----------------------------------+
    |        fetch CSV generator        |
    +-----------------------------------+  */
router.route('/fetchcsv/:id').get((req, res) => {
    console.log("call fetch data");
    student.find({ login_id: req.params.id })
        .exec()
        .then((result) => {
            var today = new Date();
            var CSV_DATA = 'DATA_INFO' + '_' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + '.csv'
            let inputStream = fs.createReadStream('./CSV/' + CSV_DATA,{headers:true});
            inputStream.pipe(res);
            // res.json({ msg: "data pass" }
        }).catch((err) => {
            res.json({ msg: "data not pass" })
        })
})

/*  +--------------------------+
    |        PDF Create        |
    +--------------------------+  */

router.route('/pdf/:id').post((req, res) => {
    student.findById(req.params.id)
        .exec()
        .then(result => {
            var pdfDoc = new PDFDocument;
            var today = new Date();
            pdfDoc.pipe(fs.createWriteStream('./PDF/' + result.first_name + "_" + result.first_name + "_" + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + '.pdf'));
            pdfDoc.moveDown(0.5)
            pdfDoc
                .image('../client/public/uploads/' + result.profile, {
                    fit: [400, 150],
                    align: 'center',
                    valign: 'center'
                });
            pdfDoc.moveDown(0.5)
            pdfDoc.fontSize(25)
            pdfDoc.text("First Name :- " + result.first_name);
            pdfDoc.text("Last Name :- " + result.last_name);
            pdfDoc.text("Email Id :- " + result.email_id);
            pdfDoc.text("Department :- " + result.Department);
            pdfDoc.text("Contact No :- " + result.contact_no);
            pdfDoc.text("Birthday :- " + result.birthday);
            pdfDoc.text("graduation year :- " + result.graduation_year);
            pdfDoc.text("Profile :- " + result.profile);
            pdfDoc.text("Password :- " + result.password);
            pdfDoc.end();
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

/*  +--------------------------------+
    |        Ftech Pdf Create        |
    +--------------------------------+  */
router.route('/fetchpdf/:id').get((req, res) => {
    const id = req.params.id
    student.findById({ _id: id })
        .exec()
        .then(result => {
            var today = new Date();
            var Pdf_Data = result.first_name + "_" + result.first_name + "_" + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ".pdf"
            //res.sendFile("./"+ Pdf_Data)
            var file = fs.createReadStream('./PDF/' + Pdf_Data);
            file.pipe(res);
        })
        .catch(err => {
            res.json({ msg: "errrooreor" })
        })
})

module.exports = router;