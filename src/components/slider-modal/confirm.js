import Vue from 'vue';
import sliderModal from './sliderModal.vue';

const prefixCls = 'ivu-sliderModal-confirm';

sliderModal.newInstance = properties => {
    const _props = properties || {};

    const Instance = new Vue({
        data: Object.assign({}, _props, {
            visible: false,
            width: 416,
            title: '',
            body: '',
            iconType: '',
            iconName: '',
            okText: undefined,
            cancelText: undefined,
            showCancel: false,
            loading: false,
            buttonLoading: false,
            scrollable: false
        }),
           render (h) {
            let footerVNodes = [];
            if (this.showCancel) {
                footerVNodes.push(h(Button, {
                    props: {
                        type: 'text',
                        size: 'large'
                    },
                    on: {
                        click: this.cancel
                    }
                }, this.localeCancelText));
            }
            footerVNodes.push(h(Button, {
                props: {
                    type: 'primary',
                    size: 'large',
                    loading: this.buttonLoading
                },
                on: {
                    click: this.ok
                }
            }, this.localeOkText));

            // render content
            let body_render;
            if (this.render) {
                body_render = h('div', {
                    attrs: {
                        class: `${prefixCls}-body ${prefixCls}-body-render`
                    }
                }, [this.render(h)]);
            } else {
                body_render = h('div', {
                    attrs: {
                        class: `${prefixCls}-body`
                    }
                }, [
                    h('div', {
                        class: this.iconTypeCls
                    }, [
                        h('i', {
                            class: this.iconNameCls
                        })
                    ]),
                    h('div', {
                        domProps: {
                            innerHTML: this.body
                        }
                    })
                ]);
            }

            return h(sliderModal, {
                props: Object.assign({}, _props, {
                    width: this.width,
                    scrollable: this.scrollable
                }),
                domProps: {
                    value: this.visible
                },
                on: {
                    input: (status) => {
                        this.visible = status;
                    }
                }
            }, [
                h('div', {
                    attrs: {
                        class: prefixCls
                    }
                }, [
                    h('div', {
                        attrs: {
                            class: `${prefixCls}-head`
                        }
                    }, [
                        h('div', {
                            attrs: {
                                class: `${prefixCls}-head-title`
                            },
                            domProps: {
                                innerHTML: this.title
                            }
                        })
                    ]),
                    body_render,
                    h('div', {
                        attrs: {
                            class: `${prefixCls}-footer`
                        }
                    }, footerVNodes)
                ])
            ]);
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const sliderModal = Instance.$children[0];

     return {
        show (props) {
            sliderModal.$parent.showCancel = props.showCancel;
            sliderModal.$parent.iconType = props.icon;
            switch (props.icon) {
                case 'info':
                    sliderModal.$parent.iconName = 'information-circled';
                    break;
                case 'success':
                    sliderModal.$parent.iconName = 'checkmark-circled';
                    break;
                case 'wsliderModalarning':
                    sliderModal.$parent.iconName = 'android-alert';
                    break;
                case 'error':
                    sliderModal.$parent.iconName = 'close-circled';
                    break;
                case 'confirm':
                    sliderModal.$parent.iconName = 'help-circled';
                    break;
            }

            if ('width' in props) {
                sliderModal.$parent.width = props.width;
            }

            if ('title' in props) {
                sliderModal.$parent.title = props.title;
            }

            if ('content' in props) {
                sliderModal.$parent.body = props.content;
            }

            if ('okText' in props) {
                sliderModal.$parent.okText = props.okText;
            }

            if ('cancelText' in props) {
                sliderModal.$parent.cancelText = props.cancelText;
            }

            if ('onCancel' in props) {
                sliderModal.$parent.onCancel = props.onCancel;
            }

            if ('onOk' in props) {
                sliderModal.$parent.onOk = props.onOk;
            }

            // async for ok
            if ('loading' in props) {
                sliderModal.$parent.loading = props.loading;
            }

            if ('scrollable' in props) {
                sliderModal.$parent.scrollable = props.scrollable;
            }

            // notice when component destroy
            sliderModal.$parent.onRemove = props.onRemove;

            sliderModal.visible = true;
        },
        remove () {
            sliderModal.visible = false;
            sliderModal.$parent.buttonLoading = false;
            sliderModal.$parent.remove();
        },
        component: sliderModal
    };
};

export default sliderModal;