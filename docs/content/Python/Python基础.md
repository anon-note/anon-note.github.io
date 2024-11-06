
# Python基础

## 1. 字符串

```
>>> print(r'C:\some\name')
C:\some\name
```

### 1.1 切片

```
# 切片的下标
 +---+---+---+---+---+---+
 | P | y | t | h | o | n |
 +---+---+---+---+---+---+
 0   1   2   3   4   5   6
-6  -5  -4  -3  -2  -1
```

### 1.2 方法

https://docs.python.org/zh-cn/3.13/library/stdtypes.html#string-methods

## 2.列表

### 2.1 与字符串的区别

字符串下标不可修改内容，列表可以
```python
>>> str1='1234'
>>> str1[0] = 'x'   # 错误
Traceback (most recent call last):
  File "<python-input-57>", line 1, in <module>
    str1[0] = 'x'
    ~~~~^^^
TypeError: 'str' object does not support item assignment
```

### 2.2 赋值

- Python 中的简单赋值绝不会复制数据。 当你将一个列表赋值给一个变量时，该变量将引用 _现有的列表_。你通过一个变量对列表所做的任何更改都会被引用它的所有其他变量看到
```python
>>> rgb = ["Red", "Green", "Blue"]
>>> rgba = rgb
>>> id(rgb) == id(rgba)  # 它们指向同一个对象
True
>>> rgba.append("Alph")  # 修改了rgba同时也影响了rgb，因为两者引用同一个列表
>>> rgb
["Red", "Green", "Blue", "Alph"]
```

