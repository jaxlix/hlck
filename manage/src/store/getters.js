export default{
  orgId(state) {
    return state.orgId;
  },
  pageTotal(state) {
    return state.pageTotal;
  },
  pageNum(state) {
  	return state.pageNum;
  },
  authEdit(state) {
  	return state.authEdit;
  },
  authUser(state) {
  	return state.authUser;
  },
  taskName(state){
    return state.taskName;
  },
  finishStatus(state){
    return state.finishStatus;
  },
  taskTypeRw(state){
    return state.taskTypeRw;
  },
  personList(state){
    return state.personList;
  },
  carList(state){
    return state.carList;
  },
  passportList(state){
    return state.passportList;
  },
  searchPeople(state){
    return state.searchPeople;
  },
  manageRole(state) {
    return state.manageRole;
  },
  allPeoplePartId(state){
    return state.allPeoplePartId;
  },
  checkboxOrNode(state){
    return state.checkboxOrNode;
  },
  refreshPage(state){
    return state.refreshPage;
  },
  currentCheckAuth(state){
    return state.currentCheckAuth;
  },
  taskType(state){
    return state.taskType;
  },
  taskStatusCode(state){
    return state.taskStatusCode;
  },
  xhCheckType(state){
    return state.xhCheckType;
  }
}