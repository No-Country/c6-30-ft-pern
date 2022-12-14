function findModelEntryInclude(model, modelInclude) {
    return async function (query) {
        try {
            let response = await model.findOne({ ...query, include: modelInclude })
            return response
        }
        catch (error) {
            throw error
        }
    }
}
module.exports = findModelEntryInclude