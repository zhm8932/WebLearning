//《前端面试江湖》，2016年买给自己的生日礼物

//8.如何获取浏览器URL中查询字符串的参数
function getQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
//9.如何实现一个删除字符串左边空白字符的方法？
//^表示开始，'\s'表示空白字符，'/g'表示全局匹配
function leftTrim(str) {
    return str.replace(/^\s*/g, "");
}

//10.What is the data type that JavaScript's typeof returns?
//undefined,boolean,string,number,object,function

//13.实现字符串反转主要是把字符串从末尾开始的每一个元素截取后，再重新组成一个新的字符串
function revert(str) {
    var temp = ""; //remember to initialize
    for (i = str.length - 1; i > 0; i--) {
        temp += str[i];
    }
    return temp;
}
//18.如何检测一个变量是一个string类型？请写出函数实现
function testStr(str) {
    //if((typeof str)=="string")
    if ((typeof str) == "string" || str.constructor == String)
        return true;
    else
        return false;
}

//constructor vs prototype

function Person(name) {
    this.name = name;
    this.showMe = function() {
        alert(this.name);
    }
};

var one = new Person('js');

console.log(one.prototype) //undefined
console.log(typeof Person.prototype); //object
console.log(Person.prototype.constructor); //function Person(name) {...};

//20.有一个字符串abcd-ef-ghi，请用JavaScript将它处理成ghi&ef&abcd.
var str = "abcd-ef-ghi";
var temp = str.split('-');
var result = temp.reverse().join('&');


//请实现鼠标单击页面中的任意标签，alert该😊的名称
document.onclick = function(e) {
    var e = e || window.event;
    var src = e["target"] || e["srcElement"];
    alert(src.tagName.toLowerCase());
}

//33.下面的javascript代码段中，alert的结果是多少？
var a = 1;

function f() {
    //alert(a);
    var a = 2;
}
f(); //undefined

//34.结合<span id="outer">12<span id="inner">text</span></span>,谈谈innerHTML、outerHTML的区别
var childNodes = document.getElementById('inner_outer').getElementsByTagName("p");
//alert(childNodes[0]);
childNodes[0].innerHTML = document.getElementById("outer").innerHTML;
childNodes[1].innerHTML = document.getElementById("outer").outerHTML;
// alert("innerHTML:"+document.getElementById("outer").innerHTML);
// alert("outerHTML:"+document.getElementById("outer").outerHTML);
// alert("innerText:"+document.getElementById("outer").innerText);
// alert("outerText:"+document.getElementById("outer").outerText);

//42.找出id为“newsList”的HTML元素下的第一个节点，并将其移动到“newsList”的最后
var element = document.getElementById("newsList")
var temp = element.getElementsByTagName("p")[0];
element.removeChild(temp);
element.appendChild(temp);

//书中答案，貌似不可行
// var ul=document.getElementById("newsList").childNodes;
// alert(ul.firstChild.value);
// ul.appendChild(ul.firstChild);

//复制节点
var copy = temp.cloneNode(true);
element.appendChild(copy);

//46.insertAfter()
//DOM没有提供insertAfter()方法
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        // 如果最后的节点是目标元素，则直接添加。因为默认是最后
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
        //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
    }
}
var newElement = document.createElement("p");
var textNode = document.createTextNode("Hi June, just hold on!");
newElement.appendChild(textNode);
document.createAttribute("class");
//insertAfter(newElement,element);
var parent = element.parentNode;
parent.insertBefore(newElement, element);

//48.实现输出document对象中的所有成员的名称和类型
// for(key in document){
//     document.write(key+="=="+document[key]+"<br />");
// }

//49.找出所有className包含text的标签<li>,并将它们的背景颜色设置为黄色
var list = document.getElementsByTagName("li");
for (i = 0; i < list.length; i++) {
    var temp = list[i].getAttribute("class");
    if (temp != null && temp.indexOf("text") != -1) {
        list[i].style.backgroundColor = "yellow";
    }
}

//65.请编写代码扩展JavaScript的string对象，让其拥有一个新的方法killpoint()来删除字符串中的所有英文句号“.”，请用尽量少的代码实现。

String.prototype.killpoint = function() {
    return this.replace(/\./g, '');
}

//66.对string对象进行扩展，使其具有删除前后空格的方法
String.prototype.bothtrim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//67
//获取字符数组
String.prototype.toCharArray = function() {
    return this.split("");
}

//获取n个相同的字符串
String.prototype.repeat = function(num) {
    var tempArr = [];
    for (var i = 0; i < num; i++) {
        tempArr.push(this);
    }
    return tempArr.join("");
}

//字符串逆序 （数组逆序有reverse方法）
String.prototype.reverse = function() {
    return this.split("").reverse().join("");
}

//测试是否是数字
String.prototype.isNumeric = function() {
    var tempFloat = parseFloat(this);
    if (isNaN(tempFloat))
        return false;
    return tempFloat == this;
}

