// pages/clubDetail/clubDetail.js
const app = getApp();
var server = require('../../utils/server.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: server.base_url,
    clubModel: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _id = options.id,
      _that = this;
    wx.request({
      url: server.club_queryById,
      data: {
        id: _id
      },
      success: function(res) {
        if (res.data.code == 200) {
          var _clubModel = res.data.data,
            _activityList = _clubModel.activityList;
          for (var i in _activityList) {
            _activityList[i].startTime = _activityList[i].startTime.substr(0, 5);
            _activityList[i].endTime = _activityList[i].startTime.substr(0, 5);
          }
          _clubModel.club.clubLogo = server.base_url + _clubModel.club.clubLogo;
          _that.setData({
            clubModel: _clubModel
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

  /**
   * 点击查看详情
   */
  seeMore: function (e) {
    var _that = this,
      _index = e.currentTarget.dataset.index,
      _id = _that.data.clubModel.activityList[_index].id,
      _status = _that.data.clubModel.activityList[_index].activityStatus,
      _nowDay = _that.data.clubModel.activityList[_index].activityDate.replace(new RegExp('-', 'g'), "/");
    wx.navigateTo({
      url: '/pages/activity/activity?id=' + _id + '&status=' + _status + '&nowDay=' + _nowDay
    })
  },

  /**
   * 功能区进入
   */
  goto: function () {
    wx.showModal({
      title: '提示',
      content: '暂未开放！',
      showCancel: false
    })
  }
})