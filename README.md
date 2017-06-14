# sliderModal
** 右侧滑出modal 基于iview Modal的基础上做开发，抽离出来一个单独的模块。避免iview更新的时候要重新兼容。 <br />


如果有Bug，请提交一下issues <br />

## ![slideModal](http://7xjfvt.com1.z0.glb.clouddn.com/demo/a.gif)

## Usage

|   key  |  params   |
|:-------|:----------|
| styles |  object   |

npm install slider-modal

```html
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



```



