import Id from "../src/modules/@shared/domain/value-object/id.value-object";

describe("Id value Objects", () => {

    it("Should get value in Id", () => {
        const id = new Id('1');
        const value = id.getId();
        expect(value).toEqual('1');
    });

    it("Should get value in Id", () => {
        const id = new Id();
        const value = id.getId();
        expect(value).toBeDefined();
    });
});