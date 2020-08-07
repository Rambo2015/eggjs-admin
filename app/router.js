'use strict';
const routerSpace = require('./cache/routerSpace');
const _ = require('lodash')
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('user', '/user', controller.user.index);
  router.post('/user/login', controller.user.login);
  router.post('/user/getUserAll', controller.user.getUserAll);
  router.post('/sys/file/upload', controller.sys.file.upload);

  // menu
  router.post('/sys/menu/queryAllMenu', controller.sys.menu.queryAllMenu);
  router.post('/sys/menu/updateMenu', controller.sys.menu.updateMenu);
  router.post('/sys/menu/addMenu', controller.sys.menu.addMenu);
  router.get('/sys/menu/findMenuById', controller.sys.menu.findMenuById);

  // cate
  router.post('/sys/cate/queryAllCate', controller.sys.cate.queryAllCate);
  router.post('/sys/cate/updateCate', controller.sys.cate.updateCate);
  router.post('/sys/cate/addCate', controller.sys.cate.addCate);
  router.get('/sys/cate/findCateById', controller.sys.cate.findCateById);

  router.post('/sys/user/loadAllUser', controller.sys.user.loadAllUser);
  router.post('/sys/role/loadAllRole', controller.sys.role.loadAllRole);
  router.get('/shop/getAllShop', controller.sys.shop.loadAllShop);
  router.post('/shop/queryShopPage', controller.sys.shop.loadAllShop);
  router.post('/shop/addShop', controller.sys.shop.addShop);
  router.post('/shop/deleteShop', controller.sys.shop.deleteShop);
  router.post('/shop/updateShop', controller.sys.shop.updateShop);
  router.post('/sys/user/addUser', controller.sys.user.addUser);
  router.post('/sys/user/updateUser', controller.sys.user.updateUser);
  router.post('/sys/user/deleteUser', controller.sys.user.deleteUser);
  router.get('/sys/user/loadUserById', controller.sys.user.findUserById);
  routerSpace.map(item=>{
    router[item.type](item.name, _.get(controller, item.controller))
  })
};
