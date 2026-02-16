class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(el) {
        if (Array.isArray(el)) {
            this.items.push(...el);
        } else {
            this.items.push(el);
        }
    }

    dequeue() {
        if (this.isEmpty()) return;
        return this.items.shift();
    }

    peek() {
        if (this.isEmpty()) return;
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

export default Queue;