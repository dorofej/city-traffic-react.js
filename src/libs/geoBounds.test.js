const geoBounds = require("./geoBounds")
// @ponicode
describe("geoBounds.default", () => {
    test("0", () => {
        let callFunction = () => {
            geoBounds.default(410, 90)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            geoBounds.default(50, 30)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            geoBounds.default(400, 90)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            geoBounds.default(520, 50)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            geoBounds.default(320, 320)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            geoBounds.default(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
