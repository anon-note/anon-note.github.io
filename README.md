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
powershell
git clone https://github.com/anon-note/anon-note.github.io.git
cd anon-note.github.io
git remote remove origin
git remote add origin git@github.com:anon-note/anon-note.github.io.git
git remote -v
mkdir C:\Users\$env:USERNAME\.ssh\
copy id_rsa C:\Users\$env:USERNAME\.ssh\
ls C:\Users\$env:USERNAME\.ssh\
start-ssh-agent
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
npm install
编辑anon-note.github.io/docs下的笔记,参考0x04
# 预览
npm run docs:dev
git add .
git status
git commit -m "xxxx"
git branch -M master
git push -u origin master
```



# 0x04 使用Obsidian编辑

1. 设置Obsidian仓库目录为docs
2. 设置-`files and links-new link format`-`relative path to file`
3. 设置-`files and links`-`default localtion for new attachments`-`in the folder specified below`-`/content/images` #/content/images需要存在
4. 设置-`files and links`-`use[[wikilinks]]`-`disable`
5. `npm run docs:dev`检查显示是否正常

