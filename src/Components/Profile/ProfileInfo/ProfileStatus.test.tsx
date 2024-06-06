//for class component
// import {create} from "react-test-renderer";
// import {ProfileStatus} from "./ProfileStatus(classComponent)";
//
// describe("123", ()=>{
//     test("status from props should be in the state", () => {
//         const component = create(<ProfileStatus status={"it"} updateStatusTC={()=>{}}/>)
//         const instance = component.getInstance()
//         console.log(instance)
//         expect(instance.props.status).toBe("it")
//     })
// })

import {create} from "react-test-renderer";
import {ProfileStatus, ProfileStatusType} from "./ProfileStatus";
import ProfileStatusClass from "./ProfileStatus(classComponent)";

describe("ProfileStatus Component", ()=>{
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={"new status"} updateStatusTC={()=>{}}/>)
        const root = component.root
        expect(root.props.status).toBe("new status")
    })
    test("after creation span should be displayed with correct status", () => {
        const component = create(<ProfileStatus status={"new status"} updateStatusTC={()=>{}}/>)
        const root = component.root
        let spans = root.findAllByType("span")
        expect(spans.length).toBe(1)
    })
    test("after creation span should contains correct status", () => {
        const component = create(<ProfileStatus status={"new status"} updateStatusTC={()=>{}}/>)
        const root = component.root
        let spans = root.findByType("span")
        expect(spans.children[0]).toBe('new status')
    })
    test("after creation input cannot be displayed", () => {
        const component = create(<ProfileStatus status={"new status"} updateStatusTC={()=>{}}/>)
        const root = component.root
        expect(()=>{
            let input = root.findByType("input")
        }).toThrow()
    })
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status={"new status"} updateStatusTC={()=>{}}/>)
        const root = component.root
        let spans = root.findByType("span")
        spans.props.onClick()
        let input = root.findByType("input")
        expect(input.props.value).toBe('new status')
    })
    // test("callback should be called", () => {
    //     const mockCallback = jest.fn();
    //     const component = create(<ProfileStatus status="it-kamasutra.com" updateStatusTC={mockCallback} />);
    //     const instance: any = component.getInstance();
    //     if(instance){
    //     instance.activateEditModeHandler();
    //     }
    //     expect(mockCallback.mock.calls.length).toBe(1);
    // });

})