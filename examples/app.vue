<style lang="less">
    @import "../src/styles/index.less";
</style>
<template>
    <div>
       <sliderModal v-model="modal1" :styles="sliderObjStyle" v-if="showStatus">
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
                sliderObjStyle: {},
                domWidth: document.documentElement.clientWidth || document.body.clientWidth || 0,
                showStatus: false
            }
        },
        watch: {
            domWidth: {
                handler (n, o) {
                    if (n > 1600) {
                        this.sliderObjStyle = {width: '1000px'};
                    } else {
                        this.sliderObjStyle = {width: '800px'};
                    }
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            show () {
                this.showStatus = true;
                this.$nextTick(function () {
                    this.modal1 = true;
                })
                
            },
            domResize (fn) {
                let originFn = window.onresize;
                window.onresize = function () {
                    originFn && originFn();
                    fn();
                };
            },
        },
        mounted () {
            let v = this;
            v.domResize(function () {
                v.domWidth = document.documentElement.clientWidth || document.body.clientWidth || 0;
            });
        }
    }
</script>
