<template>
  <ul class="menu" id="menu">
    <li>
      <a href="###">打点</a>
    </li>
  </ul>
</template>
<script>
import { addClass } from "element-ui/src/utils/dom";

export default {
  name: "context-menu",
  data() {
    return {
      tagStack: [],
      x: 0,
      y: 0,
      winHeight: 0,
      winWidth: 0,
      menu: null,
      modal: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.winHeight = this.getWinHeight();
      this.winWidth = this.getWinWidth();
      this.menu = this.getMenu();
      this.modal = this.createModal();
      this.setMenuHide();
      this.addDocumentClickEvent();
      this.addMenuEvent();
      this.addContextEvent();
    },
    getWinHeight() {
      return (
        document.documentElement.clientHeight || document.body.clientHeight
      );
    },
    getWinWidth() {
      return document.documentElement.clientWidth || document.body.clientWidth;
    },
    generateUUID() {
      var d = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    createTag() {
      const tag = document.createElement("div");
      const uuid = this.generateUUID();
      tag.innerHTML = `打点：X:${event.clientX}, Y:${event.clientY}`;
      tag.style.position = "absolute";
      tag.style.left = `${this.x}px`;
      tag.style.top = `${this.y}px`;
      tag.style.zIndex = 9999;
      tag.id = uuid;
      return tag;
    },
    createModal() {
      this.modal = document.createElement("div");
      addClass(this.modal, "context-modal");
      document.body.appendChild(this.modal);
    },
    getModal() {
      return document.getElementsByClassName("context-modal")[0];
    },
    getMenu() {
      return document.getElementById("menu");
    },
    setMenuHide() {
      const menu = this.getMenu();
      menu.style.display = "none";
    },
    setMenuDisplay() {
      const menu = this.getMenu();
      menu.style.display = "block";
    },
    addDocumentClickEvent() {
      document.addEventListener("click", function() {
        const menu = this.getMenu();
        menu.style.display = "none";
      }.bind(this));
    },
    addContextEvent() {
      document.oncontextmenu = function(e) {
        var event = e || window.event;
        const menu = this.getMenu();
        this.setMenuHide();
        var l, t;
        l = event.clientX;
        t = event.clientY;
        this.x = l
        this.y = t
        if (l >= this.winWidth - menu.offsetWidth) {
          l = this.winWidth - menu.offsetWidth;
        }
        if (t > this.winHeight - menu.offsetHeight) {
          t = this.winHeight - menu.offsetHeight;
        }
        menu.style.left = l + "px";
        menu.style.top = t + "px";
        menu.style.display = "block";
        return false;
      }.bind(this);
    },
    addMenuEvent() {
      const menu = this.getMenu();
      menu.addEventListener(
        "click",
        function(e) {
          const event = e || window.event;
          this.setMenuHide();
          event.cancelBubble = true;
          const tag = this.createTag();
          const modal = this.getModal();
          const uuid = this.generateUUID();
          modal.appendChild(tag);
          const obj = {
            id: uuid,
            x: this.x,
            y: this.y
          };
          this.tagStack.push(obj)
        }.bind(this)
      );
    }
  }
};
</script>
<style lang="postcss">
.context-modal {
  pointer-events: none;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}
* {
  margin: 0;
  padding: 0;
}
.menu {
  width: 100px;
  z-index: 9999;
  border: 1px solid #ccc;
  position: absolute;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  transition: all 0.1s ease;
}
.menu li {
  list-style: none;
  width: 100%;
}
.menu li a {
  display: inline-block;
  text-decoration: none;
  color: #555;
  width: 100%;
  padding: 5px 0;
  text-align: center;
}
.menu li:first-of-type {
  border-radius: 5px 5px 0 0;
}
.menu li a:hover,
.menu li a:active {
  background: #eee;
  color: #0aaf88;
}
</style>
