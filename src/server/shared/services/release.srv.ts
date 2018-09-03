import { ReleaseContractSrv, Release } from "../models/generic";
import { generateBasicService } from "./basic.srv";

const basicSrv = generateBasicService(Release);

export const releaseSrv: ReleaseContractSrv = {
  ...basicSrv
};
