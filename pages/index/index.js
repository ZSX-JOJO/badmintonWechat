// pages/index/index.js
const app = getApp();
var util = require('../../utils/util.js');
var server = require('../../utils/server.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weeks: util.getWeekDates(new Date()),
    weekNames: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    showIndex: 0,
    nowDay: util.getWeekDates(new Date())[0],
    activitys: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this;
    wx.request({
      url: server.activity_query,
      data: {
        date: _that.data.nowDay
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            activitys: res.data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  tabSwitch: function(e) {
    var _that = this,
      index = e.currentTarget.dataset.index,
      _nowDay = _that.data.weeks[index];
    wx.request({
      url: server.activity_query,
      data: {
        date: _nowDay
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            activitys: res.data.data
          })
        }
      }
    })
    _that.setData({
      nowDay: _nowDay,
      showIndex: index
    })
  },

  /**
   * 点击查看详情及报名入口
   */
  seeMore: function(e) {
    var _that = this,
      _index = e.currentTarget.dataset.index,
      _nowDay = _that.data.nowDay,
      _id = _that.data.activitys[_index].id,
      _status = _that.data.activitys[_index].activityStatus;
    wx.navigateTo({
      url: '/pages/activity/activity?id=' + _id + '&status=' + _status + '&nowDay=' + _nowDay
    })
  }
})