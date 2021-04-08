<template>
  <div id="wangeditor">
    <div ref="editorElem"></div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editor",
  data() {
    return {
      editor: null,
      editorContent: ""
    };
  },
  methods: {
    //初始数据录入
    initialDataWhite(data) {
      this.editor.txt.html(data);
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容;
    this.editor.customConfig.uploadImgShowBase64 = true
    this.editor.customConfig.onchange = html => {
      let content = document.querySelector(".w-e-text").innerHTML;
      this.$emit("getContent", content);
    };
    this.editor.create(); // 创建富文本实例;
  }
};
</script>

<style scoped></style>
