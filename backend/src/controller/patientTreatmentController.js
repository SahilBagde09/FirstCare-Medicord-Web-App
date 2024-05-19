import { request, response } from "express";
import { TREATMENTS_TABLE_NAME } from "../constants/DbConstants.js";
import { connection } from "../utility/DbUtil.js";


//Fetch Treatment details
export const fetchPatientTreatmentsData = (request, response)=>{
    const qry=`select * from ${TREATMENTS_TABLE_NAME}`;
    connection.query(qry, (error, result)=>{
        if(error){
            console.log("Error in fetching medical record: ", error);
            response.status(500).send({message: 'Something went wrong'});
        }
        else{
            if(result.length === 0){
                response.status(200).send({message: `0 Records in ${TREATMENTS_TABLE_NAME}`});
            }
            else{
                console.log(`fetched ${result.length} records from ${TREATMENTS_TABLE_NAME} table`);
                response.status(200).send(result);
            }
        }
    })
}

//Insert new treatment details 
export const saveTreatment = (request, response)=>{
    const {DoctorID, PatientID, TreatmentDetails} = request.body;
    const qry = `insert into ${TREATMENTS_TABLE_NAME} (DoctorID, PatientID, TreatmentDetails) values(
        ${DoctorID},
        ${PatientID},
        '${TreatmentDetails}' 
    )`;
    connection.query(qry, (error, result)=>{
        if(error){
            console.log('Error in entering medical record: ', error);
            response.status(500).send({message: 'Something went Wrong'});
        }
        else{
            console.log(result);
            console.log('New Treatment Details Added');
            response.status(200).send({message: 'New Treatment Details Added'});
        }
    })
}

// Fetch patient Medical history by Patient Id
export const fetchPatientTreatmentsDataById = (request, response)=>{
    const {PatientID} = request.params;
    const qry = `select * from ${TREATMENTS_TABLE_NAME} where PatientID = ${PatientID};`;
    connection.query(qry, (error, result)=>{
        if(error){
            console.log('Error in fetching medical record: ', error);
            response.status(500).send({message: 'Something went Wrong'});
        }
        else{
            if(result.length === 0){
                response.status(400).send({message: `0 Records for patient ${PatientID} in ${TREATMENTS_TABLE_NAME} table`});
            }
            else{
                //const dateObj = JSON.stringify(result[0].TreatmentDate).split("T")[0];
                //console.log(dateObj);
                //console.log(dateObj.slice(1,dateObj.length));
                //const currentDate = new Date();
                //onsole.log(currentDate.toDateString());
                //console.log()
                console.log(`fetched ${result.length} records for patient ${PatientID}`);
                response.status(200).send(result);
            }
            
        }
    })
    
}

// Remove treatment record by treatment id
export const removerTreatmentRecord = (request, response) =>{
    const {TreatmentID} = request.params;
    const qry = `delete from ${TREATMENTS_TABLE_NAME} where TreatmentID = ${TreatmentID}`;
    connection.query(qry, (error, result)=>{
        if(error){
            console.log('Error in fetching medical record: ', error)
            response.status(500).send({message: 'Something went Wrong'})
        }
        else{
            console.log(`Treatment record ${TreatmentID} is deleted from ${TREATMENTS_TABLE_NAME} table`);
            response.status(200).send({message: `Treatment record ${TreatmentID} is removed`});
        }
    })
}

//Update Treatment Record
export const updateTreatmentRecord = (request, response)=>{
    const {TreatmentDetails} = request.body;
    const {TreatmentID} = request.params;
    const qry = `update ${TREATMENTS_TABLE_NAME} set TreatmentDetails = '${TreatmentDetails}' 
                where TreatmentID = ${TreatmentID}`;
    connection.query(qry, (error, result)=>{
        if(error){
            console.log('Error in updating medical record: ', error)
            response.status(500).send({message: 'Something went Wrong'})
        }
        else{
            console.log(`Treatment record ${TreatmentID} is update in ${TREATMENTS_TABLE_NAME} table`);
            response.status(200).send({message: `Treatment record ${TreatmentID} is updated`});
        }
    })
}


//demo (NotConf)
export const deletePatientTreatmentsDataById = (request, response)=>{
    console.log("hello");
    const {TreatmentID} = request.params;
    const qry = `SELECT datediff(sysdate(), TreatmentDate) as date_diff FROM ${TREATMENTS_TABLE_NAME} WHERE TreatmentID = ${TreatmentID}`; 
    connection.query(qry, (error, result)=>{
        if(error){
            console.log('Error in fetching medical record: ', error);
            response.status(500).send({message: 'Something went Wrong'});
        }
        else{
            console.log(result);
            if(result.length === 0){
                response.status(400).send({message: `0 Records for patient ${PatientID} in ${TREATMENTS_TABLE_NAME} table`});
            }
            else{
                const daysDifference = result[0].date_diff;
                if (daysDifference === 0) {
                    console.log("yess");
                    // Proceed to delete the record
                    const deleteQry = `DELETE FROM ${TREATMENTS_TABLE_NAME} WHERE TreatmentID = ${TreatmentID}`;
                    connection.query(deleteQry,(error, result) => {
                        if (error) {
                            console.log('Error in deleting medical record: ', error);
                            response.status(500).send({ message: 'Something went wrong' });
                        } else {
                            response.status(200).send({ message: `Treatment record with ID ${TreatmentID} deleted successfully` });
                        }
                    });
                } 
                else {
                    console.log("Nooo");
                    response.status(400).send({ message: `Cannot delete treatment record older than ${MAX_DAYS} days` });
                }
            }
            
        }
    })
    
}