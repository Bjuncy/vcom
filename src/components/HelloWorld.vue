<template>
  <div class="hello">
    <h1 @click="notice">notice</h1>
    <h1 @click="message">message</h1>
    <h1 @click="model">model</h1>
  </div>
</template>

<script>
import RenderCell from './base/render'
export default {
  name: 'HelloWorld',
  components: {
    RenderCell
  },
  data () {
    return {
    }
  },
  methods: {
    notice () {
      this.$notice.info({
        title: 'title',
        desc: 'desc',
        duration: 0
      })
    },
    message () {
      this.$message.loading({
        content: '提示',
        duration: 0
      })
    },
    model () {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
