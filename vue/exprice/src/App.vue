<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld/> -->
    <input type="file" id="upload-file" @input="upload">
    <img :src="url" width="300">
    <!-- <img src="http://localhost:3002/upload/icon.jpg" alt="sss"> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import {getuser, uploadFile} from './api/user.js'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      url: '',
      baseUrl: 'http://47.119.157.48:3002/upload/'
    }
  },
  created() {
    console.log('333333')
    getuser().then(res => {
      console.log(res)
    })
  },
  methods: {
    async upload() {
      const formdata = new FormData()
      formdata.append("userfile", document.getElementById('upload-file').files[0])
      const res = await uploadFile(formdata)
      this.url = this.baseUrl + res.data.filename
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
