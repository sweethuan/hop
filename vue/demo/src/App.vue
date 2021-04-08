<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      {{isLoad }}
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import {getuser} from './api/user.js'
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      isLoad: undefined
    }
  },
  async created() {
    // axios.get('http://localhost:3000/user').then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log('err:', err)
    // })
    // getuser().then(ret => {
    //   console.log(ret)
      
    // }, err => {
    //   console.log('err:', err)
    // })
    console.log(this.sum(0))
    // console.log(this.qc([2,1,5,3,1,5,4,6]))
      
  },
  mounted() {
  },
  methods: {
    sum(n) {
      if(n >= 3) {
        return n
      }
      return n + this.sum(n+1)
      // return 0 + this.sum(1)
      // return 0 + 1 + this.sum(2)
      // return 0 + 1 + 2 + this.sum(3)
      // return 0 + 1 + 2 + 3
      
    },
    qc(arr) {
      let temp = []
      arr.forEach(item => {
        if(!temp.includes(item)){
          temp.push(item)
        }
        
      })
      return temp
    }
  },
  components: {
    HelloWorld
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
