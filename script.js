class List {
  constructor(head=null, tail=null) {
    this.head = head;
    this.tail = tail;
  }
  
  static from(iterable) {
    let list = new List();
    let result = list;
    
    if (iterable[Symbol.iterator]) {
      for (let value of iterable) {
        list = list.tail = new List();
        list.head = value;
      }

      return result.tail;
    } else if ('length' in iterable) {
      if (iterable.length === 0) return null;
      result.head = iterable[0];
      result.tail = List.from(iterable.slice(1));
      return result;
    }

    return result;
  }

  map(f) {
    return new List(f(this.head), this.tail && this.tail.map(f))
  }
}



class List {
  constructor(head, tail) {
    this.head = head
    this.tail = tail
  }

  map(f) {
    return new List(f(this.head), this.tail && this.tail.map(f))
  }
  [Symbol.iterator]() {
    let self = this;
    
    return {
      next() {
        let head = self && self.head;
        self = self && self.tail;
        
        if (head !== null && head !== undefined) {
          return {
            value: head,
            done: false
          };
        } else {
          return {done: true};
        }
      }
    };
  }
}
