/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const $siteList = $('.siteList')
const $lastli = $siteList.find('li.last')
    //localStorage.clear()
const x = localStorage.getItem('x')
const xObject = JSON.parse(x) //把字符串转换为对象
const hashMap = xObject || [
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: 'N', url: 'https://www.nowcoder.com' }
]
const render = () => {
    $siteList.find('li:not(.last)').remove() //第一次运行的时候li标签还没有加载上
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                    <div class="site">
                        <div class="logo">
                            ${node.logo}
                        </div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-close"></use>
                            </svg>
                        </div>
                    </div>
        </li>`).insertBefore($lastli)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            console.log('close')
            e.stopPropagation();
            hashMap.splice(index, 1) //删除指定元素
            render() //重新渲染浏览器
        })
    })
}

const simplifyUrl = (url) => {
    let b = url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
    console.log(b)
    return b
}
render()
$('.addButton')
    .on('click', () => {
        //prompt显示一个对话框，对话框中包含一条文字信息，提示用户输入文字
        /*
        result = window.prompt(text,value)
        text:提示用户输入的提示信息
        value:用户输入的信息
        */
        let url = window.prompt('请问你要添加的网址是什么？')

        if (url.indexOf('http')) {
            url = 'https://' + url;
        }
        hashMap.push({
            logo: simplifyUrl(url)[0],
            url: url
        })
        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap) //将对象转换为字符串
    localStorage.setItem('x', string) //将信息存储进localStorage
}

$(document).on(('keypress'), (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})