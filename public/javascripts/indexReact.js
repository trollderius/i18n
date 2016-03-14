
//REACT

var Modal = React.createClass({
    displayName: 'Modal',
    backdrop: function () {
        return React.createElement("div", {className: "modal-backdrop in"});
    },
    modal: function () {
        var style = {display: 'block'};
        return (
                React.createElement("div", {
                    className: "modal in",
                    tabIndex: "-1",
                    role: "dialog",
                    "aria-hidden": "false",
                    ref: "modal",
                    style: style
                },
                        React.createElement("div", {className: "modal-dialog"},
                                React.createElement("div", {className: "modal-content"},
                                        this.props.children
                                        )
                                )
                        )
                );
    },
    render: function () {
        return (
                React.createElement("div", null,
                        this.backdrop(),
                        this.modal()
                        )
                );
    }
});

var Confirm = React.createClass({
    displayName: 'Confirm',
    getDefaultProps: function () {
        return {
            confirmLabel: 'OK',
            abortLabel: 'Cancel'
        };
    },
    abort: function () {
        return this.promise.reject();
    },
    confirm: function () {
        return this.promise.resolve();
    },
    componentDidMount: function () {
        this.promise = new $.Deferred();
        return React.findDOMNode(this.refs.confirm).focus();
    },
    render: function () {
        var modalBody;
        if (this.props.description) {
            modalBody = (
                    React.createElement("div", {className: "modal-body"},
                            this.props.description
                            )
                    );
        }

        return (
                React.createElement(Modal, null,
                        React.createElement("div", {className: "modal-header"},
                                React.createElement("h4", {className: "modal-title"},
                                        this.props.message
                                        )
                                ),
                        modalBody,
                        React.createElement("div", {className: "modal-footer"},
                                React.createElement("div", {className: "text-right"},
                                        React.createElement("button", {
                                            role: "abort",
                                            type: "button",
                                            className: "btn btn-default",
                                            onClick: this.abort
                                        },
                                                this.props.abortLabel
                                                ),
                                        ' ',
                                        React.createElement("button", {
                                            role: "confirm",
                                            type: "button",
                                            className: "btn btn-primary",
                                            ref: "confirm",
                                            onClick: this.confirm
                                        },
                                                this.props.confirmLabel
                                                )
                                        )
                                )
                        )
                );
    }
});

var confirm = function (message, options) {
    var cleanup, component, props, wrapper;
    if (options == null) {
        options = {};
    }
    props = $.extend({
        message: message
    }, options);
    wrapper = document.body.appendChild(document.createElement('div'));
    component = React.render(React.createElement(Confirm, React.__spread({}, props)), wrapper);
    cleanup = function () {
        React.unmountComponentAtNode(wrapper);
        return setTimeout(function () {
            return wrapper.remove();
        });
    };
    return component.promise.always(cleanup).promise();
};

var resetButtons = document.getElementsByClassName("resetButton");
for (var i = 0; i < resetButtons.length; i++) {
    resetButtons[i].onclick = function () {
        var lang = this.getAttribute("lang");

        return confirm('Are you sure?', {
            description: 'Would you like to reset this lang file?',
            confirmLabel: 'Yes',
            abortLabel: 'No'
        }).then((function (_this) {
            return function () {
                location.href = location.origin + "/reset?lang=" + lang;
                removePersistentValues();
                return $(_this).parent().remove();
            };
        })(this));

    };
}
