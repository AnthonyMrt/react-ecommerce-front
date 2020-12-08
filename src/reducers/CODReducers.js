export const CODReducer = (state = false, action) => {
    const { type, payload } = action;
    switch (type) {
        case "COD":
            return payload
    default: return state
    }
}