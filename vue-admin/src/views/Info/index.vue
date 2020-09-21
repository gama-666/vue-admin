<template>
  <div id="wrap">
    <el-button type="danger" size="small" @click="addFirst({type:'category_first_add'})">添加一级分类</el-button>
    <div class="line"></div>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="list-wrap">
            <div class="infoList" v-for="(item,index) in category.item" :key="item.id">
              <!-- 一级分类 -->
              <h4>
                <div @click="isOpen(item)">
                  <svg-icon iconName="plus" />
                  {{item.category_name}}
                </div>
                <div class="button-group">
                  <el-button
                    size="small"
                    type="danger"
                    round
                    @click="editCatagory({item,type:'category_first_edit'})"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="success"
                    round
                    @click="addChildren({item,type:'category_children_add'})"
                  >添加子级</el-button>
                  <el-button size="small" round @click="deleteCategoryConfirm(item.id)">删除</el-button>
                </div>
              </h4>
              <!-- 子级分类 -->
              <ul v-if="item.children" :class="category.item[index].isOpen?'open':'retract'">
                <li v-for="childrenItem in item.children" :key="childrenItem.id">
                  {{childrenItem.category_name}}
                  <div class="button-group">
                    <el-button
                      size="small"
                      type="danger"
                      @click="editChildren({childrenItem,type:'category_first_edit'})"
                      round
                    >编辑</el-button>
                    <el-button size="small" round @click="deleteCategoryConfirm(childrenItem.id)">删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>

        <el-col :span="16">
          <div class="menu-title">
            <h4>{{title}}</h4>
          </div>
          <!-- 右侧表单 -->
          <el-form :model="form" label-width="142px" class="w410" ref="categorgFrom">
            <el-form-item label="一级菜单名称：" v-if="show_first">
              <el-input v-model="form.categoryName" :disabled="first_disabled"></el-input>
            </el-form-item>
            <el-form-item label="二级菜单名称：" v-if="show_sec">
              <el-input v-model="form.secategoryName" :disabled="sec_disabled"></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="submit"
              @click="submit"
              :loading="submit_loading"
              :disabled="submit_disabled"
            >确定</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import {
  AddFirstCategory,
  DeleteCategory,
  EditCategory,
  AddChildrenCategory
} from "@/api/news";
import { common } from "@/api/common";
export default {
  name: "infolist",
  setup(props, { root }) {
    //、获取分类列表，公用方法
    const { getCategoryAll, categoryData } = common();
    /*数据 *************************************************/
    const show_first = ref(true);
    const show_sec = ref(true);
    const submit_loading = ref(false);
    const title = ref("一级分类名称");
    //、添加一级、添加子级、编辑用的是同一个确定按钮，定义类型区分
    const submit_button_type = reactive({});
    //、默认添加输入框和按钮为禁用状态
    const first_disabled = ref(true);
    const sec_disabled = ref(true);
    const submit_disabled = ref(true);
    //、表单
    const form = reactive({
      categoryName: "",
      secategoryName: "",
      categoryId: ""
    });
    //、分类列表
    const category = reactive({
      item: []
    });
    /*函数 **************************************************/
    const isOpen = item => {
      let i = category.item.findIndex(value => value.id == item.id);
      category.item[i].isOpen = !category.item[i].isOpen;
    };
    //1、添加一级分类
    const addFirst = ({ item, type }) => {
      composeFn(item, type, "添加一级菜单名称");
    };
    //2、添加子级分类
    const addChildren = ({ item, type }) => {
      composeFn(item, type, "添加二级菜单分类");
    };
    //3、修改分类列表
    const editCatagory = ({ item, type }) => {
      composeFn(item, type, "编辑一级菜单分类名称");
    };
    //4、修改子级分类列表
    const editChildren = ({ childrenItem, type }) => {
      composeFn(childrenItem, type, "编辑子级菜单分类名称");
    };

    const composeFn = (item, type, value) => {
      submit_button_type.value = type;
      title.value = value;
      form.categoryName = "";
      show_first.value = true;
      if (type == "category_children_add") {
        show_sec.value = true;
        sec_disabled.value = false;
        first_disabled.value = true;
      } else {
        show_sec.value = false;
        first_disabled.value = false;
      }
      submit_disabled.value = false;
      if (item) {
        form.categoryName = item.category_name;
        form.categoryId = item.id;
      }
    };

    /*接口部分*/
    //确定按钮
    const submit = () => {
      if (!form.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      if (submit_button_type.value == "category_first_add") {
        addCategory(); //添加
      } else if (submit_button_type.value == "category_first_edit") {
        editCategory(); //修改
      } else if ((submit_button_type.value = "category_children_add")) {
        addChildrenCategory(); //添加子级
      }
    };

    //添加一级分类,确定，接口请求
    const addCategory = () => {
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
            getCategoryAll(); //、方法1：重新再请求一次分类接口（缺点：浪费资源）
            // category.item.push(response.data.data); //、方法2：直接push，请求接口后的数据
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
    //修改一级分类，确定，接口请求
    const editCategory = () => {
      EditCategory({
        categoryName: form.categoryName,
        id: form.categoryId
      })
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          getCategoryAll();
        })
        .catch(error => {
          console.log(error);
        });
    };
    //、删除一级分类接口请求
    const deleteCategory = id => {
      DeleteCategory({ categoryId: id })
        .then(response => {
          let data = response.data;
          //、通过ID删除数组指定元素，无需重新执行请求接口刷新页面
          let index = category.item.findIndex(item => item.id == id);
          category.item.splice(index, 1);
          root.$message({
            message: data.message,
            type: "success"
          });
          getCategoryAll();
          form.categoryName = "";
        })
        .catch(error => {});
    };
    //、删除一级分类弹框的显示
    const deleteCategoryConfirm = id => {
      root.confirm({
        content: "确定删除当前信息，确定后无法恢复！！",
        fn: deleteCategory,
        catchFn: () => {
          root.$message({
            message: "已取消删除",
            type: "success"
          });
        },
        id
      });
    };
    //、添加子级分类名称
    const addChildrenCategory = () => {
      let responseData = {
        categoryName: form.secategoryName,
        parentId: form.categoryId
      };
      AddChildrenCategory(responseData).then(response => {
        let data = response.data;
        root.$message({
          message: data.message,
          type: "success"
        });
        form.secategoryName = "";
        getCategoryAll();
      });
    };

    /*生命周期 **********************************************/
    //、挂载完成时执行，（页面DOM元素完成，实例完成）
    onMounted(() => {
      getCategoryAll(); //获取分类列表
    });
    /*watch 监听数据变化********/
    watch(
      () => categoryData.item,
      value => {
        value.forEach(item => {
          item.isOpen = true;
        });
        category.item = value;
      }
    );
    return {
      //ref
      title,
      show_first,
      show_sec,
      submit_loading,
      first_disabled,
      sec_disabled,
      submit_disabled,
      //reactive
      form,
      category,
      //事件
      submit,
      addFirst,
      addChildren,
      deleteCategoryConfirm,
      editCatagory,
      editChildren,
      isOpen
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
  .open {
    display: block;
  }
  .retract {
    display: none;
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