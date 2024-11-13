
为什么学习 JavaScript?

JavaScript 是 web 开发人员必须学习的 3 门语言中的一门：
- HTML 定义了网页的内容
- CSS 描述了网页的布局
- JavaScript 控制了网页的行为

## helloworld

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
        function onClick(){
            document.getElementById("time").innerText = Date();
        }
    </script>
    <h1 id="time"></h1>
    <br>
    <button onclick="onClick()">显示时间</button>

</body>
	</html>
```


## 参考

- https://www.runoob.com/js/js-tutorial.html