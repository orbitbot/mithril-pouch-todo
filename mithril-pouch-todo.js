var hello = {
    controller: function() {
        return { greeting: "Hello" };
    },
    view: function(ctrl) {
        return m("h1", ctrl.greeting);
    }
};

m.mount(document.getElementById('todoApp'), hello);