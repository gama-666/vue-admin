<template>
  <div id="wrap">
    <el-button type="danger" size="small" @click="addFirst">添加一级分类</el-button>
    <div class="line"></div>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="list-wrap">
            <div class="infoList" v-for="item in category.item" :key="item.id">
              <h4>
                <svg-icon iconName="plus" />
                {{item.category_name}}
                <div class="button-group">
                  <el-button size="small" type="danger" round>编辑</el-button>
                  <el-button size="small" type="success" round>添加子级</el-button>
                  <el-button size="small" round>删除</el-button>
                </div>
              </h4>
              <ul v-if="item.children">
                <li v-for="childrenItem in item.children" :key="childrenItem.id">
                  {{childrenItem.category_name}}
                  <div class="button-group">
                    <el-button size="small" type="danger" round>编辑</el-button>
                    <el-button size="small" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>

        <el-col :span="16">
          <div class="menu-title">
            <h4>一级分类名称</h4>
          </div>

          <!-- 右侧表单 -->
          <el-form :model="form" label-width="142px" class="w410" ref="categorgFrom">
            <el-form-item label="一级菜单名称：" v-if="show_first">
              <el-input v-model="form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="二级菜单名称：" v-if="show_sec">
              <el-input v-model="form.secategoryName"></el-input>
            </el-form-item>
            <el-button type="danger" class="submit" @click="submit" :loading="submit_loading">确定</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from "@vue/composition-api";
import { AddFirstCategory, GetCategory } from "@/api/news";
export default {
  name: "infolist",
  setup(props, { root }) {
    /*数据 *************************************************/
    const show_first = ref(true);
    const show_sec = ref(true);
    const submit_loading = ref(false);
    //、表单
    const form = reactive({
      categoryName: "",
      secategoryName: ""
    });
    //、分类列表
    const category = reactive({
      item: []
    });

    /*函数 **************************************************/
    const addFirst = () => {
      show_first.value = true;
      show_sec.value = false;
    };
    /*接口部分*/
    //、添加一级分类
    const submit = () => {
      if (!form.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      submit_loading.value = true; //确定按钮状态改变
      AddFirstCategory({ categoryName: form.categoryName }) //添加分类接口
        .then(response => {
          //请求成功
          let data = response.data;
          if (data.resCode === 0) {
            root.$message({
              message: data.message,
              type: "success"
            });
            /*请求分类接口页面需刷新显示的处理方法*/
            // getCategory(); //、方法1：重新再请求一次分类接口（缺点：浪费资源）
            category.item.push(response.data.data); //、方法2：直接push，请求接口后的数据
            form.categoryName = "";
            submit_loading.value = false;
          }
        })
        .catch(error => {
          //请求失败
          root.$message.error(error);
          form.categoryName = "";
          submit_loading.value = false;
        });
    };
    //获取分类列表
    const getCategory = () => {
      GetCategory({})
        .then(response => {
          let data = response.data.data.data;
          category.item = data;
        })
        .catch(error => {});
    };

    /*生命周期*/
    //、挂载完成时执行，（页面DOM元素完成，实例完成）
    onMounted(() => {
      getCategory();
    });

    return {
      //ref
      show_first,
      show_sec,
      submit_loading,
      //reactive
      form,
      category,
      //事件
      submit,
      addFirst
    };
  }
};
</script>
<style lang="scss" scoped>
#wrap {
  .line {
    width: 100%;
    height: 1px;
    background-color: #dedede;
    margin: 28px 0px;
  }
  .w410 {
    width: 410px;
  }
  .submit {
    margin-left: 142px;
  }
}
.list-wrap {
  div:first-child {
    &::before {
      top: 20px;
    }
  }
  div:last-child {
    &::before {
      bottom: 23px;
    }
  }
}

.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
  margin-bottom: 22px;
  h4 {
    margin: 0px;
  }
}

.infoList {
  cursor: pointer;
  line-height: 44px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0px;
    bottom: 0px;
    width: 32px;
    border-left: 1px dotted #000000;
    z-index: 1;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  h4 {
    padding-left: 40px;
    margin: 0px;
    position: relative;
  }
  svg {
    position: absolute;
    left: 15px;
    top: 15px;
    background-color: #ffffff;
    font-size: 14px;
    z-index: 2;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 20px;
      width: 32px;
      border-bottom: 1px dotted #000000;
    }
  }
  .button-group {
    display: none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top: 0px;
    .el-button {
      margin-left: 0px !important;
      margin: 5px 10px 5px 0px;
      font-size: 13px;
    }
  }
  h4,
  li {
    &:hover {
      @include webkit(transition, all 0.5s ease 0s);
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
</style>