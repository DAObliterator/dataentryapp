import express from "express";
import mongoose from "mongoose";
import { User } from "../models/User.js";
import { DataEntry } from "../models/DataEntry.js";
import multer from "multer";
import {isAuthenticated } from "../middlewares/isAuthenticated.js";
import { uploadFile } from "../s3.js";
import { getFileStream } from "../s3.js";

const router = express.Router();

const upload = multer({ dest: 'uploads/'})

router.post("/getAllData" ,  async (req,res)=> {

    console.log(`you have hit /getAllData with a request , session -- ${JSON.stringify(req.session)}\n `);

    const authenticated = isAuthenticated(req.session);

    if (authenticated) {

        console.log('user is authenticated to view the resource');

        let username = req.session.username 

        if ( username !== null) {

            let currentUser = await User.findOne({ username : username});
            let ownerId = currentUser._id;
            let allData = await DataEntry.find({ owner: ownerId} , { owner: 0 , createdAt: 0 , updatedAt: 0 , __v: 0} );

            if (allData !== null ) {
                res.status(200).json({ allData: allData , message: "data fetched successfully"});
            } else if (allData === null) {
                res.status(404).json({ message: "The User hasnt upload any data" })
            }

        }
    } else {
        res.status(401).json({ message: "The User is unauthorized to view the resource"})
    }


})

router.post("/addData", upload.single('profilePicture') , async (req, res) => {

     console.log(
       `you have hit /addData with a request , session -- ${JSON.stringify(req.session)}\n `
     );

     const authenticated = isAuthenticated(req.session);

     if (authenticated) {

        console.log("user is authenticated to view the resource");

        console.log(
          `req.file - ${JSON.stringify(req.file)} & req.body - ${JSON.stringify(req.body)} `
        );

        

        let username = req.session.username 

        if ( username !== null) {

            let currentUser = await User.findOne({ username : username});
            let ownerId = currentUser._id;

            const { firstName , lastName , dateOfBirth , college , degree} = req.body;
            
            let DataExists = await DataEntry.findOne({ owner: ownerId , firstName: firstName  , lastName: lastName });


            if (!DataExists) {
                const result = await uploadFile(req.file);
                console.log(
                  `${JSON.stringify(
                    result
                  )} after uploading to the S3 bucket \n`
                );

                //in the fieldName for profilePicture add the key

                
                try {

                    const newDataEntry = await DataEntry.create({
                      owner: ownerId,  
                      firstName: firstName,
                      lastName: lastName,
                      dateOfBirth: dateOfBirth,
                      college: college,
                      degree: degree,
                      profilePicture: result.Key
                    }).then((result) => {
                        console.log(result, " --- newDataEntry created");
                        res.status(200).json({
                          message: "newDataEntry created successfully!",
                        });
                    });

                   
                    
                } catch (error) {
                    console.log(`error - ${error} happened while attempting to add Data to Database`)
                    res.status(500).json({message: "error encountered while creating new Data"})
                }

                
            }else {
                res.status(409).json({ message: "data with identical values to fields already exists ...create new "})
            }
            

        }


     } else {

     }

});

router.get("/images/:key" , (req,res) => {

    console.log(`req received to /images/:key endpoint --- ${req.params.key} `)
    const authenticated = isAuthenticated(req.session);

    if (authenticated) {
        const key = req.params.key;
        const readStream = getFileStream(key);

        readStream.pipe(res);

    } 
})

router.post("/deleteData", async (req, res) => {

    console.log(`req received to deleteData endpoint \n`);

    const authenticated = isAuthenticated(req.session);

    if (authenticated) {

        const currentUserName = req.session.username;
        const dataEntryId = req.body.elementId;

        let currentUser = await User.findOne({ username: currentUserName});

        if (currentUser) {

            let ownerId = currentUser._id;


            await DataEntry.findOneAndDelete({ owner: ownerId , _id: dataEntryId });

            let allData = await DataEntry.find(
              { owner: ownerId },
              { owner: 0, createdAt: 0, updatedAt: 0, __v: 0 }
            );

             if (allData !== null) {
               res
                 .status(200)
                 .json({
                   allData: allData,
                   message: "data fetched successfully",
                 });
             } else if (allData === null) {
               res
                 .status(404)
                 .json({ message: "The User hasnt upload any data" });
             }



        }

        

    } else {

    }
});

router.post("/deleteAllData", (req, res) => {

});

router.post("/updateData", (req, res) => {});

export { router as dataEntryRouter };
