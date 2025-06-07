const base = {
    get() {
        return {
            url : "http://localhost:8080/xiaoyuanjianzhi/",
            name: "xiaoyuanjianzhi",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/xiaoyuanjianzhi/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "大学生校园兼职"
        } 
    }
}
export default base
