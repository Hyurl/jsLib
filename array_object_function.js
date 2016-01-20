/*
 js 数组、对象和函数的交集:
 */

/*
 例1. 使用实例化对象的方法定义一个 js 数组 arr:
 */
var arr = new Array(); // 实例化一个对象，这个对象是一个数组;
arr['name'] = 'Ayon'; // js 关联数组为键赋值的方式为 array[key] = value;
arr.role = 'student'; // js 关联数组另一种赋值方式为 array.key = value;
console.log(arr['name']); // 同样，js 获取数组键的值的方式也有两种，array[key] == array.key; 此处将输出 Ayon;
console.log(arr.role); // 和赋值方式没有关系，此处 arr.role 同样可以写作 arr['role']; 此处将输出 student;
/* 更值得一提的是，js 数组中键的值也可以是一个函数(匿名函数) */
arr['func'] = function(){
	return this['name'] + ' is a ' + this.role + '.'; // 此处 this 对象指向全局对象; 将返回 Ayon is a student.;
	/* return this.name + ' is a ' + this['role'] + '.'; // 也是一样的 */
};
console.log(arr.func()); // 同样，arr['func']() 和 arr.func() 都是可取的; 此处将输出 Ayon is a student.; // 注意，函数的调用是需要在函数名后面加 () 的;

console.log(); // 因为 console.log() 输出的内容是会换行的，所以简单的隔行就是 console.log();

/*
 例2. 使用实例化对象的方法定义一个 js 对象 obj:
 */
var obj = new Object(); // 实例化一个对象，这个对象是一个对象;
obj.name = 'Ayon'; // js 对象为属性赋值的方式为 object.attr = value;
obj['role'] = 'student'; // js 对象另一种赋值方式为 object[attr] = value;
console.log(obj.name); // 同样，js 获取对象属性的值的方式也有两种，object.attr == object[attr]; 此处将输出 Ayon;
console.log(obj['role']); // 和赋值方式没有关系，此处 obj['role'] 同样可以写作 obj.role; 此处将输出 student;
/* js 对象的属性也可以是一个函数(匿名函数) */
obj.func = function(){
	return this.name + ' is a ' + this['role'] + '.'; // 此处 this 对象指向全局对象; 将返回 Ayon is a student.;
	/* return this['name'] + ' is a ' + this.role + '.'; // 也是一样的 */
};
console.log(obj.func()); // 同样，obj.func()  和 obj['func']() 都是可取的; 此处将输出 Ayon is a student.;

console.log();

/* 然后我们来看看 typeof 数组和对象会返回什么: */
console.log(typeof(arr));
console.log(typeof(obj));
/* 没错，都是 object; */

console.log();

/*
 这是不是说在 js 中数组和对象是不分的呢？答案是：还是有区别的;
 下面的赋值方式就只能是对象可以采用：
 */
/*
 例3. 使用简写的方式定义一个 js 对象 obj2:
 */
var obj2 = {
	name:'Ayon', // 将值 Ayon 赋给属性 name;
	role:'student', // 将值 student 赋给属性 role;
	/* 将一个匿名函数的返回值赋给属性 func; */
	func: function(){
		return this.name + ' is a ' + this.role + '.';
	}
};
console.log(obj2['name']);
console.log(obj2.role);
console.log(obj2.func());
/* 注意，上面的调用方法依旧是可用的，比如 console.log(obj2['name']()) 依旧输出 Ayon; */
/*
 虽然 js 数组也有简写的定义方法(var arr2 = [];), 
 但数组却不知持形如 [name:value] 或者其他的键值对形式，
 只能使用实例化的方式创建关联数组, 
 js 数组简写的定义方法只适用于索引数组。
 */

console.log();

/*
 接下来我们看看 js 的函数;
 例4. 使用实例化对象的方法定义一个函数 func:
 */
var func = new Function();
func.Name = 'Ayon'; // 注意，不能使用 name 作为构造 Function() 函数的属性;
func.role = 'student'; // js 为函数属性赋值和获取属性值的方法与数组、对象相同，func.role == func['role'];
/* js 的另一个特别之处, 函数内部可以嵌套另外的匿名函数, 此处将一个匿名函数的返回值赋给 func 函数的 funcInner 属性; */
func.funcInner = function(){
	return this.Name + ' is a ' + this.role + '.'; // 此处 this 指向全局对象;
};
console.log(func.funcInner()); // 依旧输出 Ayon is a student.;
/* 然后我们输出 typeof(func) */
console.log(typeof(func)); // 注意 typeof() 一个函数只需要函数名，所以这里不需要在 func 后面加 ();
/* 你以为会输出 object, 错了, 是 function */

console.log();

