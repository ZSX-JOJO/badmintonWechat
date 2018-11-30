//本地
// const base_url = "http://localhost:8080";
//正式机
const base_url = "https://www.young666.cn";

//接口服务
//活动分页查询




const activity_query = base_url + "/api/activity/query.do";
//活动主键查询
const activity_queryById = base_url + "/api/activity/queryById.do";
//报名活动
const activity_apply = base_url + "/api/activity/apply.do";
//俱乐部查询
const club_query = base_url + "/api/club/query.do";
//俱乐部详情查询
const club_queryById = base_url + "/api/club/queryById.do";

module.exports = {
  base_url: base_url,
  activity_query: activity_query,
  activity_queryById: activity_queryById,
  activity_apply: activity_apply,
  club_query: club_query,
  club_queryById: club_queryById
}