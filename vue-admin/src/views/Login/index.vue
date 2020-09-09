<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{'current':item.current}"
          @click="toggleMeuu(item)"
        >{{item.txt}}</li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        size="small"
        class="login-form"
      >
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" v-if="model === 'register'">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="12">
              <el-input type="text" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="12">
              <el-button type="success" round class="block" @click="getsms()">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-bin block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { GetSms } from "api/login.js";
import {
  stripscript,
  validataEmail,
  validataPassword,
  validataCode
} from "@/utils/validata";

import { ref, reactive, onMounted } from "@vue/composition-api";
export default {
  name: "login",
  setup(props, context) {
    /*
       setup第二个参数是context，包含以下方法
        context.attrs
        context.slots
        context.parent
        context.root
        context.emit
        context.refs
      */
    //1、表单的验证 ************************************************************************/
    //、验证码用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validataEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    //、密码校验
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (validataPassword(value)) {
        callback(new Error("密码为6~20位数字加字母"));
      } else {
        callback();
      }
    };
    //、重复密码校验
    let validatePasswords = (rule, value, callback) => {
      if (model.value === "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    //、验证码校验
    let checkAge = (rule, value, callback) => {
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validataCode(value)) {
        callback(new Error("格式有误"));
      } else {
        callback();
      }
    };

    //2、数据位置 ************************************************************************/
    //、登录注册按钮的数据
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    //模块值
    const model = ref("login");
    //、表单的数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: checkAge, trigger: "blur" }]
    });

    //3、声明函数 ***********************************************************************/
    //、登录注册按钮的状态切换
    const toggleMeuu = data => {
      //高光,当前选中
      menuTab.forEach(item =>
        item.txt == data.txt ? (item.current = true) : (item.current = false)
      );
      //修改模块的值
      model.value = data.type;
      ruleForm.username = "";
    };
    //、获取验证码
    const getsms = () => {
      GetSms();
    };
    //、提交表单
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    //4、生命周期 ***********************************************************************/
    //、挂载完成后
    onMounted(() => {});

    //5、3.0没有返回，不能使用//
    return {
      menuTab,
      ruleForm,
      model,
      rules,
      toggleMeuu,
      submitForm,
      getsms
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  padding-top: 120px;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #ffffff;
    border-radius: 2px;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .el-form-item__label {
    color: #ffffff;
  }
}
.login-form {
  margin-top: 29px;
  label {
    color: #ffffff;
    display: block;
    font-size: 14px;
    margin-bottom: 3px;
  }
  .login-bin {
    margin-top: 19px;
  }
  .block {
    width: 100%;
    display: block;
  }
}
</style>