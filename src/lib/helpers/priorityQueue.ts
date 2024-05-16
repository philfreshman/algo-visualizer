export class PriorityQueue<T> {
  private items: { element: T; priority: number }[]

  constructor(private compare: (a: number, b: number) => number) {
    this.items = []
  }

  push(element: T, priority: number): void {
    const queueElement = { element, priority }
    let added = false

    for (let i = 0; i < this.items.length; i++) {
      if (this.compare(priority, this.items[i].priority) < 0) {
        this.items.splice(i, 0, queueElement)
        added = true
        break
      }
    }

    if (!added) {
      this.items.push(queueElement)
    }
  }

  dequeue(): T | undefined {
    return this.items.shift()?.element
  }

  pop(): T | undefined {
    return this.items.pop()?.element
  }

  isEmpty(): boolean {
    return !this.items.length
  }

  has(element: T): boolean {
    return this.items.some((queueElement) => queueElement.element === element)
  }
}
