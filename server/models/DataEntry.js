import mongoose from "mongoose";
import { Schema } from "mongoose";

const DataEntrySchema = Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const DataEntry = mongoose.model("DataEntries" , DataEntrySchema);