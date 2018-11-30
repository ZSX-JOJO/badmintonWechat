// pages/activityMember/activityMember.js
const app = getApp();
var server = require('../../utils/server.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    activityMembers: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _id = options.id,
      _that = this;
    _that.setData({
      id: _id
    })
    wx.request({
      url: server.activity_queryById,
      data: {
        id: _id
      },
      success: function (res) {
        if (res.data.code == 200) {
          _that.setData({
            activityMembers: res.data.data.activityMemberList
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})