// pages/activity/activity.js
const app = getApp();
var server = require('../../utils/server.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: server.base_url,
    id: null,
    activityModel: null,
    status: null,
    nowDay: null,
    avatar:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _id = options.id,
      _status = options.status,
      _nowDay = options.nowDay,
      _that = this;
    _that.setData({
      id: _id,
      status: _status,
      nowDay: _nowDay
    })
    wx.request({
      url: server.activity_queryById,
      data: {
        id: _id
      },
      success: function(res) {
        if (res.data.code == 200) {
          var _dataJson = res.data.data;
          _dataJson.activity.startTime = _dataJson.activity.startTime.substr(0, 5);
          _dataJson.activity.endTime = _dataJson.activity.endTime.substr(0, 5);
          _dataJson.user.avatar = server.base_url + _dataJson.user.avatar;
          _that.setData({
            activityModel: _dataJson,
            avatar: _dataJson.user.avatar
          })
        }
      }
    })
  },

  /**
   * 打电话
   */
  makeCall: function() {
    var _that = this,
      _phone = _that.data.activityModel.user.phone;
    wx.makePhoneCall({
      phoneNumber: '' + _phone
    })
  },

  /**
   * 立即报名
   */
  applyActivity: function() {
    var _that = this,
      _count = _that.data.activityModel.activityMemberList.length,
      _limit = _that.data.activityModel.activity.limitMember,
      _id = _that.data.activityModel.activity.id;
    if (_limit != 0 && _count == _limit) {
      wx.showToast({
        mask: true,
        title: '已报人数已满，无法报名！',
        icon: 'none',
        duration: 2000
      })
    }
    wx.navigateTo({
      url: '/pages/apply/apply?id=' + _id
    })
  },

  /**
   * 
   */
  applyWarnModal: function() {
    wx.showModal({
      title: '提示',
      content: '活动进行中，无法报名！',
      showCancel: false
    })
  },

  /**
   * 
   */
  applyNoModal: function() {
    wx.showModal({
      title: '提示',
      content: '活动已结束！',
      showCancel: false
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
    var _that = this,
      _id = _that.data.id;
    wx.request({
      url: server.activity_queryById,
      data: {
        id: _id
      },
      success: function(res) {
        if (res.data.code == 200) {
          var _dataJson = res.data.data;
          _dataJson.activity.startTime = _dataJson.activity.startTime.substr(0, 5);
          _dataJson.activity.endTime = _dataJson.activity.endTime.substr(0, 5);
          _that.setData({
            activityModel: _dataJson
          })
        }
      }
    })
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
   * 查看位置
   */
  openLocation: function() {
    var _that = this,
      _address = _that.data.activityModel.activity.activityAddress;
    wx.chooseLocation({
      name: _address,
      address: _address,
      success: function(res) {

      },
    })
  },

  /**
   * 进入已报人员查看列表
   */
  gotoMemberDetail: function() {
    var _that = this,
      _id = _that.data.id;
    wx.navigateTo({
      url: '/pages/activityMember/activityMember?id=' + _id
    })
  }
})