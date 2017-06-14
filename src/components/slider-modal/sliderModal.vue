<template>
    <div v-transfer-dom>
      <transition :name="transitionNames[1]">
          <div :class="maskClasses" v-show="visible" @click="mask"></div>
      </transition>
       <div :class="wrapClasses" @click="handleWrapClick">
           <transition :name="transitionNames[0]">
      
              <div class="ivu-sliderModal-content" :style="mainStyles" v-show="visible">
                 <div :class="[prefixCls + '-rightButton']">
                    <span class="icon iconfont" @click="close">&#xe620;</span>
                 </div>
                 <div :class="[prefixCls + '-body']">
                    <div :class="[prefixCls + '-bodyWrap']">
                        <slot></slot>
                    </div>
                </div>
              </div>
           </transition>
       </div>
    </div>
</template>

<script>
    import TransferDom from '../../directives/transfer-dom';
    import { getScrollBarSize } from '../../utils/assist';
    import Emitter from '../../mixins/emitter';

    const prefixCls = 'ivu-sliderModal';

    export default {
        name: 'sliderModal',
        data () {
            return {
                prefixCls: prefixCls,
                wrapShow: false,
                showHead: true,
                buttonLoading: false,
                visible: this.value
            }
        },
        directives: { TransferDom },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            maskClosable: {
                type: Boolean,
                default: true
            },
            styles: {
                type: Object
            },
            transitionNames: {
                type: Array,
                default () {
                    return ['slide-fade', 'fade'];
                }
            },
            className: {
                type: String
            },
        },
        computed:{
             wrapClasses () {
                return [
                    `${prefixCls}-wrap`,
                    {
                        [`${prefixCls}-hidden`]: !this.wrapShow,
                        [`${this.className}`]: !!this.className
                    }
                ];
            },
            maskClasses () {
                return `${prefixCls}-mask`;
            },
            mainStyles () {
                let style = {};
                const styleWidth = {
                    width: `${this.width}px`
                };
                const customStyle = this.styles ? this.styles : {};
                Object.assign(style, styleWidth, customStyle);

                return style;
            }
        },
        watch:{
            value (val) {
                this.visible = val;
            },
            visible (val) {
                if (val === false) {
                    this.buttonLoading = false;
                    this.timer = setTimeout(() => {
                        this.wrapShow = false;
                        this.removeScrollEffect();
                    }, 300);
                } else {
                    if (this.timer) clearTimeout(this.timer);
                    this.wrapShow = true;
                    if (!this.scrollable) {
                        this.addScrollEffect();
                    }
                }
                //this.broadcast('Table', 'on-visible-change', val);
            },
        },
        methods:{
            handleWrapClick (event) {
                // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
                const className = event.target.getAttribute('class');
                if (className && className.indexOf(`${prefixCls}-wrap`) > -1) this.mask();
            },

            checkScrollBar () {
                let fullWindowWidth = window.innerWidth;
                if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
                    const documentElementRect = document.documentElement.getBoundingClientRect();
                    fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
                }
                this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
                if (this.bodyIsOverflowing) {
                    this.scrollBarWidth = getScrollBarSize();
                }
            },
            setScrollBar () {
                if (this.bodyIsOverflowing && this.scrollBarWidth !== undefined) {
                    document.body.style.paddingRight = `${this.scrollBarWidth}px`;
                }
            },
            resetScrollBar () {
                document.body.style.paddingRight = '';
            },
            addScrollEffect () {
                this.checkScrollBar();
                this.setScrollBar();
                document.body.style.overflow = 'hidden';
            },
            removeScrollEffect() {
                document.body.style.overflow = '';
                this.resetScrollBar();
            },
            close () {
                this.visible = false;
                this.$emit('input', false);
                this.$emit('on-cancel');
            },
            mask () {
                console.log('11');
                if (this.maskClosable) {
                    this.close();
                }
            },
            cancel () {
                this.close();
            },
        },
        mounted () {
            if (this.visible) {
                this.wrapShow = true;
            }
        }
    };
</script>
