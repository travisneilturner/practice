const reverse = (list) => {
    let prev = null
    let head = list
    while(head != null) {
        let next = head.next
        head.next = prev
        prev = head
        head = next
    }

    return prev
}

console.log(JSON.stringify(reverse({val: 1, next:{val: 2, next: {val: 3, next: null}}})))