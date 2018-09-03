import { SubscriptionContractSrv, Subscription } from "../models/generic";
import { generateBasicService } from "./basic.srv";


const basicSrv = generateBasicService(Subscription);

export const subscriptionSrv: SubscriptionContractSrv = {
  ...basicSrv,
};
