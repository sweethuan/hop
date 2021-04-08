import picCop from "./PictureCompression";
import CryptoJS from "./aes"
export const PictureCompression = {
  data() {
    return {
      PWkey: "baowei20200812st",
      PWiv: "baowei20200812st"
    };
  },
  methods: {
    //本地图片获取-图片压缩-base64转码
    PictureCompression(widths, fn) {
      var oInput = document.getElementById("file");
      let body = document.getElementsByTagName("body")[0];
      if (oInput != null) {
        body.removeChild(oInput);
      }
      let input = document.createElement("input");
      input.type = "file";
      input.id = "file";
      input.accept = ".png,.jpg,.jpeg";
      input.style.display = "none";
      body.appendChild(input);
      picCop("file", widths, fn);
      input.click();
    },
    // 密码加密
    getAesString(data) {
      var key = CryptoJS.enc.Utf8.parse(this.PWkey);
      var iv = CryptoJS.enc.Utf8.parse(this.PWiv);
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString(); //返回的是base64格式的密文
    },
    //密码解密
    getDAesString(encrypted) {
      var key = CryptoJS.enc.Utf8.parse(this.PWkey);
      var iv = CryptoJS.enc.Utf8.parse(this.PWiv);
      var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
  }
};
