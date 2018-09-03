import { DashboardSrv } from "../models/generic";
import { get } from "../utils/http.util";

export const dashboardSrv: DashboardSrv = {
  findCellAssigns() {
    return get('/api/dashboard');
  }
};
