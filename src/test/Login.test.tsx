import { render, screen } from "@testing-library/react"
import Login from '../Login'

describe("login", () => {
    test("deve renderizar", () => {
        const { container } = render(<Login />)

        const login = container.querySelector(`input[name="user"]`);
        const password = container.querySelector(`input[name="password"]`);

        login?.setAttribute("value","teste");
        password?.setAttribute("value","1234");

        expect(() => {
            screen.getByText("Login").click()
        })
    })
})