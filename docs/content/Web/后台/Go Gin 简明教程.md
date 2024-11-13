
## 环境准备

```
golang
go mod init project-name
go get github.com/gin-gonic/gin
```

## hello world

```
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	
	// 声明路由
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
```


## 路由


### GET

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// 访问http://localhost:8080/ping
	// 返回{"message":"pong"}
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	// 访问http://localhost:8080/user/jack
	// 返回your name:jack
	r.GET("/user/:name", func(ctx *gin.Context) {
		name := ctx.Param("name")
		ctx.String(200, "your name:"+name)
	})

	// 访问http://localhost:8080/user?name=alice
	// 返回your name:alice
	r.GET("/user", func(ctx *gin.Context) {
		name := ctx.Query("name")
		ctx.String(200, "your name:"+name)
	})

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
```

### POST

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// 访问：curl http://localhost:8080/form -X POST -d "username=alice&password=123465"
	// 返回：{"password":"123465","username":"alice"}
	r.POST("/form", func(ctx *gin.Context) {
		username := ctx.PostForm("username")
		password := ctx.PostForm("password")

		ctx.JSON(http.StatusOK, gin.H{
			"username": username,
			"password": password,
		})
	})

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
```

### 分组路由

如果有一组路由，前缀都是/api/v1开头，是否每个路由都需要加上/api/v1这个前缀呢？答案是不需要，分组路由可以解决这个问题。利用分组路由还可以更好地实现权限控制，例如将需要登录鉴权的路由放到同一分组中去，简化权限控制。  

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// group routes 分组路由
	defaultHandler := func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"path": c.FullPath(),
		})
	}
	// group: v1
	v1 := r.Group("/v1")
	{
		v1.GET("/posts", defaultHandler)
		v1.GET("/series", defaultHandler)
	}
	// group: v2
	v2 := r.Group("/v2")
	{
		v2.GET("/posts", defaultHandler)
		v2.GET("/series", defaultHandler)
	}

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
```


## HTML模板

Gin默认使用模板Go语言标准库的模板text/template和html/template，语法与标准库一致，支持各种复杂场景的渲染。  
- templates/demo.tmpl
```html
<html>
<body>
    <p>hello, {{.title}}</p>
</body>
</html>
```

- go
```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.LoadHTMLGlob("templates/*")

	// 访问http://localhost:8080/demo
	// 返回"hello, Gin"
	r.GET("/demo", func(c *gin.Context) {
		c.HTML(http.StatusOK, "demo.tmpl", gin.H{
			"title": "Gin",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
```


## 中间件

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 分组路由中间件
func LoggerV1() gin.HandlerFunc {

	return func(ctx *gin.Context) {
		log.Println("LoggerV1:" + ctx.FullPath())
	}
}

// 全局中间件
func LoggerGlobal() gin.HandlerFunc {

	return func(ctx *gin.Context) {
		log.Println("LoggerGlobal:" + ctx.FullPath())
	}
}

// 单路由中间件
func LoggerSingle() gin.HandlerFunc {

	return func(ctx *gin.Context) {
		log.Println("LoggerSingle:" + ctx.FullPath())
	}
}

// 默认handler
var defaultHandler = func(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"path": c.FullPath(),
	})
}

func main() {
	r := gin.Default()

	// 全局使用中间件
	r.Use(LoggerGlobal())

	// 单路由使用中间件
	r.GET("/middleware", LoggerSingle(), func(ctx *gin.Context) {
		ctx.String(200, "单路由使用中间件")
	})

	// 分组路由使用中间件
	v1 := r.Group("/v1")
	v1.Use(LoggerV1())
	{
		v1.GET("/posts", defaultHandler)
		v1.GET("/series", defaultHandler)
	}

	v2 := r.Group("/v2")
	{
		v2.GET("/posts", defaultHandler)
		v2.GET("/series", defaultHandler)
	}

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
```

### 使用 BasicAuth 中间件

```go
// 模拟一些私人数据
var secrets = gin.H{
	"foo":    gin.H{"email": "foo@bar.com", "phone": "123433"},
	"austin": gin.H{"email": "austin@example.com", "phone": "666"},
	"lena":   gin.H{"email": "lena@guapa.com", "phone": "523443"},
}

func main() {
	r := gin.Default()

	// 路由组使用 gin.BasicAuth() 中间件
	// gin.Accounts 是 map[string]string 的一种快捷方式
	authorized := r.Group("/admin", gin.BasicAuth(gin.Accounts{
		"foo":    "bar",
		"austin": "1234",
		"lena":   "hello2",
		"manu":   "4321",
	}))

	// /admin/secrets 端点
	// 触发 "localhost:8080/admin/secrets" 会弹窗要求输入账号密码
	authorized.GET("/secrets", func(c *gin.Context) {
		// 获取用户，它是由 BasicAuth 中间件设置的
		user := c.MustGet(gin.AuthUserKey).(string)
		if secret, ok := secrets[user]; ok {
			c.JSON(http.StatusOK, gin.H{"user": user, "secret": secret})
		} else {
			c.JSON(http.StatusOK, gin.H{"user": user, "secret": "NO SECRET :("})
		}
	})

	// 监听并在 0.0.0.0:8080 上启动服务
	r.Run(":8080")
}
```
## 热加载调试 Hot Reload

Gin 原生不支持，但有很多额外的库可以支持。例如  
- github.com/codegangsta/gin  
- github.com/pilu/fresh  
这次，我们采用 github.com/pilu/fresh 。  
```
# 安装
go install github.com/gravityblast/fresh@latest
# 在go源码目录下，执行命令即可，后续修改go源码会自动重新编译
fresh
```














## 参考

- gin简明指南
	- https://geektutu.com/post/quick-go-gin.html