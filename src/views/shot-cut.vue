<template>
  <el-dialog :visible.sync="dialogVisible" width="50%">
    <img :src="lastShot" class="shot-cut" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="download">保 存</el-button>
      <el-button type="primary" @click="dialogVisible = false">上 传</el-button>
    </span>
  </el-dialog>
</template>
<script>
import kscreenshot from "kscreenshot";

export default {
  data() {
    return {
      lastShot: null,
      dialogVisible: false
    };
  },
  created() {
    const _this = this;
    new kscreenshot({
      key: 65,
      cancelCB: () => {},
      endCB: lastShot => {
        _this.lastShot = lastShot;
        _this.showImage();
      }
    });
  },
  methods: {
    showImage() {
      this.dialogVisible = true;
    },
    download() {
      return new Promise(resolve => {
        let imgUrl = this.lastShot;
        let a = document.createElement("a");
        if ("download" in a) {
          a.href = imgUrl;
          a.download = new Date().getTime() + ".png";

          let event = document.createEvent("MouseEvents");
          event.initEvent("click", false, false);
          a.dispatchEvent(event);
        } else {
          let newImgUrl = imgUrl.replace("image/png", "image/octet-stream");
          window.location.href = newImgUrl;
        }
        resolve();
      });
    }
  }
};
</script>
<style lang="postcss" scoped>
.shot-cut {
  width: 100%;
}
</style>
