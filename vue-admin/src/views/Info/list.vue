<template>
  <div id="wrap">
    <el-button type="danger" size="small">添加一级分类</el-button>
    <div class="line"></div>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="list-wrap">
            <div class="infoList">
              <h4>
                <svg-icon iconName="plus" />新闻
                <div class="button-group">
                  <el-button size="small" type="danger" round>编辑</el-button>
                  <el-button size="small" type="success" round>添加子级</el-button>
                  <el-button size="small" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>
                  国内
                  <div class="button-group">
                    <el-button size="small" type="danger" round>编辑</el-button>
                    <el-button size="small" round>删除</el-button>
                  </div>
                </li>
                <li>国际</li>
                <li>行业</li>
                <li>航空</li>
                <li>军事</li>
              </ul>
            </div>
            <div class="infoList">
              <h4>
                <svg-icon iconName="reduce" />新闻
              </h4>
              <ul>
                <li>国内</li>
                <li>国际</li>
                <li>行业</li>
                <li>航空</li>
                <li>军事</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="menu-title">
            <h4>一级分类编辑</h4>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "infolist",
  setup(props) {}
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