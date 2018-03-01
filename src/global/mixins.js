// import Stomp  from 'stompjs'
export default {
  store_init: {
    created() {
      if (this.store && this.store.state && this.store.state.name) {
        let modulesMap = this.$store._modules.root._children
        let name = this.store.state.name
        // 如果modulesMap里面没有此模块名，说明是第一次加载，那么注册vuex的模块
        if (modulesMap[name] == undefined) {
          this.$store.registerModule(name, this.store)
        }
      }
    }
  },
  websocket: {
    data() {
      return {
        websock: null
      }
    },
    methods: {
      threadPoxi() {
        //参数
        const agentData = "mymessage";
        //若是ws开启状态
        if (this.websock.readyState === this.websock.OPEN) {
          this.websocketsend(agentData)
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (this.websock.readyState === this.websock.CONNECTING) {
          let that = this; //保存当前对象this
          setTimeout(function () {
            that.websocketsend(agentData)
          }, 300);
        }
        // 若未开启 ，则等待500毫秒
        else {
          this.initWebSocket();
          let that = this; //保存当前对象this
          setTimeout(function () {
            that.websocketsend(agentData)
          }, 500);
        }
      },
      initWebSocket() {
        //ws地址
        const wsuri = "ws://192.168.43.217:3000/ws/test"
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
      },
      websocketonmessage(e) {
        const redata = JSON.parse(e.data);
        console.log(redata.value);
      },
      websocketsend(agentData) {
        this.websock.send(agentData);
      },
      websocketclose(e) {
        console.log("connection closed (" + e.code + ")");
      },
    },
    created() {
      console.log('initWebSocket');
      var socket = io.connect("http://127.0.0.1:3000/ws", {
        path: "/ws/test"
      });
      socket.on("connect", function () {
        console.log("连接成功");
      });
    }
  }
}