/*
 js 函数虽然没有简写的定义方法, 但是, js 函数拥有多种定义方法和用法;
 js 面向对象的编程是不基于类的，但它的灵活性却比类更强大，同时也更复杂。
 下面列出一些 js 函数的定义和用法供作参考:
 */
/* 例5. 函数声明 */
function func2(a, b){
	return a + b;
}
console.log(func2(3, 4)); // 输出 7;

/* 例6. 函数表达式 */
var func3 = function(a, b){
	return a + b;
}
console.log(func3(3, 4)); // 输出 7;

/* 例7. Function() 构造函数 */
var func4 = new Function('a', 'b', 'return a + b');
console.log(func4(3, 4)); // 输出 7;

/* 例8. 自调用函数, 程序运行时自动执行的函数, 此例自动输出 Ayon is a Web Builder., 无需调用 */
(function(name, value){
	var name = name || 'Ayon';
	var role = value || 'student';
	function func(){
		return name + ' is a ' + role +'.';
	}
	console.log(func());
})('Ayon', 'Web Builder');

/*
 其中，例5 中的函数成为函数字面量; 
 例6、例7、例8 中的函数成为匿名函数; 
 */
 
 console.log();

 /* 
  下面再示例另一中 js 函数写法, 这种函数需要实例化后才能调用其内部函数;
  匿名或不匿名的函数都是可以的。
  例9. 需要实例化的函数:
  */
 function Func(name, value){
 	this.name = name || 'Ayon';
 	this.role = value || 'student';
 	this.func = function(){
 		return this.name + ' is a ' + this.role + '.';
 	};
 }
 var exeFunc = new Func('Ayon', 'Web Builder'); //实例化 Func, 这一步是必须的;
 console.log(exeFunc.func());

/* 
 闭包的好处是，在同一程序中遇到命名冲突时，可以避免这种冲突;
 因为闭包函数内部的变量和函数都是私有的, 不会和函数外部或其他闭包函数内的变量或函数形成冲突; 
 但是, 闭包函数会驻留内存, 需要慎用闭包, 或者在闭包函数使用完后手动销毁;
 实际上, 上面大多数函数都是闭包的, 凭借对闭包函数的介绍, 就很容易知道那些事闭包的函数了。
 */

console.log();

/*
 虽然 typeof() 函数返回的是 function, 但是将 js 函数描述为对象更加准确; 
 因为所有的 js 函数都拥有属性和方法;
 所有的 js 函数都包含 this 对象和 arguments 对象(传入该函数的所有参数)。
 */
/* 
 例10. arguments 对象:
 js 不需要在定义函数时在 () 指定该使用的参数，arguments 对象会自动获取传入的参数;
 */
function Func2(){
	this.name = arguments[0] || 'Ayon'; // 无论是数组还是对象，索引数码都必须放在 [] 内;
	this.role = arguments[1] || 'student';
	this.argLen = arguments.length;
	this.func = function(){
		return this.name + ' is a ' + this.role + ', ' + this.argLen + ' arguments given.'; 
	};
	/* 
	 当然, object[name] 的形式也是可用的;
	 上句等于 return this['name'] + ' is a ' + this['role'] + ', ' + arguments['length'] + ' arguments been given.'; 
	 */
}
var exeFunc2 = new Func2('Ayon', 'Web Builder');
console.log(exeFunc2.func()); // 输出 Ayon is a Web Builder, 2 arguments given.

console.log();

/* 
 最后再加一点 js 对象赋值的实例;
 js 的对象支持 object[name] = value 的方式赋值, 于是 for...in... 就有用处了;
 */
var obj3 = {name: 'Ayon', role: 'student'}, //定义一个 obj3 对象用来存储信息
	obj4 = {}, // 定义一个 obj4 的空对象
	arr3 = [], // 定义一个 arr3 的空数组
	/* 
	 定义一个 func6 函数 
	 函数的返回参数所设定的键的值，当不存在参数时输出默认的信息
	 注意，这个函数是无法正常运行的
	 */ 
	func6 = function(name){
		return function(){
			return name ? this[name] : this.name + ' is a ' + this.role + '.';
		}
	},
	name;
for(name in obj3){
	obj4[name] = obj3[name]; // 将 obj3 对象的“键值对”传给 obj4 对象;
	/* obj4.name 是为 obj4 对象的 name 属性赋值，所以这里不能用 obj4.name = obj3.name, 下同 */
	arr3[name] = obj3[name]; // 将 obj3 对象的“键值对”传给 arr3 数组;
	/* 注意，func6[name] = obj3[name]; 是不起作用的 */

}
console.log(obj4); // 输出 { name: 'Ayon', role: 'student' }
console.log(arr3); // 输出 [ name: 'Ayon', role: 'student' ]
//console.log(func6()());