- 切片操作返回包含请求元素的新列表。以下切片操作会返回列表的 [浅拷贝](https://docs.python.org/zh-cn/3.13/library/copy.html#shallow-vs-deep-copy)：

```python
>>> correct_rgba = rgba[:]
>>> correct_rgba[-1]= 'Alpha'
>>> correct_rgba
['Red', 'Green', 'Blue', 'Alpha']
>>> rgba
['Red', 'Green', 'Blue', 'Alph']      #correct_rgba与rgba最后一个元素不同
```


## 3. 多重赋值

- 等号右边的所有表达式的值，都是在这一语句对任何变量赋新值之前求出来的——求值顺序为从左到右。

```python
>>> a , b = 5 , 10
>>> a , b = b , a    # 交换
>>> a
10
>>> b
5
```

## 4. 控制流

### 4.1 if

```python
if x:
    do_x
elif y:
    do_y
else z:
    do_z
```

### 4.2 for

```python
words = ['cat', 'window', 'defenestrate']
for w in words:
	print(w, len(w))
```

### 5. range() 函数

```python
for i in range(5):
	print(i)

# 输出
0
1
2
3
4
```

### 6. match 语句

```python
def http_error(status):
    match status:
        case 200:
            print("success")
        case 404 | 400:
            print("failed")
        case _:
            print("other")
http_error(404)
```



## 5. 函数

### 5.1 默认参数

**重要警告：** 默认值只计算一次。默认值为列表、字典或类实例等可变对象时，会产生与该规则不同的结果。例如，下面的函数会累积后续调用时传递的参数：

```python
def f(a, L=[]):
    L.append(a)
    return L

print(f(1))
print(f(2))
print(f(3))
```

输出结果如下：

```python
[1]
[1, 2]
[1, 2, 3]
```

### 5.2 可变、关键字参数

- 可变参数
```python
def calc(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum
```

- 关键字参数
```python
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)

# 调用方式，其中gender='M', job='Engineer'会被封装成字典
person('Adam', 45, gender='M', job='Engineer')
```

## 6. 数据结构

### 6.1 列表推导式

- 例1
```python
squares = [x**2 for x in range(10)]

# 结果
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

- 例2
```python
[(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]

# 结果
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]

# 等价于
combs = []
for x in [1,2,3]:
    for y in [3,1,4]:
        if x != y:
            combs.append((x, y))
```

### 6.2 tuple、list、set、dict

- tuple不可变
```python
t = (12345, 54321, 'hello!')
# 报错
t[0] = 88888
```
- list可变
- set
	- 不重复的无序的容器
	- 创建空集合只能用 `set()`，不能用 `{}`，`{}` 创建的是空字典
```python
basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
print(basket)

# 输出
{'orange', 'banana', 'pear', 'apple'}
```

- dict
```python
tel = {'jack': 4098, 'sape': 4139}
```

## 7. 模块


### 7.1 包

- 模块的集合
```
sound/                          最高层级的包
      __init__.py               初始化 sound 包
      formats/                  用于文件格式转换的子包
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  用于音效的子包
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  用于过滤器的子包
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

还可以从包中导入单个模块，例如：
```python
import sound.effects.echo

# 这将加载子模块 sound.effects.echo。 它必须通过其全名来引用。
sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)
```

另一种导入子模块的方法是 ：
```python
from sound.effects import echo

# 这也会加载子模块 echo，并使其不必加包前缀，因此可按如下方式使用:
echo.echofilter(input, output, delay=0.7, atten=4)
```

Import 语句的另一种变体是直接导入所需的函数或变量：
```python
from sound.effects.echo import echofilter

# 同样，这将加载子模块 echo，但这使其函数 echofilter() 直接可用:
echofilter(input, output, delay=0.7, atten=4)
```
## 8. 输入与输出

格式化输出  
https://docs.python.org/zh-cn/3.13/tutorial/inputoutput.html


### 8.1 文件读写

在处理文件对象时，最好使用 [`with`](https://docs.python.org/zh-cn/3.13/reference/compound_stmts.html#with) 关键字。优点是，子句体结束后，文件会正确关闭，即便触发异常也可以。而且，使用 `with` 相比等效的 [`try`](https://docs.python.org/zh-cn/3.13/reference/compound_stmts.html#try)-[`finally`](https://docs.python.org/zh-cn/3.13/reference/compound_stmts.html#finally) 代码块要简短得多：
```python
with open('workfile',encoding='utf-8') as f:
	read_data = f.read()

# 这里文件f已经关闭，即使文件workfile不存在触发了异常也能关闭
```

如果没有使用 [`with`](https://docs.python.org/zh-cn/3.13/reference/compound_stmts.html#with) 关键字，则应调用 `f.close()` 关闭文件，即可释放文件占用的系统资源。

**警告: 调用 `f.write()` 时，未使用 `with` 关键字，或未调用 `f.close()`，即使程序正常退出，也可能 导致 `f.write()` 的参数没有完全写入磁盘。**


## 9. 错误和异常

try...except可以跨越多层调用，如
```python
def foo(s):
    return 10 / int(s)

def bar(s):
    return foo(s) * 2

def main():
    try:
        bar('0')
    except Exception as e:
        print('Error:', e)
    finally:
        print('finally...')

# 在main可以捕获foo引发的异常
```


## 10. 类

### 10.1 初探类

类函数的默认第一个参数为指向自身的引用，通常使用self命名。  
类的方法的第一个参数常常被命名为 `self`。 这也不过就是一个约定: `self` 这一名称在 Python 中绝对没有特殊含义。
```python
class MyClass:
    """一个简单的示例类"""
    i = 12345

    def f(self):
        return 'hello world'

x = MyClass()
x.f() # 等价于MyClass.f(x)
```


### 10.2 继承

```python
class DerivedClassName(BaseClassName):
	pass
```

**多重继承：**
当多个父类有相同的方法的时候，会继承第一个类中的方法
```python
class A:
    def my_method(self):
        print("Calling A.my_method")
 
class B:
    def my_method(self):
        print("Calling B.my_method")
 
class C(B,A):
    pass
 
c = C()
c.my_method()  

# 输出
Calling B.my_method
```
### 10.3 迭代器

- **iter()**
	-  `iter()` 函数是 Python 中的一个内置函数，它的主要作用是将一个可迭代对象转换为一个迭代器。
- **迭代器**是一个实现了 `__iter__()` 和 `__next__()` 方法的对象，能够逐个访问可迭代对象中的元素。

```python
s = "abc"
it = iter(s)
print(next(it))
print(next(it))
print(next(it))

# 输出
a
b
c
```

迭代器的原理机制:
定义 [`__iter__()`](https://docs.python.org/zh-cn/3.13/library/stdtypes.html#container.__iter__ "container.__iter__") 方法用于返回一个带有 [`__next__()`](https://docs.python.org/zh-cn/3.13/library/stdtypes.html#iterator.__next__ "iterator.__next__") 方法的对象。如果类已定义了 `__next__()`，那么 `__iter__()` 可以简单地返回 `self`:
```python
class Reverse:
    def __init__(self,data) -> None:
        self.data = data
        self.index = len(data)

	# 返回带有__next__方法的对象，这里是自己
    def __iter__(self):
        return self
    
    # 没有更多函数的时候引发StopIteration异常
    def __next__(self):
        if self.index == 0:
            raise StopIteration
        self.index = self.index - 1
        return self.data[self.index]


rev1 = Reverse("spam")
it = iter(rev1)

print(next(it))
print(next(it))
print(next(it))
print(next(it))

rev2 = Reverse("spam")
print('----')
for char in rev2:
    print(char)

# 输出
m
a
p
s
----
m
a
p
s
```

### 10.4 生成器

如果列表元素可以按照某种算法推算出来，那我们是否可以在循环的过程中不断推算出后续的元素呢？这样就不必创建完整的list，从而节省大量的空间。在Python中，这种一边循环一边计算的机制，称为生成器：generator。  

要创建一个generator，有很多种方法。第一种方法很简单，只要把一个列表生成式的`[]`改成`()`，就创建了一个generator：

```python
# 列表推导式
L = [x*x for x in range(10)]
print(L)

# 生成器，()与[]的区别
g = (x*x for x in range(10))

print(next(g))
print(next(g))
print(next(g))

for x in g:
    print(x)

# 输出
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
0
1
4
9
16
25
36
49
64
81
```

可以用生成器来完成的任何功能同样可以通用前一节所描述的基于类的迭代器来完成。 但生成器的写法更为紧凑，因为它会自动创建 [`__iter__()`](https://docs.python.org/zh-cn/3.13/library/stdtypes.html#iterator.__iter__ "iterator.__iter__") 和 [`__next__()`](https://docs.python.org/zh-cn/3.13/reference/expressions.html#generator.__next__ "generator.__next__") 方法。

```python
# 生成器函数
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'


for x in fib(6):
    print(x)

# 输出
1
1
2
3
5
8
```


## 11. 虚拟环境和包

- Python应用程序通常会使用不在标准库内的软件包和模块。  
- 如果应用程序A需要特定模块的1.0版本但应用程序B需要2.0版本，则需求存在冲突，安装版本1.0或2.0将导致某一个应用程序无法运行。  
- 这个个问题的解决方案是创建一个 [virtual environment](https://docs.python.org/zh-cn/3.13/glossary.html#term-virtual-environment)，一个目录树，其中安装有特定Python版本，以及许多其他包。
- 然后，不同的应用将可以使用不同的虚拟环境。 要解决先前需求相冲突的例子，应用程序 A 可以拥有自己的 安装了 1.0 版本的虚拟环境，而应用程序 B 则拥有安装了 2.0 版本的另一个虚拟环境。 如果应用程序 B 要求将某个库升级到 3.0 版本，也不会影响应用程序 A 的环境。

- 创建虚拟环境

```shell
python -m venv toturial-env
ls toturial-env

# 文件列表
Include
Lib
Scripts
.gitignore
pyvenv.cfg

Scripts\activate.bat
```

- install lib
```
pip install requests==2.6.0
```

- generate requirements.txt

```
pip freeze > requirements.txt
```

- 发布代码和requirement.txt即可

- 安装requirement.txt
```
pip install -r  requirements.txt
```

- 参考
```
https://www.cnblogs.com/zbw911/p/17930137.html
```

## 参考

https://docs.python.org/zh-cn/3.13/tutorial/index.html  
https://liaoxuefeng.com/books/python