//测试是否是整数
String.prototype.isInt = function() {
    if (this == "NaN")
        return false;
    return this == parseInt(this);
}

//合并多个空白为一个空白
String.prototype.oneSpace = function() {
    //* 匹配前面元字符0次或多次;+ 匹配前面元字符1次或多次;? 匹配前面元字符0次或1次
    //此处应该用+，表示至少有一个空白
    return this.replace(/\s+/g, ' ');
}

//保留数字
String.prototype.leftNum = function() {
    return this.replace(/[^\d]+/g, "");
}

//保留字母
String.prototype.leftChar = function() {
    return this.replace(/[^a-zA-Z]+/g, "");
}

//保留中文
String.prototype.getCn = function() {
    return this.replace(/[^\u4e00-\u9fa5\uf900-\ufa2d]/g, "");
}

//得到字节长度，[^\x00-\xff]匹配双子节字符，一般就像汉字
String.prototype.getBinLen = function() {
    return this.replace(/[^\x00-\xff]/g, "--").length;
}

//从左截取指定长度到字符串
String.prototype.left = function(n) {
    return this.slice(0, n);
}

//从右截取指定长度到字符串
//0,1,2,3,4,5
String.prototype.right = function(n) {
    return this.slice(this.length - n);
}

//21页html编码，unicode转化

//请用JavaScript实现获取5个0-99之间不相同的随机数
function getRandomArr() {
    var randomArr = new Array();
    for (var i = 0; i < 5; i++) {
        var temp = Math.floor(Math.random() * 100);
        if (randomArr.indexOf(temp)) {
            randomArr.push(temp);
        }
    }
    return randomArr;
}

//求两数最大公约数，Highest Common Factor(HCF)
function hcf(number1, number2) {
    for (var i = Math.min(number1, number2); i > 0; i--) {
        if (number1 % i == 0 && number2 % i == 0)
            return i;
    }
}

//获取一个1-50的随机不重复数组
function randomNum() {
    var arr1 = [];
    var number = 50;
    for (var i = 1; i <= number; i++) {
        arr1.push(i); //先把1-50有序地放入数组
    }
    var arr2 = [];
    for (var j = number; j > 0; j--) {
        //Math.random是为了获取剩余未放入arr2的元素个数,[0,50)
        //Math.floor是向下取整的，所以index返回[0,49]
        var index = Math.floor(Math.random() * j);
        //arr1.splice(index,1)代表从arr1数组中删除index这一项，并返回被删的元素，同时arr1会被删除该项
        arr2.push(arr1.splice(index, 1));
    }
    return arr2;
}

//请编写尽可能简洁的javascript代码，找到在第一个数组array1中出现，而在第二个数组array2中没有出现的数字
//indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
//i: 1,23,45
//ii: 5,6,7,22,24,46
function getUniqueNum(array1, array2) {
    var str = array2.join("-"); //5-6-7-22-24-46
    var result = [];
    for (var i = 0; i < array1.length - 1; i++) {
        if (str.indexOf(array1[i]) == -1)
            result.push(array1[i]);
    }
    return result;
}

//编写函数，用于过滤一个数组内重复的元素，并用这些元素重构一个新数组，新数组内也不能有重复元素
//var arrNum=[1,4,1,1,3,3,4,6,7,8,3,7,0,11,22,22];
//[5,4,1,1,3,3,4,6,7,8,3,7,0,11,22,23,23,23,25,35,4,5]
function rmRepeat(arrNum) {
    var str = "," + arrNum.join(',') + ","; //首尾加","，防止首尾元素控制不到
    var newArr = [];
    for (var i = 0; i < arrNum.length; i++) {
        //",1,"这样的分割，防止",11,"这样的元素也被"arrNum[i]==1"剔除了
        if (str.indexOf("," + arrNum[i] + ",") != -1) {
            newArr[newArr.length] = arrNum[i];
        }
        while (str.indexOf("," + arrNum[i] + ",") != -1) {
            str = str.replace("," + arrNum[i] + ",", ","); //遍历str，删除其中跟arrNum[i]项相同的项
        }
    }
    return newArr; //newArr只放了arrNum中不同项
    //结果应为[5,4,1,3,6,7,8,0,11,22,23,25,35]
}

//现有一个数组(元素为数字，并且有可能重复)，请给Array.prototype增加一个方法（方法名自取），该方法能去掉数组中全部最大和最小的数字
Array.prototype.rmMaxMin = function() {
    var min = Math.min.apply(null, this); //查找最小数字
    var max = Math.max.apply(null, this); //查找最大数字
    for (var i = 0; i < this.length; i++) {
        if (min == this[i] || max == this[i]) {
            this.splice(i, 1);
        }
    }
    return this;
}

//在如下数组的第二个元素后插入一个元素3
var arr = [1, 2, 4, 5, 6];
arr.splice(1, 0, 3);

//将数组["a","b"],["c","d"]合并，并且删除第二个元素
var arr1 = ["a", "b"];
var arr2 = ["c", "d"];
var str = arr1.join("-") + "-" + arr2.join("-"); //a-b-c-d
var mergerArr = str.split("-");
mergerArr.splice(1, 1);

