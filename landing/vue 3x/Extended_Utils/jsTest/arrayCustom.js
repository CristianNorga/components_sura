// custom array

class MyArray {
	constructor() {
		this.length = 0;
		this.data = {};
	}
	get(index) {
		return this.data[index];
	}
	push(item) {
		this.data[this.length] = item;
		this.length++;
		return this.data;
	}
	pop() {
		const lastItem = this.data[this.length - 1];
		delete this.data[this.length - 1];
		this.length--;
		return lastItem;
	}
	delete(index) {
		const item = this.data[index];
		this.shiftIndex(index);
		return item;
	}
	shiftIndex(index) {
		for (let i = index; i < this.length - 1; i++) {
			this.data[i] = this.data[i + 1];
		}
		delete this.data[this.length - 1];
		this.length--;
	}
	unshift(item) {
		for (let i = this.length; i > 0; i--) {
			this.data[i] = this.data[i - 1];
		}
		this.data[0] = item;
		this.length++;
		return this.data;
	}
}
const myArray = new MyArray();
myArray.push("test1");
myArray.push("test2");
myArray.push('test3');
myArray.unshift('test0');

console.log(myArray);

