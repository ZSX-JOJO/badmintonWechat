// pages/apply/apply.js
const app = getApp();
var server = require('../../utils/server.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexs: [{
        name: '男',
        value: '1',
        checked: true
      },
      {
        name: '女',
        value: '2',
        checked: false
      }
    ],
    activityMember: {
      nick: '',
      activityId: '',
      memberNum: 1,
      memberPhone: '',
      memberSex: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _id = options.id,
      _that = this,
      _activityMember = _that.data.activityMember;
    _activityMember.activityId = _id;
    _that.setData({
      activityMember: _activityMember
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
   * form表单提交
   */
  formSubmit: function(e) {
    var _that = this,
      _formActivityMember = e.detail.value,
      _nick = _formActivityMember.nick,
      _memberPhone = _formActivityMember.memberPhone,
      _memberSex = _formActivityMember.memberSex,
      _activityMember = _that.data.activityMember,
      _activityId = _activityMember.activityId;
    _activityMember.nick = _nick;
    _activityMember.memberSex = _memberSex;
    _activityMember.memberPhone = _memberPhone;
    _that.setData({
      activityMember: _activityMember
    })
    if (!_nick || !_memberPhone) {
      wx.showModal({
        title: '提示',
        content: '昵称和电话不能为空！',
        showCancel: false
      })
      return;
    } else {
      wx.showModal({
        title: '提示',
        content: '请确保报名信息准确无误，提交后无法修改！',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: server.activity_apply,
              header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              data: {
                activityId: _activityId,
                nick: _nick,
                memberSex: _memberSex,
                memberPhone: _memberPhone,
                memberNum: 1
              },
              success: function(res) {
                if (res.data.code == 200) {
                  wx.showToast({
                    title: '报名成功',
                    icon: 'success',
                    duration:5000,
                    mask:true,
                    complete:function(){
                      wx.navigateBack({
                        delta: -2
                      })
                    }
                  })
                }
              }
            })
          } else if (res.cancel) {}
        }
      })
    }
  },

  /**
   * 重置
   */
  formReset: function() {
    var _that = this;
    _that.setData({
      sexs: [{
          name: '男',
          value: '1',
          checked: true
        },
        {
          name: '女',
          value: '2',
          checked: false
        }
      ],
      activityMember: {
        nick: '',
        activityId: '',
        memberNum: 1,
        memberPhone: '',
        memberSex: ''
      }
    })
  }
})