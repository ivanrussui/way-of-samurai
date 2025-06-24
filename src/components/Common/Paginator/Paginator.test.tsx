import {render, screen} from '@testing-library/react';
import {Paginator} from './Paginator';

test('shows only 10 page numbers when totalCount leads to more than 10 page', async () => {
    const setPageMock = jest.fn();
    render(<Paginator setPageHandler={setPageMock} page={1} count={10} totalCount={100}/>);
    const spans = await screen.findAllByTestId('page-span');
    expect(spans.length).toBe(10);
});

test('PREV button is disabled when total pages are less than 11', () => {
    const setPageMock = jest.fn();
    render(<Paginator setPageHandler={setPageMock} page={1} count={10} totalCount={100}/>);
    const prevBtn = screen.getByRole('button', {name: 'PREV'});
    expect(prevBtn).toBeDisabled();
});
