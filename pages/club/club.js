// pages/club/club.js
const app = getApp();
var server = require('../../utils/server.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: server.base_url,
    clubs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this;
    wx.request({
      url: server.club_query,
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            clubs: res.data.data
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
   * 俱乐部详情
   */
  gotoDetail: function(e) {
    var _that = this,
      _index = e.currentTarget.dataset.index,
      _clubId = _that.data.clubs[_index].id;
    wx.navigateTo({
      url: '/pages/clubDetail/clubDetail?id=' + _clubId
    })
  }
})