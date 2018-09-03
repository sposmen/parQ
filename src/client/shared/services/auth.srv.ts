export const authSrv = {
  currentUserId() {
    return Promise.resolve<number>(window.INIT_DATA.userId);
  }
};
