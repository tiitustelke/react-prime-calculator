import {render, screen} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";
import {getIsPrimeNumber, getSumAndIsPrimeNumber} from "../../hooks/ApiHooks";
import {wait} from "@testing-library/user-event/dist/utils";

jest.mock("../../hooks/ApiHooks");

test('initially result empty, cannot input zero, negative or letters', () => {
    render(<App/>);

    const resText = screen.queryByTestId("result");
    expect(resText).toBeEmpty();

    const input = screen.getByLabelText("Numbers:");
    userEvent.type(input, "0");
    expect(resText).toBeEmpty();

    userEvent.type(input, "-34");
    expect(resText).toBeEmpty();

    userEvent.type(input, "abcd");
    expect(resText).toBeEmpty();

});

test('can input number and receive result', async () => {
    const isNotPrime = {"isPrime": false};
    getIsPrimeNumber
        .mockResolvedValue(isNotPrime)
        .mockResolvedValueOnce({"isPrime": true})
        .mockResolvedValueOnce(isNotPrime);
    render(<App/>);

    const input = screen.getByLabelText("Numbers:");
    userEvent.type(input, "56");
    expect(getIsPrimeNumber).toHaveBeenCalledTimes(2);
    expect(getIsPrimeNumber).toHaveBeenCalledWith(56);

    await wait(() => {
      expect(screen.queryByTestId("result").textContent).toBe("Number 56 is not a prime number");
    });
});

test('can input multiple numbers and receive result', async () => {
  getIsPrimeNumber
      .mockResolvedValue({"isPrime": false})
  getSumAndIsPrimeNumber
      .mockResolvedValue({"result": 157, "isPrime": true})
  render(<App/>);

  const input = screen.getByLabelText("Numbers:");
  userEvent.type(input, "43,76,38");

  await wait(() => expect(screen.queryByTestId("result").textContent).toBe("Result 157 is a prime number"));
});
