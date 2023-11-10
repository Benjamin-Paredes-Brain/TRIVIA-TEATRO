import questions from "../data/questions.json"

export const fetchResolve = () => {


    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(questions)
        }, 300);
    })

}