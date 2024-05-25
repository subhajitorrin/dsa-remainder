function generateQuestion(category, difficulty) {
    const truncate = document.querySelectorAll(".truncate");
    let list = []
    truncate.forEach((item, index) => {
        if (!(item.nextElementSibling && item.nextElementSibling.tagName.toLowerCase() === 'svg')) {
            const a = item.querySelector("a");
            if (a != null) {
                list.push(a.href);
            }
        }
    })
    let result = []
    list.forEach((item) => {
        const obj = {
            "link": item,
            "category": category,
            "difficulty": difficulty
        }
        result.push(obj)
    })
    result.shift();
    console.log(result);
}
generateQuestion("Array", "Easy");