  
  import * as types from './types';

  const state = {
    orgId : Object,
    pageTotal : 1,
    pageNum : 1,
    authEdit: false,
    authUser: Object,
    taskName: '',
    finishStatus: '',
    taskTypeRw: '0',
    personList: Number,
    carList: Number,
    passportList: Number,
    searchPeople: [],
    manageRole: false,
    allPeoplePartId:'',
    checkboxOrNode : Number,
    refreshPage:false,
    currentCheckAuth:'',
    taskType: "2",
    taskStatusCode: false,
    xhCheckType: "1,2,3"  // 概览查看筛选
  };

  import getters from  './getters' 

  const mutations = {
    [types.ORGID](state, res) {
      state.orgId = res;
    },
    [types.PAGE](state, res) {
      state.pageTotal = res.pageTotal;
      state.pageNum = res.pageNum;
    },
    [types.AUTHEDIT](state, res) {
      state.authEdit = res.authEdit;
    },
    [types.AUTHEUSER](state, res) {
      state.authUser = res;
    },
    [types.TASKNAME](state, res){
      state.taskName = res.taskName;
    },
    [types.FINISHSTATUS](state, res){
      state.finishStatus = res.finishStatus;
    },
    [types.TASKTYPERW](state, res){
      state.taskTypeRw = res.taskTypeRw;
    },
    [types.PERSONLIST](state, res){
      state.personList = res.personList
    },
    [types.CARLIST](state, res){
      state.carList = res.carList
    },
    [types.PASSPORTLIST](state, res){
      state.passportList = res.passportList
    },
    [types.SEARCHPEOPLE](state, res){
      state.searchPeople = res.searchPeople;
    },
     [types.MANAGEROLE](state, res){
      state.manageRole = res.manageRole;
    },
    [types.AllPEOPLEPARTID](state, res){
      state.allPeoplePartId = res.allPeoplePartId;
    },
    [types.CHECKBOXORNODE](state, res){
      state.checkboxOrNode = res.checkboxOrNode;
    },
    [types.REFRESHPAGE](state, res){
      state.refreshPage = res.refreshPage;
    },
    [types.CURRENTCHECKAUTH](state, res){
      state.currentCheckAuth = res.currentCheckAuth;
    },
    [types.TASKTYPE](state, res){
      state.taskType = res.taskType;
    },
    [types.TASKSTATUSCODE](state, res){
      state.taskStatusCode = res.taskStatusCode;
    },
    [types.XHChECKTYPE](state, res){
      state.xhCheckType = res.xhCheckType;
    }
  };
  
  export default {
    state,
    mutations,
    getters
  };