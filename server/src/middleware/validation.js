
const dataMethod = ["body", "query", "params", "header", "file", "files"]

export const validation = (schema) => {
    return (req, res, next) => {
        let arrayError = []
        dataMethod.forEach((key) => {

            if (schema[key]) {
                const data = schema[key].validate(req[key], { abortEarly: false })

                if (data.error) {
                    arrayError.push(data.error.details)
                }
            }

        })

        if (arrayError.length) {
            return res.status(400).json({ message: "validation error", errors: arrayError })
        }
        
        next()
    }
}