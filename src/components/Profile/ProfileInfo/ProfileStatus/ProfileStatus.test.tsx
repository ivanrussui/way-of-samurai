import {fireEvent, render, screen} from '@testing-library/react';
import {ProfileStatus} from './ProfileStatus';

let testStatus = '';
let updateStatusMock = () => undefined;

beforeEach(() => {
    testStatus = 'Test status';
    updateStatusMock = jest.fn();
});

test('status from props should be in the state', () => {
    render(<ProfileStatus status={testStatus} updateStatusTC={updateStatusMock}/>);
    expect(screen.getByText(testStatus)).toBeInTheDocument();
});
test('after creation <span> should be displayed', () => {
    render(<ProfileStatus status={testStatus} updateStatusTC={updateStatusMock}/>);
    const span = screen.getByText(testStatus);
    expect(span.tagName).toBe('SPAN');
    expect(span).not.toBeNull();
});
test('after creation <input> shouldn\'t be displayed', () => {
    render(<ProfileStatus status={testStatus} updateStatusTC={updateStatusMock}/>);
    expect(() => {
        const input = screen.getByText(testStatus);
        expect(input.tagName).toBe('INPUT');
    }).toThrow();
});
test('after creation <span> should contains correct status', () => {
    render(<ProfileStatus status={testStatus} updateStatusTC={updateStatusMock}/>);
    const span = screen.getByText(testStatus);
    expect(span.tagName).toBe('SPAN');
    expect(span.textContent).toBe(testStatus);
});
test("input should be displayed in editMode instead of span", () => {
    render(<ProfileStatus status={testStatus} updateStatusTC={updateStatusMock} />);
    const span = screen.getByText(testStatus);
    fireEvent.dblClick(span); // или doubleClick
    const input = screen.getByDisplayValue(testStatus) as HTMLInputElement;
    expect(input.tagName).toBe('INPUT');
    expect(input.value).toBe(testStatus)
});
test("callback should be called", () => {
    render(<ProfileStatus status={testStatus} updateStatusTC={updateStatusMock} />);
    const span = screen.getByText(testStatus);
    fireEvent.doubleClick(span);
    const input = screen.getByDisplayValue(testStatus);
    fireEvent.blur(input);
    expect(updateStatusMock).toHaveBeenCalledWith(testStatus);
    expect(updateStatusMock).toHaveBeenCalledTimes(1);
});