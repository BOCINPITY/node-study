const axios = require("axios").default
const cheerio = require("cheerio")
const TOTAL_PAGE = 5
const Book = require("../models/Book")
// 获取豆瓣读书的源代码
async function getBookHtml(page) {
    const result = await axios.get(`https://book.douban.com/latest?subcat=%E5%85%A8%E9%83%A8&p=${page}}`)
    return result.data
}


// 获取详情页的链接数组
async function getBookLinks() {
    let elements = []
    for (let i = 1; i <= TOTAL_PAGE; i++) {
        const html = await getBookHtml(i)
        const $ = cheerio.load(html)
        elements.push(...$("#content .chart-dashed-list li .media__img a"))
    }
    const links = elements.map((item, index) => {
        const href = item.attribs["href"]
        return href
    })
    return links
}

async function getBookDetails(url) {
    const result = await axios.get(url)
    const $ = cheerio.load(result.data)
    const imgSrc = $("#mainpic .nbg img").attr("src")
    const name = $("h1").text().trim()
    const spans = $("#info span.pl")
    const authorSpan = spans.filter((index, item) => {
        return $(item).text().includes("作者")
    })
    const author = authorSpan.next('a').text()

    const publishSpan = spans.filter((index, item) => {
        return $(item).text().includes("出版年")
    })
    const publishDate = publishSpan[0].nextSibling.nodeValue.trim()
    return {
        name:name,
        image:imgSrc,
        author:author,
        publishDate:publishDate
    }
}

async function fetchAllBooksObj(){
   const bookLinks =  await getBookLinks()
    const proms = bookLinks.map((item,index) => {
        return getBookDetails(item)
    })
    return Promise.all(proms)
}

async function saveToDB(){
    const books = await fetchAllBooksObj()
    await Book.bulkCreate(books)
}

saveToDB().then()
