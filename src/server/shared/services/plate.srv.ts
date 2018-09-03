import { PlateContractSrv, Plate } from "../models/generic";
import { generateBasicService } from "./basic.srv";

const basicSrv = generateBasicService(Plate);

export const plateSrv: PlateContractSrv = {
  ...basicSrv
};
