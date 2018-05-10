<template>
    <div v-transfer-dom>
        <transition :name="transitionNames[1]">
             <div :class="maskClasses" v-show="visible" @click="mask"></div>
        </transition>
        <div :class="wrapClasses" @click="handleWrapClick">
            <transition :name="transitionNames[0]">
                <div class="ivu-sliderModal-content" :style="mainStyles" v-show="visible">
                    <template v-if="!buttonVisibile">
                        <div :class="[prefixCls + '-rightButton']"   :id="[prefixCls + '-rightButton']" :style="{top: domHeight / 2 + 'px', zIndex:'999', left: bvLeft}">
                           <span class="icon iconfont" @click="close">&#xe620;</span>
                        </div>
                    </template>
                    <div class="ivu-sliderModal-window" v-show="!buttonVisibile" :style="swStyles">
                        <slot name="header"></slot>
                        <slot name="content"></slot>
                        <slot name="footer"></slot>
                    </div>
                    <div :class="[prefixCls + '-rightButton']" v-show="buttonVisibile"  :id="[prefixCls + '-rightButton']" :style="{top: domHeight / 2 + 'px'}">
                        <span class="icon iconfont" @click="close">&#xe620;</span>
                    </div>
                    <div :class="[prefixCls + '-body']">
                        <div :class="[prefixCls + '-bodyWrap']">
                            <div v-if="spinShow" class="demo-spin-col">
                                <vueLoading type="bubbles"  color="#d9544e" :size="{ width: '50px', height: '50px' }"></vueLoading>
                            </div>
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<style scoped>
    .demo-spin-col{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        background-color:#fff;
        display: flex;
    }
</style>
<script>
    import TransferDom from '../../directives/transfer-dom';
    import { getScrollBarSize } from '../../utils/assist';
    const prefixCls = 'ivu-sliderModal';
    export default {
        name: 'sliderModal',
        data () {
            return {
                prefixCls: prefixCls,
                wrapShow: false,
                showHead: true,
                buttonLoading: false,
                visible: this.value,
                domHeight:document.documentElement.clientHeight || document.body.clientHeight || 0,
                bvLeft:0
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
            swStyles: {
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
            buttonVisibile:{
                type:Boolean,
                default:true
            },
            spinShow:{
                type:Boolean,
                default:false
            }
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
            },
            styles (n, o) {
                if (n !== o) {
                    this.mainStyles();
                }
            }
        },
        created () {
            let v = this;
            if(!v.buttonVisibile && v.swStyles !== undefined){
                if(v.swStyles.left !== undefined){
                    v.bvLeft = v.swStyles.left
                }
            }
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
                if (this.maskClosable) {
                    this.close();
                }
            },
            cancel () {
                this.close();
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
        mounted () {
            let v = this;
            if (v.visible) {
                v.wrapShow = true;
            }
            window.onresize = function () {
                v.domHeight = document.documentElement.clientHeight || document.body.clientHeight || 0
            }
        }
    };
</script>
