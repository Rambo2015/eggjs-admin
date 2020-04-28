'use strict';
// app/service/user.js
const Service = require('egg').Service;
const crypto = require('crypto');

class UserService extends Service {

  async find(userData) {
    const user = await this.app.mysql.get('t_user', userData);
    return user;
  }
  async login(userData) {
    const loginData = {
      password: crypto.createHash('md5').update(userData.password).digest('hex'),
      login_name: userData.loginName,
    };
    const user = await this.find(loginData);
    return user;
  }
  async getUserAll(userData) {
    const mysql = this.app.mysql;
    const user = await this.find(userData);
    const roles = await mysql.select('t_user_role', { 
      where: { user_id: user.id },
    });
    let userMenus = {};
    const isAdmin = roles.find(item => item.role_id === '6ce321acdb88416ca81f2942a0f96a93');
    if (isAdmin) {
      userMenus = await mysql.select('t_menu');
    } else {
      const roleIdList = roles.map(item => item.role_id);
      const roleMenus = await mysql.select('t_role_menu', { 
        where: { role_id: roleIdList },
      });
      const roleMenusList = roleMenus.reduce((preVal, item) => {
        if (preVal.indexOf(item.menu_id) < 0) {
          preVal.push(item.menu_id);
        }
        return preVal;
      }, []);
      userMenus = await mysql.select('t_menu', { 
        where: { id: roleMenusList },
      });
    }

    const treeMenus = this.ctx.service.sys.doTreeMenu(userMenus);
    const userAll = {
      menus: treeMenus,
      authorities: [],
      enames: [],
      id: user.id,
      loginName: user.login_name,
      mobile: user.mobile,
      name: user.name,
      shopId: '',
      shops: [],
      userType: '1',
    };
    return userAll;
  }

}

module.exports = UserService;
