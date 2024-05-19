import express from 'express';
import { deletePatientTreatmentsDataById, fetchPatientTreatmentsData, fetchPatientTreatmentsDataById, removerTreatmentRecord, saveTreatment, updateTreatmentRecord } from '../controller/patientTreatmentController.js';
import { verifyTokenDoctor } from '../middleware/verifyTokenDoctor.js';
import { verifyTokenPatient } from '../middleware/verifyTokenPatient.js';

const patientTreatmentRouter = express.Router();

patientTreatmentRouter.get('/allrecord', verifyTokenDoctor, fetchPatientTreatmentsData);
patientTreatmentRouter.post('/addrecord', verifyTokenDoctor, saveTreatment);
patientTreatmentRouter.get('/doctorDashboard/:PatientID', verifyTokenDoctor, fetchPatientTreatmentsDataById);
patientTreatmentRouter.get('/patientDashboard/:PatientID', verifyTokenPatient, fetchPatientTreatmentsDataById);
patientTreatmentRouter.delete('/:TreatmentID', verifyTokenDoctor, removerTreatmentRecord);
patientTreatmentRouter.put('/:TreatmentID', verifyTokenDoctor, updateTreatmentRecord);
//patientTreatmentRouter.get('/del/:TreatmentID', verifyTokenDoctor, deletePatientTreatmentsDataById);

export default patientTreatmentRouter;