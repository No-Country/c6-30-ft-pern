function orderCreateHandler(fetchOrders, checkIfAvailable, checkIfAssigned, dbOrderCreate, errorManager, errorResponse) {
    return async function (req, res, next) {
        let { client, serviceId, date } = req.body
        try {
            let service = await fetchOrders({ where: { id: serviceId } })
            if (!service) return res.status(400).send(errorResponse("Service ID not found."))
            let { Orders, provider, description, value, Date } = service
            let { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = Date.dataValues
            let isAvailable = checkIfAvailable(date, { monday, tuesday, wednesday, thursday, friday, saturday, sunday })
            if (!isAvailable) return res.status(400).send(errorResponse("Date not available."))
            let isAssigned = checkIfAssigned(date, Orders.map(k => k.dataValues.date))
            if (!isAvailable || isAssigned) return res.status(400).send(errorResponse("Date already assigned."))
            let order = await dbOrderCreate({
                client,
                provider,
                date,
                description,
                value,
                status: "pending"
            })
            await service.addOrder(order.id)
            return res.send({ success: true, message: "Order successfully created." })
        } catch (error) {
            let { status, message } = errorManager(error)
            return res.status(status).send(errorResponse(message))
        }
    }
}

module.exports = orderCreateHandler