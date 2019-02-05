(() => {
        if (EventSource) {

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
            let startTime = new Date().getTime() / 1000;
        
            let source = new EventSource("/orchestrator");
            source.addEventListener("gm", function(event){
                if (event.lastEventId.split(":")[2] > startTime) {
                    if (event.data === "reload") {
                        reloadListener();
                    }
                }
            })
            source.onmessage = function (event) {
                let id_data = event.lastEventId.split(":");
                let _sc = id_data[0];
                let _id = parseInt(id_data[1]);

                if (_sc !== lastSC) {
                    // Server Session Code
                    // If the server is (re)started - a new Session Code is used
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