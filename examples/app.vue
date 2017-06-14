<style lang="less">
    @import "../src/styles/index.less";
</style>
<template>
    <div>
       <sliderModal v-model="modal1" :styles="{width:'700px'}">
          <img src="https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/space/pic/item/14ce36d3d539b60010e41dd8e350352ac65cb7b2.jpg" alt="">

       </sliderModal>
       <Button @click="show">显示</Button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                modal1: false,
                val: ''
            }
        },
        methods: {
           show (){
            this.modal1 = true;
           }
        }
    }
</script>