//请写出如下JavaScript代码片段的运行结果
var my_arr = [];
for (var i = 0; i <= 5; i++) {
    my_arr.push(i * (i + 1));
}
var val = 0;
while (val = my_arr.pop()) {
    console.log(val + " ");
}

//请写一个函数removeVoid(arr),删除该数组中值为“null,undefined”的项，返回原数组。
//removeVoid([null,1,"334","null","undefined",undefined])
function removeVoid(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (!arr[i] || arr[i] == "" || typeof(arr[i]) == "undefined") {
            arr.splice(i, 1);
        }
    }
    return arr;
}

//105.数组pop(),push(),shift(),unshift()  －长点（push，unshift）的是长度，短点的是值
/*
pop():从集合中把最后一个元素删除，并返回这个元素的值;
push():在集合中添加元素，并返回新的长度;
unshift():在集合开头添加一个或多个元素，并返回新的长度;
shift():从集合中把第一个元素删除，并返回这个元素的值
*/

//109.请分别描述JavaScript中prototype,constructor,this,arguement的含义
/*
prototype:prototype的行为类似于c++中的静态域，将一个属性添加微prototype的属性，这个属性将被该类型创建的所有实例所共享，但是这种共享是只读懂。换句话说，对象在读取某个属性时，总是先检查自身域懂属性表，如果有这个属性，则会返回这个属性，否则就会读取prototype域，返回prototype域上的属性。另外，JavaScript允许prototype域引用任何类型的对象。因此，如果对prototype域懂读取依然没有找到这个属性，则JavaScript将递归地查找prototype域所指向对象的prototype域，直到这个对象的prototype域为它本身或者出现循环为止；

constructor:即构造函数，在对象创建或者实例化时被调用的方法。通常使用该方法来初始化数据成员和所需资源。构造器constructor不能被继承，因此不能重写overriding,但可以被重载overloading。对象的constructor属性返回创建该对象的函数的引用。

this:在JavaScript中，this通常指向的是正在执行的函数本身，或者是志向该函数所属的对象（运行时）。当我们在页面中定义函数doSomething()时，它当owner是页面，或者是JavaScript中的window对象（或global对象）。对于一个onclick属性，则为它所属的HTML元素所拥有，this应该指向该HTML元素。

argument：所有的函数都有属于自己的一个arguments对象，它包括了函数所要调用的参数。它不是一个数组，如果用typeof arguements，那么返回的是object。虽然我们可以用调用数据的方法来调用arguments。比如length、index方法。
*/

//110.写一个函数，参数为一个元素，返回指定元素的第一个子元素，要求兼容IE6/7/8,FireFox,Safari,Chrome，函数越简单越好。
function getFirst(el) {
    var nodes = el.children; //获取元素下所有的子节点
    return nodes.length != 0 ? nodes[0] : null;
}

//js的预编译，变量提升
var b = 1;

function c() {
    console.log(b);
    if (!b) {
        var b = 2;
    }
    console.log(b);
}
c(); //undefined    2

//拓展，变量提升
(function() {
    a = 5; //由于下边的var a=10;导致变量提升，a预编译，是局部变量
    console.log(window.a); //无声明此全局变量，故是undefined
    var a = 10;
    console.log(a);
})(); //undefined   10

//下面JavaScript代码的运算结果是2还是undefined?请阐述原因。
function show() {
    var b = 1;
    a = ++b;
    //return a;
}
show();
console.log(a); //2

//117.请写一个函数closest(element,className),传入DOM对象及CSS名称，或者标签名称，查找到离它自身最近到父节点
function closest(element, className) {
    var parent = null;
    if (element) {
        if (element.className == className)
            parent = element.parentNode;
    }
    return parent;
}

//118.请写一个函数getParameters()来获取浏览器地址栏url全部参数，并返回一个JSON串。
function getParameters(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&])*(&|$)");
    var str = window.location.search.substr(1).match(reg);
    console.log(window.location.href);
    console.log(window.location.search);
    console.log(window.location.search.substr(1));
    console.log(window.location.search.substr(1).match(reg));
    if (str != null)
        return decodeURI(str[2]);
    else return null;
}

//119.请写一个函数来验证电子邮件到格式是否正确。
function checkEmail(mail) {
    var reg = new RegExp("^[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+.[a-zA-Z0-9_]+$");
    if (mail.match(reg))
        return true;
    else
        return false;
}

//已知对象var obj={....},但对象的属性未知，如何对该对象的属性进行遍历？
function allProperties(obj) {
    //用来保存所有的属性名称和值
    var props = "";
    //开始遍历
    for (var p in obj) {
        if (obj[p] == "function") {
            obj[p]();
        } else {
            //p为属性值，obj[p]为对应属性的值
            props += p + "=" + obj[p]＋
            "\t";

        }
    }
    //最后显示所有的属性
    alert(props);
}
