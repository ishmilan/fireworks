function addLiveEventListener(selector, event, handler) {
    document.querySelector('body').addEventListener(
        event,
        function (evt) {
            var target = evt.target;
            while (target != null) {
                var isMatch = target.matches ? target.matches(selector) : target.msMatchesSelector(selector);
                if (isMatch) {
                    handler(evt);
                    return;
                }
                target = target.parentElement;
            }
        },
        true
    );
}