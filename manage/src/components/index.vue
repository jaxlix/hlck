<template>
  <div class="manage">
  	<banner></banner>
  </div>
</template>
<script>
import banner from '../../components/banner/banner'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    banner : banner,
  }
}
</script>

