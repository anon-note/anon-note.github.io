
## hello world

- html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>开始学习 CSS</title>
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <h1>我是一级标题</h1>

    <p>
      这是一个段落文本。在文本中有一个 <span>span element</span> 并且还有一个
      <a href="http://example.com">链接</a>.
    </p>

    <p>这是第二段。包含了一个 <em>强调</em> 元素。</p>

    <ul>
      <li>项目 1</li>
      <li>项目 2</li>
      <li>项目 <em>三</em></li>
    </ul>
  </body>
</html>
```

- css
```css
h1 {
    color: red;
}
```

- 一级标题变红
![](../../images/css.png)


## 选择器类型




| 选择器   | 表示            |
| ----- | ------------- |
| 类选择器  | `.class_name` |
| id选择器 | `#id`         |


## 三种样式创建方式

1. 外部样式
```html
<head>
	<link rel="stylesheet" href="styles.css">
</head>
```
2.内部样式
```html
<head>
	<style>
		h1 {
		    color: red;
		}
	</style>
</head>
```
3. 内联样式
```html
<h1 style="color:red">我是一级标题</h1>
```

- 优先级
	- 内联 > 内部 > 外部 > 默认



## 盒子模型

所有HTML元素可以看作盒子，在CSS中，"box model"这一术语是用来设计和布局时使用。

![](../../images/box-model.gif)


## 网页布局例子

- html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Document</title>
</head>
<body>
    <div class="header">
        <h1>my site</h1>
    </div>

    <div class="nav">
        <a href="#">链接</a>
        <a href="#">链接</a>
        <a href="#">链接</a>
        <a href="#" style="float: right;">链接</a>
    </div>

    <div class="content">
        <div class="leftcontent">
            <div class="card">
                <h2>文章标题</h2>
                <h5>2019 年 4 月 17 日</h5>
                <div class="fakeimg" style="height:200px;">图片</div>
                <p>一些文本...</p>
                <p>菜鸟教程 - 学的不仅是技术，更是梦想！菜鸟教程 - 学的不仅是技术，更是梦想！菜鸟教程 - 学的不仅是技术，更是梦想！菜鸟教程 - 学的不仅是技术，更是梦想！</p>
            </div>

        </div>
        <div class="rightcontent">
            <div class="card">
                <h2>关于我</h2>
                <div class="fakeimg" style="height:100px;">图片</div>
                <p>关于我的一些信息..</p>
            </div>
            <div class="card">
                <h3>热门文章</h3>
                <div class="fakeimg"><p>图片</p></div>
                <div class="fakeimg"><p>图片</p></div>
                <div class="fakeimg"><p>图片</p></div>
            </div>
            <div class="card">
                <h3>关注我</h3>
                <p>一些文本...</p>
            </div>
        </div>
    </div>
    <div class="footer">
        <h2>底部区域</h2>
    </div>

</body>
</html>
```

- css
```css
body{
    font-family: sans-serif;
    padding: 10px;
    background-color: #f1f1f1;
}

* {
    box-sizing: border-box; /* 宽度和高度包括内容区域、内边距和边框 */
  }

/* 头部div容器样式 */
.header{
    padding: 30px;
    background-color: white;
    text-align: center;

}

.header h1{
    font-size: 50px;
}

/**********************************************/
/* 导航条div容器样式 */
.nav{
    overflow: hidden;
    background-color: #333;
}

/* 导航条链接样式 */
.nav a{
    float: left;
    display: block;         /* 占用整行 */
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;  /* 消除文字装饰（此处为取消链接下划线）*/
}

/* 鼠标悬停链接时的样式 */
.nav a:hover{
    background-color: #ddd;
    color: black;
}

/**********************************************/
/* 内容区样式 */

/* conten容器添加空块消除浮动 */
.content:after {
    content: "";
    clear: both;
    display: table;
}


/* 左边内容div容器样式 */
.leftcontent{
    float: left;
    width: 75%;
}

/* 卡片内容样式 */
.card{
    background-color: white;
    padding: 20px;
    margin-top: 20px;
}

/* 卡片内容图片样式 */
.fakeimg{
    background-color: #aaa;
    width: 100%;
    padding: 20px;
}

/* 右边内容样式 */
.rightcontent{
    float: left;
    width: 25%;
    background-color: #f1f1f1;
    padding-left: 20px;
}

.footer{
    padding: 20px;
    text-align: center;
    background-color: #ddd;
    margin-top: 20px;
}


/* 响应式布局 - 屏幕尺寸小于 800px 时，两列布局改为上下布局 */
@media screen and (max-width: 800px) {
    .leftcontent, .rightcontent {   
      width: 100%;
      padding: 0;
    }
  }
   
  /* 响应式布局 -屏幕尺寸小于 400px 时，导航等布局改为上下布局 */
  @media screen and (max-width: 400px) {
    .nav a {
      float: none;
      width: 100%;
    }
  }
```

![](../../images/weblayout.png)


## 参考

- https://developer.mozilla.org/zh-CN/docs/Learn/CSS
- https://www.runoob.com/css

