# 0x01 搭建记录

## 1.运行一个demo

```
https://vitepress.dev/zh/guide/getting-started
```


## 2.安装自动sidebar

```
https://github.com/QC2168/vite-plugin-vitepress-auto-sidebar
npm install vite-plugin-vitepress-auto-sidebar
```

## 3.首页设置参考

```
https://vitepress.dev/reference/default-theme-home-page
```


# 0x02 上传仓库至github

1. 设置github ssh key
2. `git init`初始化本地仓库
3. `git add .`文件到git仓库
4. 创建.gitignore忽略相关文件
5. git commit -m "first commit"
	- 出错则运行`git config --global user.email "you@example.com"`和`git config --global user.name "anon-note"`
6. 关联github仓库
	- `git remote add origin git@github.com:anon-note/src.git`
7. 关联好后上传本地仓库到github
	- 关联好后上传本地仓库到github
	- `git push -u origin main`

# 0x03 拉取修改并更新

```
git clone https://github.com/anon-note/src.git
git remote remove origin
git remote add origin git@github.com:anon-note/src.git
git remote -v
cd src
copy id_rsa C:\Users\xxxx\.ssh\
start-ssh-agent
npm install
编辑src/docs下的笔记
# 预览
npm run docs:dev
git add .
git status
git commit -m 'xxxx'
git branch -M main
git push -u origin main
```

