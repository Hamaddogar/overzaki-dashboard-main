
import mongoose from "mongoose";

const configSchema = new mongoose.Schema({}, { strict: false });

const SettingConfigs = mongoose.models.configs || mongoose.model("configs", configSchema);

export default SettingConfigs;