
## hello world

```go
package main

// 导入包
import (
	"fmt"
	// 按照约定，包名与导入路径的最后一个元素一致。
	// 例如，"math/rand" 包中的源码均以 package rand 语句开始。
	"math/rand"
)

func main() {
	fmt.Println("我最喜欢的数字是 ", rand.Intn(10))
}
```


## 变量声明

```go
x int
```


## 流程控制

- for循环
```go
package main

import (
	"fmt"
)

func main() {
	for i := 0; i < 10; i++ {
		fmt.Println((i))
	}
}
```

- for 是 Go 中的「while」
```go
package main

import "fmt"

func main() {
	sum := 0
	for sum < 10 {
		fmt.Println(sum)
		sum++
	}
}
```

- 无限循环
```go
for{

}
```

- if语句 ：和 for 一样，if 语句可以在条件表达式前执行一个简短语句。该语句声明的变量作用域仅在 if 之内。
```go
package main

import (
	"fmt"
)

func main() {

	cmp := 10
	if v := 20; v > cmp {
		fmt.Println(v)
	}
}
// 输出20
```

- switch 分支

无需添加break
```go
switch i {
case 0:
case f():
}
// 在 i==0 时，f()不会被调用。
```

- 无条件switch
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("早上好！")
	case t.Hour() < 17:
		fmt.Println("下午好！")
	default:
		fmt.Println("晚上好！")
	}
}
// 这种形式能将一长串 if-then-else 写得更加清晰。
```

- defer 推迟

defer 语句会将函数推迟到外层函数返回之后执行。  
推迟调用的函数调用会被压入一个栈中。 当外层函数返回时，被推迟的调用会按照后进先出的顺序调用。 
```go
package main

import "fmt"

func main() {
	defer fmt.Println("world")

	fmt.Println("hello")
}

// 输出
hello
world
```

## 指针类型

```go
package main

import (
	"fmt"
)

func main() {
	var p *int
	i := 10
	p = &i
	fmt.Println(p)
	fmt.Println(*p)
}
```

## 结构体

```go
package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	p := &v
	p.X = 40 //等价(*p).X = 40
	(*p).Y = 50
	fmt.Println(v)
}
// 输出
{40 50}
```

## 数组、切片

```
[n]T  // 它拥有 n 个类型为 T 的值
```

- 切片类似数组的引用
```go
package main

import "fmt"

func main() {
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	a := names[0:2]
	a[1] = "XXX"
	fmt.Println(names)
}
// 输出，修改
[John XXX George Ringo]
```

- 用 make 创建切片
```go
a := make([]int, 5)  // len(a)=5
```

- 遍历
```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
for i, v := range pow {
	fmt.Printf("2**%d = %d\n", i, v)
}
```


## 接口和方法
### 方法

方法就是一类带特殊的**接收者**参数的函数  

```go
package main

import (
	"fmt"
)

type Student struct {
	name string
}

// Name方法绑定到Student上
func (s Student) Name() string {
	return "hello " + s.name
}

func (s Student) ChangeName(name string) {
	s.name = name
}

// 指针作为接收者
func (s *Student) ChangeName2(name string) {
	s.name = name
}

func main() {
	s := Student{"alice"}
	fmt.Println(s.Name())
	s.ChangeName("bob")    // 实际并未修改s的name值
	fmt.Println(s.Name())
	s.ChangeName2("bob")   // 修改了s的name值
	fmt.Println(s.Name())
}
// 输出
hello alice
hello alice
hello bob
```

- 使用指针接收者的原因有二： 
	- 首先，方法能够修改其接收者指向的值。 
	- 其次，这样可以避免在每次调用方法时复制该值。若值的类型为大型结构体时，这样会更加高效。


### 接口

```go
package main

import "fmt"

// type Stringer interface {
// 	String() string
// }

type Person struct {
	Name string
	Age  int
}

// 实现了Stringer接口
func (p Person) String() string {
	return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
}

func main() {
	a := Person{"Arthur Dent", 42}
	z := Person{"Zaphod Beeblebrox", 9001}
	fmt.Println(a, z)
}

```


## 并发

- 协程
```go
package main

import (
	"fmt"
	"time"
)

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world")
	say("hello")
}
```

- 信道  
信道是带有类型的管道，你可以通过它用信道操作符 <- 来发送或者接收值。
```go
package main

import "fmt"

func main() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
// 输出
1
2
```

- 信道的关闭
```go
close(c)

// 接收者判断是否关闭,关闭时ok==false
v, ok := <-ch

// 会不断从信道接收值，直到它被关闭
for i := range c{
	// todo
} 
```

- select语句  
select 会阻塞到某个分支可以继续执行为止，这时就会执行该分支。当多个分支都准备好时会随机选择一个执行。 
```go
package main

import (
	"fmt"
	"time"
)

func worker(c chan string, quit chan int) {
	for i := 0; i < 5; i++ {
		time.Sleep(time.Second)
		c <- "worker:" + fmt.Sprintf("%d", i)
	}
	// 最后写入信道
	quit <- 1
}

func main() {
	c := make(chan string)
	quit := make(chan int)

	go worker(c, quit)

	x, y := "", 0
	for {
		select {
		case x = <-c:
			// 在quit <- 1之前是执行此case
			fmt.Println(x)
		case y = <-quit:
			// 最后执行
			fmt.Println(y)
			return
		}
	}
}
// 输出
worker:0
worker:1
worker:2
worker:3
worker:4
1
```


- sync.Mutex锁  

每次只有一个 Go 程能够访问一个共享的变量，从而避免冲突。  
我们可以通过在代码前调用 Lock 方法，在代码后调用 Unlock 方法来保证一段代码的互斥执行。参见 Inc 方法。  
我们也可以用 defer 语句来保证互斥锁一定会被解锁。参见 Value 方法。 

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// SafeCounter 是并发安全的
type SafeCounter struct {
	mu sync.Mutex
	v  map[string]int
}

// Inc 对给定键的计数加一
func (c *SafeCounter) Inc(key string) {
	c.mu.Lock()
	// 锁定使得一次只有一个 Go 协程可以访问映射 c.v。
	c.v[key]++
	c.mu.Unlock()
}

// Value 返回给定键的计数的当前值。
func (c *SafeCounter) Value(key string) int {
	c.mu.Lock()
	// 锁定使得一次只有一个 Go 协程可以访问映射 c.v。
	defer c.mu.Unlock()
	return c.v[key]
}

func main() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.Value("somekey"))
}
// 输出
1000
```


## 参考

- Go指南
	- https://tour.go-zh.org/list