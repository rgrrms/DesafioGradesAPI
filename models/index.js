import mongoose from 'mongoose';
import grade from "./gradesModel";
import "dotenv/config"

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grade = grade(mongoose);

export { db };
