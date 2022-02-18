const e = require("express")

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) =>  {
    const likes = blogs.map(i => i.likes)
    const reducer = (pValue, cValue) => pValue + cValue

    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    var mostLiked = {
        title : "",
        author : "",
        likes : 0
    }

    blogs.reduce((previous, current) => {
        if (current.likes > mostLiked.likes) {
            mostLiked = {...current}
        }
    })

    return mostLiked
}

const mostBlogs = (blogs) => {
    const authorsAmountOfBlogs = blogs.map(obj => obj.author)

    const authors = authorsAmountOfBlogs.reduce((acc, curr) => {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {})

    const findMostBlogs = obj => {
        const values = Object.values(obj)
        const max = Math.max.apply(Math, values)

        for (key in obj) {
            if (obj[key] === max) {
                return  {"author" : key,
                    "blogs" : max}
            }
        }
    }

    return findMostBlogs(authors)
}

const mostLikes = (blogs) => {
    //ensin luodaan lista pelkistä nimistä ilman duplikaatteja, sitten tehdään lista olioista joissa kentät author ja likes
    const authors = [...new Set(blogs.map(obj => obj.author))].map(a => {
        const author = {
            "author" : a,
            "likes" : 0
        }
        return author
    })

    //kaks foria vaan päällekäin?
    authors.map(a => {

        for (el of blogs) {
            if (a.author === el.author) {
                a.likes += el.likes
            }
        }
    })

    const authorWithMostLikes = {
        "author" : "",
        "likes" : 0
    }

    for (a of authors) {
        if (a.likes > authorWithMostLikes.likes) {
            authorWithMostLikes.likes = a.likes
            authorWithMostLikes.author = a.author
        }
    }

    return authorWithMostLikes
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }