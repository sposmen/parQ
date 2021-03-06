import { UserContractSrv, User } from "../models/generic";
import { generateBasicService } from "./basic.srv";
import { plateSrv } from "./plate.srv";
import { subscriptionSrv } from "./subscription.srv";


const basicSrv = generateBasicService(User);

export const userSrv: UserContractSrv = {

  ...basicSrv,

  async findOneFullById(id: number, userId?: number) {

    const user = await basicSrv.findOneFullById(id);

    const subscription = await subscriptionSrv.findOne({
      filter: [
        { createdBy: id }
      ]
    });

    if (subscription) {
      user.subscription = subscription.id;
    }

    user.plates = await plateSrv.find({
      filter: [{ createdBy: id }],
      order: '-createdAt'
    });

    return user;
  }
};
