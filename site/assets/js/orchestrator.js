(() => {
        let elem = document.querySelector('.orchestrator');

        messageQueue = new (class {
            constructor() {
                this.messageQueue = [];
                this.ready = true;
                this.hideTimeout = undefined;
            }

            hideMessage() {
                elem.classList.remove('active');
                setTimeout(() => elem.innerText = "", 1000);
            }

            showMessage(message, time) {
                if (message) {
                    clearTimeout(this.hideTimeout);

                    elem.innerText = message;

                    elem.classList.add('active');
                    setTimeout(() => {
                            this.ready = true;
                        }, 1000
                    );

                    this.hideTimeout = setTimeout(() => {
                        this.hideMessage();
                        this.next();
                    }, time || 5000);
                }
            }

            add(message) {
                this.messageQueue.push(message);
                this.next();
            }

            next() {
                if (this.ready && this.messageQueue.length) {
                    this.ready = false;
                    this.showMessage(this.messageQueue.pop())
                }
            }
        });

        let lastSC;
        let lastId = -1;
        if (EventSource) {
            let source = new EventSource("/orchestrator");
            source.onmessage = function (event) {
                let id_data = event.lastEventId.split(":");
                let _sc = id_data[0];
                let _id = parseInt(id_data[1]);

                if (_sc !== lastSC) {
                    lastSC = _sc;
                    lastId = -1;
                }

                if (_id > lastId) {
                    messageQueue.add(event.data);
                    lastId = _id;
                }
            };
        }
    }
)();